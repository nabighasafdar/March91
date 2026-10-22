import raw from "@/data/march91magazine_full.json";

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
};

export type Story = {
  code: string; url: string; img: string; title: string; kick: string; paras: string[]; hl?: string;
  likes: number; comments: number; type: string; date: string; fullDate: string;
};

const fmt = (iso: string, o: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString("en-US", { ...o, timeZone: "UTC" });

const norm = (c: string) => c.replace(/-/g, "");
const copyFor = (c: string) => copy[c] ?? copy[norm(c)];

export const posts: RawPost[] = raw.posts;

export function story(code: string): Story {
  const p = posts.find((x) => x.shortcode === code);
  if (!p) throw new Error(`Unknown post ${code}`);
  const c = copyFor(code) ?? { title: code, kick: "Post" };
  return {
    code, url: p.url, img: `/img/p/${code}.jpg`, title: c.title, kick: c.kick, paras: c.paras ?? [], hl: c.hl,
    likes: Number(p.likes) || 0, comments: Number(p.comments) || 0, type: p.type,
    date: fmt(p.date, { month: "short", day: "numeric" }),
    fullDate: fmt(p.date, { month: "long", day: "numeric", year: "numeric" }),
  };
}
const many = (codes: string[]) => codes.map(story);

export const bg = (img: string) => ({ backgroundImage: `url(${img})` });

// Hero
export const lead = story("DdwajnTs0_U");
export const second = story("DeSANmmjPnA");
export const third = story("DdtstT2DOT4");
export const heroVideo = story("DdoiY9fstdJ");

const total = (k: "likes" | "comments") => posts.reduce((n, p) => n + (Number(p[k]) || 0), 0);
const sparkA = "M2 14 C12 6 20 6 28 12 S44 16 52 10 66 6 78 12";
const sparkB = "M2 12 C10 8 18 6 26 12 S40 14 50 8 66 10 78 6";
const sparkC = "M2 16 C12 8 20 10 28 12 S44 6 52 10 66 14 78 12";
const sparkD = "M2 10 C10 8 16 12 24 10 S40 6 50 14 66 12 78 4";
export const stats = [
  { tag: "Followers", value: profile.followers.toLocaleString("en-US"), spark: sparkA },
  { tag: "Posts", value: String(profile.posts_count), spark: sparkB },
  { tag: "Likes", value: total("likes").toLocaleString("en-US"), spark: sparkC },
  { tag: "Comments", value: total("comments").toLocaleString("en-US"), spark: sparkD },
];

export const nav = [
  { label: "News", story: story("DerYhlWs7lL"), subs: ["Weekly News", "Societies", "Directorate Interviews"] },
  { label: "Features", story: story("DeCnGsyMPJt"), subs: ["Student Spotlight", "Campus Life", "Guides"] },
  { label: "Style", story: story("DdJ2xUnDO9l"), subs: ["Fashion", "Food", "Culture"] },
];

export const latest = many(["Dew9GlNMZav", "DePcTNhMVYt", "DeKAM5Ksnlb", "Dd_ysi1M5Mw"]);

export const featured = story("DerYhlWs7lL");
export const episodes = many(["Dea4-MssdcG", "Dd1W7Tosbgr", "DdEyGxIsqY4", "DePcTNhMVYt"]);

export const shorts = many(["DdrQNNxsdk5", "DdEyGxIsqY4", "DdJFXVksz0m", "Ddoqfp4sKvO", "Dd9X9IZMhzi", "DdmN9FvMAGz"]);

export const cats = [
  {
    name: "Fashion", lower: "fashion",
    lead: story("DdJ2xUnDO9l"),
    dek: "Creative direction by @wun1nch, photography by @yakshostudio and graphics by @ash.cray_ — the back-to-university shoot.",
    items: many(["DdJ2rFjjA25", "DdJ2n9sDJvj", "DdHMvYljM6N"]),
  },
  {
    name: "Campus Guides", lower: "guides",
    lead: story("Dd4JuaGsBs5"),
    dek: "Spending money is inevitable, but how and where you spend it is up to you. Budgeting is your best friend.",
    items: many(["DeKAM5Ksnlb", "DdJFXVksz0m", "Dd_ysi1M5Mw"]),
  },
];

export const spotlight = many(["DeSANmmjPnA", "Dd_heAMDBSC", "DdtstT2DOT4", "DeCnGsyMPJt"]);

export const mostRead = [...posts]
  .sort((a, b) => Number(b.likes) - Number(a.likes))
  .slice(0, 5)
  .map((p, i) => ({ n: String(i + 1), ...story(p.shortcode) }));

export const tickerText = [...posts.slice(0, 6)]
  .map((p) => copyFor(p.shortcode)?.title)
  .filter(Boolean)
  .join(" · ") + ` · Follow @${profile.username} for more.`;
