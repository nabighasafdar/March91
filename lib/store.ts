import fs from "node:fs";
import path from "node:path";

/**
 * Tiny file-backed CMS store. Scraped posts stay in data/march91magazine_full.json; staff edits live in
 *  - data/overrides.json   edits to scraped posts, keyed by slug
 *  - data/custom.json      articles written in the newsroom
 *  - data/uploads/*        cover images uploaded in the newsroom
 * Needs a writable, persistent filesystem (local, VPS, Docker volume) — not a serverless host like Vercel.
 */
export type Status = "Draft" | "In review" | "Published";

export type Override = Partial<{
  title: string; hl: string; hlStyle: string; dek: string; body: string[]; kick: string; tags: string[];
  status: Status; seo: string; caption: string; credit: string; ticker: boolean; place: string;
}>;

export type Custom = {
  slug: string; title: string; hl: string; hlStyle: string; dek: string; body: string[]; kick: string; author: string;
  tags: string[]; img: string; iso: string; status: Status; seo: string; caption: string; credit: string; ticker: boolean; place: string;
};

export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const OV = path.join(DATA_DIR, "overrides.json");
const CU = path.join(DATA_DIR, "custom.json");

function read<T>(file: string, fallback: T): T {
  try { return JSON.parse(fs.readFileSync(file, "utf8")) as T; } catch { return fallback; }
}
function write(file: string, data: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file);
}
const mtime = (f: string) => { try { return fs.statSync(f).mtimeMs; } catch { return 0; } };

export const readOverrides = () => read<Record<string, Override>>(OV, {});
export const readCustom = () => read<Custom[]>(CU, []);
export const storeSig = () => `${mtime(OV)}:${mtime(CU)}`;

export function saveOverride(slug: string, patch: Override) {
  const all = readOverrides();
  all[slug] = { ...all[slug], ...patch };
  write(OV, all);
}

export function saveCustom(c: Custom) {
  const all = readCustom();
  const i = all.findIndex((x) => x.slug === c.slug);
  if (i >= 0) all[i] = c; else all.unshift(c);
  write(CU, all);
}

export function saveUpload(slug: string, dataUrl: string): string | null {
  const m = /^data:image\/(png|jpe?g|webp|gif);base64,(.+)$/.exec(dataUrl);
  if (!m) return null;
  const buf = Buffer.from(m[2], "base64");
  if (buf.length > 6 * 1024 * 1024) return null;
  const name = `${slug}-${Date.now()}.${m[1] === "jpeg" ? "jpg" : m[1]}`;
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
  return `/api/img/${name}`;
}
