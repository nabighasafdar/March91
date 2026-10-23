import raw from "@/data/march91magazine_full.json";
import { readCustom, readOverrides, storeSig, type Custom, type Override } from "./store";

export const ACCENT = "#E5231B";
export const HIGHLIGHT = "#F2D7C2";

export const profile = raw.profile;
export const INSTAGRAM_URL = `https://www.instagram.com/${raw.profile.username}/`;
export const EMAIL = "march91magazine.nust@gmail.com";

type RawPost = (typeof raw.posts)[number];

// Editorial copy written from each post's own caption (the scrape has captions, not headlines).
const copy: Record<string, { title: string; kick: string; paras?: string[]; hl?: string }> = {
  DdwajnTs0_U: {
    title: "Meet Banana Bread, S3H's Unofficial Mascot", kick: "Campus Life", hl: "Banana Bread",
    paras: [
      "This is Banana Bread, a senior at S3H, which makes it all the more important for every humanities student to know about.",
      "Favorite cuisine: cat food. Signature look: tortoise shell markings. Petting tolerance: unpredictable. She is the first guest of our weekly NUST Animals Appreciation Series.",
    ],
  },
  DeCnGsyMPJt: {
    title: "Kharbuza, the Cat Who Rules C2 and C3", kick: "Campus Life",
    paras: ["For five years he has defended his land (C2 and C3) from foes and vanquished all containers of cat food with his swift tongue and dhamakaydar paws."],
  },
  DeSANmmjPnA: {
    title: "Two Equestrians Who Dash Out of Class", kick: "Student Spotlight", hl: "Equestrians",
    paras: [
      "Meet Ayesha Ahmed and Eeman Tariq. They're international and national level equestrians who love horses, and they have a reputation for dashing out of class.",
      "Their favorite joke? “Why the long face?”",
    ],
  },
  Dd_heAMDBSC: {
    title: "Nizar Ali: Industrial Designer, Instrumentalist", kick: "Student Spotlight",
    paras: ["By day, he's an aspiring industrial designer. Off the clock, he's a seriously impressive instrumentalist."],
  },
  DdtstT2DOT4: {
    title: "Guloona Ali Khattak Makes Her Own Jewelry", kick: "Student Spotlight", hl: "Her Own Jewelry",
    paras: [
      "She's sunshine's best friend, and for a minute, really makes you believe the world is all cupcakes and rainbows.",
      "She's currently enrolled in SADA for industrial design, and creating her own jewelry is just one of her many talents.",
    ],
  },
  DeKAM5Ksnlb: { title: "Where to Shop for Groceries Beyond C1 and C2", kick: "Guide", paras: ["Gather a bunch of friends and hit the Royal cash and carry — a 4 minute walk from Gate-2."] },
  Dd4JuaGsBs5: { title: "How to Budget on Campus Without Running Dry", kick: "Guide", paras: ["Use the Metro Bus, try street food, thrift at the H-9 Bazaar and choose low-cost activities."] },
  Dd_ysi1M5Mw: { title: "Ranking NUST's Best, One Dish at a Time", kick: "Food" },
  DdrQNNxsdk5: { title: "Ranking NUST's Best, One Dish at a Time", kick: "Food" },
  DdoiY9fstdJ: { title: "S3H Kids Are Rating Movies on Letterboxd", kick: "Culture" },
  DerYhlWs7lL: { title: "Weekly NUST News", kick: "News" },
  Dea4MssdcG: { title: "Weekly NUST News", kick: "News" },
  Dd1W7Tosbgr: { title: "Weekly NUST News", kick: "News" },
  DdEyGxIsqY4: { title: "The Beginning of Your Weekly NUST News Download", kick: "News" },
  Dew9GlNMZav: { title: "Office Bearers, Explained", kick: "Societies", paras: ["The ones at the top of the organization chart and at the heart of every big decision."] },
  Ddoqfp4sKvO: { title: "Inside the NUST Music Society", kick: "Directorate Interviews" },
  Dd9X9IZMhzi: { title: "Inside the NUST Excursion Club", kick: "Directorate Interviews" },
  DePcTNhMVYt: { title: "Inside the NUST Community Service Club", kick: "Directorate Interviews" },
  DdJFXVksz0m: { title: "The Undergrad Guide", kick: "Guide" },
  DdmN9FvMAGz: { title: "Got a Story Worth Reporting?", kick: "Contact" },
  DdJ2xUnDO9l: { title: "It's Back to University", kick: "Fashion", paras: ["Creative Director @wun1nch, photography by @yakshostudio, graphics by @ash.cray_."] },
  DdJ2rFjjA25: { title: "Summer's Not Going Anywhere", kick: "Fashion", paras: ["Wear those tees while you can!"] },
  DdJ2n9sDJvj: { title: "Dump That Orange, Fall Looks Better Bright", kick: "Fashion" },
  DdHMvYljM6N: { title: "Reading This in Someone Else's Voice?", kick: "Student Life" },
  DdB5qPEsV9h: { title: "We Record.", kick: "About" },
  DdB5wmaMrNj: { title: "We Write.", kick: "About" },
  DdB5yVUMYoa: { title: "We Report.", kick: "About" },
};

