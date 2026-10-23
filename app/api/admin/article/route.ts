import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readCustom, saveCustom, saveOverride, saveUpload, type Custom, type Override, type Status } from "@/lib/store";
import { refresh } from "@/lib/data";

export const dynamic = "force-dynamic";

const STATUSES: Status[] = ["Draft", "In review", "Published"];
const str = (v: unknown, max = 20000) => (typeof v === "string" ? v.slice(0, max) : undefined);
const list = (v: unknown, max = 200) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").map((x) => x.slice(0, 20000)).slice(0, max) : undefined);

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "article";

async function staff() {
  return (await cookies()).get("m91_staff")?.value === "1";
}

function clean(b: Record<string, unknown>): Override {
  const o: Override = {};
  const t = str(b.title, 200); if (t !== undefined) o.title = t.trim();
  const h = str(b.hl, 200); if (h !== undefined) o.hl = h;
  const hs = str(b.hlStyle, 20); if (hs !== undefined) o.hlStyle = hs;
  const d = str(b.dek, 400); if (d !== undefined) o.dek = d;
  const body = list(b.body); if (body) o.body = body.map((p) => p.trim()).filter(Boolean);
  const k = str(b.kick, 80); if (k !== undefined && k.trim()) o.kick = k.trim();
  const tg = list(b.tags, 30); if (tg) o.tags = tg.map((x) => x.trim()).filter(Boolean);
  if (typeof b.status === "string" && STATUSES.includes(b.status as Status)) o.status = b.status as Status;
  const seo = str(b.seo, 400); if (seo !== undefined) o.seo = seo;
  const cap = str(b.caption, 300); if (cap !== undefined) o.caption = cap;
  const cr = str(b.credit, 200); if (cr !== undefined) o.credit = cr;
  if (typeof b.ticker === "boolean") o.ticker = b.ticker;
  const pl = str(b.place, 40); if (pl !== undefined) o.place = pl === "Not on homepage" ? "" : pl;
  return o;
}

/** Update an existing article (scraped or newsroom-written). */
export async function PATCH(req: Request) {
  if (!(await staff())) return NextResponse.json({ error: "Sign in to the newsroom first." }, { status: 401 });
  const b = await req.json().catch(() => null);
  const slug = str(b?.slug, 120);
  if (!b || !slug) return NextResponse.json({ error: "Missing slug." }, { status: 400 });
  const patch = clean(b);
  if (patch.title !== undefined && !patch.title) return NextResponse.json({ error: "The headline can't be empty." }, { status: 400 });

  const custom = readCustom().find((c) => c.slug === slug);
  if (custom) {
    const cover = str(b.cover, 9_000_000);
    const img = cover ? saveUpload(slug, cover) : null;
    saveCustom({ ...custom, ...patch, img: img ?? custom.img } as Custom);
  } else {
    saveOverride(slug, patch);
  }
  refresh();
  return NextResponse.json({ ok: true, slug });
}

/** Create a new newsroom article. */
export async function POST(req: Request) {
  if (!(await staff())) return NextResponse.json({ error: "Sign in to the newsroom first." }, { status: 401 });
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ error: "Bad request." }, { status: 400 });
  const p = clean(b);
  if (!p.title) return NextResponse.json({ error: "Add a headline first." }, { status: 400 });
  if (p.status === "Published" && !(p.body && p.body.length)) return NextResponse.json({ error: "Add some article content before publishing." }, { status: 400 });

  const taken = new Set(readCustom().map((c) => c.slug));
  let slug = slugify(p.title);
  for (let i = 2; taken.has(slug); i++) slug = `${slugify(p.title)}-${i}`;
  const cover = str(b.cover, 9_000_000);
  const img = cover ? saveUpload(slug, cover) ?? "" : "";
  saveCustom({
    slug, title: p.title, hl: p.hl ?? "", hlStyle: p.hlStyle ?? "hl-red", dek: p.dek ?? "", body: p.body ?? [], kick: p.kick ?? "News",
    author: str(b.author, 80) || "March \u201991 Staff", tags: p.tags ?? [], img, iso: new Date().toISOString(), status: p.status ?? "Draft",
    seo: p.seo ?? "", caption: p.caption ?? "", credit: p.credit ?? "", ticker: !!p.ticker, place: p.place ?? "",
  });
  refresh();
  return NextResponse.json({ ok: true, slug });
}