// Site taxonomy. Each kicker (topic) belongs to one of the three top-level sections in the header.
export const SECTIONS = ["News", "Features", "Style"] as const;
export type Section = (typeof SECTIONS)[number];
const sectionOf: Record<string, Section> = {
  News: "News", Societies: "News", "Directorate Interviews": "News", Contact: "News", About: "News",
  "Campus Life": "Features", "Student Spotlight": "Features", Guide: "Features", "Student Life": "Features",
  Fashion: "Style", Food: "Style", Culture: "Style",
};
export const STAFF = profile.full_name.replace("'", "\u2019");

const ROLE = /^(videography(?: and editing)?|photography|graphics|reporters?|featuring|models?|creative director|video edit(?:ing|or)|editing)\s*:?\s*(.*)$/i;
const WRAPPED = new Set(["Dd4JuaGsBs5"]); // caption was hard-wrapped mid-sentence in the scrape

/** Turn a raw Instagram caption into article paragraphs plus a credits list. */
function parseCaption(code: string, caption: string) {
  let text = caption.replace(/\r/g, "");
  if (WRAPPED.has(code)) {
    text = text.split("\n").reduce((out, line) => {
      const prev = out[out.length - 1];
      if (prev === undefined || /^\d\)/.test(line) || /[.!?\u201d"')]$/.test(prev)) out.push(line);
      else out[out.length - 1] = `${prev} ${line}`;
      return out;
    }, [] as string[]).join("\n\n");
  }
  const credits: { role: string; who: string[] }[] = [];
  const paras: string[] = [];
  for (const block of text.split(/\n\s*\n/)) {
    const keep: string[] = [];
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^(#\w+\s*)+$/.test(line)) continue; // hashtag-only line
      const m = ROLE.exec(line);
      if (m) {
        const who: string[] = m[2].match(/@[\w.]+/g) ?? [];
        while (i + 1 < lines.length && /^(@[\w.]+\s*)+$/.test(lines[i + 1])) who.push(...(lines[++i].match(/@[\w.]+/g) ?? []));
        const role = m[1].replace(/^\w/, (c) => c.toUpperCase());
        const prev = credits.find((c) => c.role === role);
        if (prev) prev.who.push(...who); else credits.push({ role, who });
        continue;
      }
      keep.push(line);
    }
    // consecutive short lines stay together as one pre-line paragraph; long lines are paragraphs of their own
    let group: string[] = [];
    const flush = () => { if (group.length) paras.push(group.join("\n")); group = []; };
    for (const l of keep) { if (l.length > 80) { flush(); paras.push(l); } else group.push(l); }
    flush();
  }
  return { paras, credits };
}

const sentenceCut = (t: string, max: number) => {
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const i = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  return (i > 60 ? cut.slice(0, i + 1) : cut.replace(/\s+\S*$/, "") + "\u2026");
};

export type Story = {
  code: string; url: string; img: string; title: string; kick: string; paras: string[]; hl?: string;
  likes: number; comments: number; type: string; date: string; fullDate: string;
  slug: string; section: Section; dek: string; body: string[]; credits: { role: string; who: string[] }[];
  tags: string[]; read: number; author: string; iso: string; mentions: string[]; carousel: number;
  status: string; hlStyle: string; place: string; ticker: boolean; seo: string; caption: string; credit: string; custom: boolean;
};

const fmt = (iso: string, o: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString("en-US", { ...o, timeZone: "UTC" });

const norm = (c: string) => c.replace(/-/g, "");
const copyFor = (c: string) => copy[c] ?? copy[norm(c)];
const readMin = (body: string[]) => Math.max(1, Math.round(body.join(" ").split(/\s+/).filter(Boolean).length / 200));
export const PLACEHOLDER = "/img/placeholder.svg";

export const posts: RawPost[] = raw.posts;

// Staff edits, reloaded whenever the store files change (see refresh()).
let OV: Record<string, Override> = {};
let CUSTOM: Custom[] = [];

function customStory(c: Custom): Story {
  return {
    code: c.slug, url: "", img: c.img || PLACEHOLDER, title: c.title, kick: c.kick, paras: c.body.slice(0, 2), hl: c.hl || undefined,
    likes: 0, comments: 0, type: "article",
    date: fmt(c.iso, { month: "short", day: "numeric" }), fullDate: fmt(c.iso, { month: "long", day: "numeric", year: "numeric" }),
    slug: c.slug, section: sectionOf[c.kick] ?? "News", dek: c.dek, body: c.body, credits: [], tags: c.tags, read: readMin(c.body),
    author: c.author || STAFF, iso: c.iso, mentions: [], carousel: 0,
    status: c.status, hlStyle: c.hlStyle || "hl-red", place: c.place || "", ticker: !!c.ticker, seo: c.seo || c.dek, caption: c.caption, credit: c.credit, custom: true,
  };
}

function scrapedStory(code: string): Story {
  const p = posts.find((x) => x.shortcode === code);
  if (!p) throw new Error(`Unknown post ${code}`);
  const c = copyFor(code) ?? { title: code, kick: "Post" };
  const { paras: body, credits } = parseCaption(code, p.caption ?? "");
  const tags = [...new Set([...((p.hashtags ?? []) as string[]).map((t) => t.replace(/^#/, "")), c.kick, p.type === "reel" ? "Reel" : p.type === "carousel" ? "Carousel" : "Post"])];
  const dek = sentenceCut((c.paras?.[0] ?? body[0] ?? c.title).replace(/\n/g, " "), 190);
  const base: Story = {
    code, url: p.url, img: `/img/p/${code}.jpg`, title: c.title, kick: c.kick, paras: c.paras ?? [], hl: c.hl,
    likes: Number(p.likes) || 0, comments: Number(p.comments) || 0, type: p.type,
    date: fmt(p.date, { month: "short", day: "numeric" }),
    fullDate: fmt(p.date, { month: "long", day: "numeric", year: "numeric" }),
    slug: code, section: sectionOf[c.kick] ?? "News", dek,
    body, credits, tags, read: readMin(body), author: STAFF, iso: p.date,
    mentions: [...new Set<string>((p.mentions ?? []) as string[])].filter((m) => m !== "@gmail.com"),
    carousel: (p.images ?? []).length,
    status: "Published", hlStyle: "hl-red", place: "", ticker: false, seo: dek, caption: "From the original Instagram post", credit: "March91 / Staff", custom: false,
  };
  const o = OV[code];
  if (!o) return base;
  const kick = o.kick ?? base.kick;
  const bodyNew = o.body ?? base.body;
  return {
    ...base, kick, section: sectionOf[kick] ?? base.section,
    title: o.title ?? base.title,
    hl: o.hl !== undefined ? o.hl || undefined : base.hl,
    hlStyle: o.hlStyle ?? base.hlStyle,
    dek: o.dek ?? base.dek,
    // homepage cards show the first paragraphs; keep them in step with an edited body
    paras: o.body ? bodyNew.slice(0, 2) : base.paras,
    body: bodyNew, read: readMin(bodyNew), tags: o.tags ?? base.tags,
    status: o.status ?? base.status, seo: o.seo ?? o.dek ?? base.seo, caption: o.caption ?? base.caption, credit: o.credit ?? base.credit,
    ticker: o.ticker ?? false, place: o.place ?? "",
  };
}

export function story(code: string): Story {
  const c = CUSTOM.find((x) => x.slug === code);
  return c ? customStory(c) : scrapedStory(code);
}
const many = (codes: string[]) => codes.map(story);

export const bg = (img: string) => ({ backgroundImage: `url(${img})` });

const total = (k: "likes" | "comments") => posts.reduce((n, p) => n + (Number(p[k]) || 0), 0);
const sparkA = "M2 14 C12 6 20 6 28 12 S44 16 52 10 66 6 78 12";
const sparkB = "M2 12 C10 8 18 6 26 12 S40 14 50 8 66 10 78 6";
const sparkC = "M2 16 C12 8 20 10 28 12 S44 6 52 10 66 14 78 12";
const sparkD = "M2 10 C10 8 16 12 24 10 S40 6 50 14 66 12 78 4";

// ---- Everything below is rebuilt by refresh() whenever staff edits something ----------------------
// These are live ES bindings: importers always see the latest values after refresh() has run.
export let allArticles: Story[] = [];   // every article incl. drafts (admin)
export let articles: Story[] = [];      // published only, newest first (public site)
export let topics: { name: string; count: number; section: string }[] = [];
export let lead: Story, second: Story, third: Story, heroVideo: Story, featured: Story;
export let stats: { tag: string; value: string; spark: string }[] = [];
export let nav: { label: string; story: Story; subs: { label: string; topic: string }[] }[] = [];
export let latest: Story[] = [], episodes: Story[] = [], shorts: Story[] = [], spotlight: Story[] = [];
export let cats: { name: string; lower: string; topic: string; lead: Story; dek: string; items: Story[] }[] = [];
export let mostRead: (Story & { n: string })[] = [];
export let tickerText = "";

const live = (code: string, fallback: string) => {
  const s = story(code);
  return s.status === "Published" ? s : story(fallback);
};

function build() {
  const scraped = posts.map((p) => scrapedStory(p.shortcode));
  const custom = CUSTOM.map(customStory);
  allArticles = [...custom, ...scraped].sort((a, b) => +new Date(b.iso) - +new Date(a.iso));
  articles = allArticles.filter((a) => a.status === "Published");

  topics = Object.entries(articles.reduce<Record<string, number>>((m, a) => ((m[a.kick] = (m[a.kick] ?? 0) + 1), m), {}))
    .sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count, section: sectionOf[name] ?? "News" }));

  const placed = (slot: string) => articles.filter((a) => a.place === slot);
  const pick = (slot: string, fallback: string) => placed(slot)[0] ?? live(fallback, fallback);
  lead = pick("Lead story", "DdwajnTs0_U");
  second = pick("Secondary", "DeSANmmjPnA");
  third = live("DdtstT2DOT4", "DdtstT2DOT4");
  heroVideo = live("DdoiY9fstdJ", "DdoiY9fstdJ");

  const pubTotal = (k: "likes" | "comments") => articles.reduce((n, a) => n + a[k], 0) || total(k);
  stats = [
    { tag: "Followers", value: profile.followers.toLocaleString("en-US"), spark: sparkA },
    { tag: "Posts", value: String(Math.max(profile.posts_count, articles.length)), spark: sparkB },
    { tag: "Likes", value: pubTotal("likes").toLocaleString("en-US"), spark: sparkC },
    { tag: "Comments", value: pubTotal("comments").toLocaleString("en-US"), spark: sparkD },
  ];

  nav = [
    { label: "News", story: live("DerYhlWs7lL", "DerYhlWs7lL"), subs: [{ label: "Weekly News", topic: "News" }, { label: "Societies", topic: "Societies" }, { label: "Directorate Interviews", topic: "Directorate Interviews" }] },
    { label: "Features", story: live("DeCnGsyMPJt", "DeCnGsyMPJt"), subs: [{ label: "Student Spotlight", topic: "Student Spotlight" }, { label: "Campus Life", topic: "Campus Life" }, { label: "Guides", topic: "Guide" }] },
    { label: "Style", story: live("DdJ2xUnDO9l", "DdJ2xUnDO9l"), subs: [{ label: "Fashion", topic: "Fashion" }, { label: "Food", topic: "Food" }, { label: "Culture", topic: "Culture" }] },
  ];

  const pub = (codes: string[]) => many(codes).filter((s) => s.status === "Published");
  const dedupe = (l: Story[]) => l.filter((s, i) => l.findIndex((x) => x.slug === s.slug) === i);
  latest = dedupe([...placed("Latest"), ...pub(["Dew9GlNMZav", "DePcTNhMVYt", "DeKAM5Ksnlb", "Dd_ysi1M5Mw"])]).slice(0, 4);
  featured = live("DerYhlWs7lL", "DerYhlWs7lL");
  episodes = pub(["Dea4-MssdcG", "Dd1W7Tosbgr", "DdEyGxIsqY4", "DePcTNhMVYt"]);
  shorts = pub(["DdrQNNxsdk5", "DdEyGxIsqY4", "DdJFXVksz0m", "Ddoqfp4sKvO", "Dd9X9IZMhzi", "DdmN9FvMAGz"]);
  spotlight = pub(["DeSANmmjPnA", "Dd_heAMDBSC", "DdtstT2DOT4", "DeCnGsyMPJt"]);

  cats = [
    { name: "Fashion", lower: "fashion", topic: "Fashion", lead: live("DdJ2xUnDO9l", "DdJ2xUnDO9l"),
      dek: "Creative direction by @wun1nch, photography by @yakshostudio and graphics by @ash.cray_ — the back-to-university shoot.",
      items: pub(["DdJ2rFjjA25", "DdJ2n9sDJvj", "DdHMvYljM6N"]) },
    { name: "Campus Guides", lower: "guides", topic: "Guide", lead: live("Dd4JuaGsBs5", "Dd4JuaGsBs5"),
      dek: "Spending money is inevitable, but how and where you spend it is up to you. Budgeting is your best friend.",
      items: pub(["DeKAM5Ksnlb", "DdJFXVksz0m", "Dd_ysi1M5Mw"]) },
  ];

  mostRead = [...articles].sort((a, b) => b.likes - a.likes).slice(0, 5).map((a, i) => ({ n: String(i + 1), ...a }));

  const flagged = articles.filter((a) => a.ticker).map((a) => a.title);
  const rest = posts.slice(0, 6).map((p) => story(p.shortcode)).filter((s) => s.status === "Published").map((s) => s.title);
  tickerText = [...new Set([...flagged, ...rest])].slice(0, 6).join(" · ") + ` · Follow @${profile.username} for more.`;
}

let sig = "";
/** Call at the top of every server page: re-reads staff edits from disk if (and only if) they changed. */
export function refresh() {
  const s = storeSig();
  if (s === sig && allArticles.length) return;
  sig = s;
  OV = readOverrides();
  CUSTOM = readCustom();
  build();
}
refresh();

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
/** Any article, including drafts — for the newsroom screens only. */
export const anyArticle = (slug: string) => allArticles.find((a) => a.slug === slug);

export const related = (a: Story, n = 3) => {
  const same = articles.filter((x) => x.slug !== a.slug && x.kick === a.kick);
  const sect = articles.filter((x) => x.slug !== a.slug && x.kick !== a.kick && x.section === a.section);
  return [...same, ...sect, ...articles.filter((x) => x.slug !== a.slug)].filter((x, i, l) => l.indexOf(x) === i).slice(0, n);
};

export const topLoved = (n = 5) => [...articles].sort((a, b) => b.likes - a.likes).slice(0, n);
export const ini = (name: string) => name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
export const articleHref = (a: { slug: string }) => `/articles/${a.slug}`;
