export const ACCENT = "#E5231B";
export const HIGHLIGHT = "#F2D7C2";

const up = { badge: "#79C29D", rot: "none", dir: "Rising", bg: "linear-gradient(180deg,#F0F0F0,#F7F7F7)" };
const down = { badge: "#E07272", rot: "rotate(180deg)", dir: "Falling", bg: "linear-gradient(180deg,#F9E4E4,#FBEFEF)" };

export const nav = [
  { label: "News", tone: "t9", subs: ["Pakistan", "World", "Business", "Politics", "Climate"], feat: "The Hotels Rebuilding the Old Mall Road Skyline" },
  { label: "Culture", tone: "t4", subs: ["Books", "Music", "Film & TV", "Art", "Heritage"], feat: "The Qawwali Revival Is Happening in Basements" },
  { label: "Lifestyle", tone: "t7", subs: ["Food", "Style", "Travel", "Home", "Wellbeing"], feat: "The Weekend the Whole City Went to the Sea" },
];

export const stats = [
  { ...up, tag: "#Elections", pct: "5.2%", sub: "4,210", spark: "M2 14 C12 6 20 6 28 12 S44 16 52 10 66 6 78 12" },
  { ...up, tag: "#Cricket", pct: "3.8%", sub: "3,094", spark: "M2 12 C10 8 18 6 26 12 S40 14 50 8 66 10 78 6" },
  { ...down, tag: "#Tech", pct: "7.1%", sub: "1,772", spark: "M2 16 C12 8 20 10 28 12 S44 6 52 10 66 14 78 12" },
  { ...up, tag: "#Fashion", pct: "4.4%", sub: "2,457", spark: "M2 10 C10 8 16 12 24 10 S40 6 50 14 66 12 78 4" },
];

export const latest = [
  { tone: "t9", cat: "City", title: "The Hotels Rebuilding the Old Mall Road Skyline", author: "Saad Iqbal", date: "Oct 21", read: "6 min" },
  { tone: "t10", cat: "News", title: "A New Motorway, and the Towns It Quietly Bypasses", author: "Hamza Ali", date: "Oct 21", read: "9 min" },
  { tone: "t6", cat: "Food", title: "Winter Fruit Season, Ranked by a Market Seller", author: "Mehwish Tariq", date: "Oct 20", read: "4 min" },
  { tone: "t11", cat: "Travel", title: "Walking the Old Trade Route Before the Snow Closes It", author: "Bilal Ahmed", date: "Oct 19", read: "11 min" },
];

export const episodes = [
  { tone: "t2", kind: "Podcast", dur: "48:10", title: "Night Shift: The People Who Keep the City Awake" },
  { tone: "t4", kind: "Episode", dur: "24:05", title: "Inside a Palace That Became a Public Library" },
  { tone: "t15", kind: "Podcast", dur: "36:42", title: "Money Talk: Renting vs Buying in 2026" },
  { tone: "t5", kind: "Documentary", dur: "41:18", title: "The Herders Planning for a Warmer Winter" },
];

export const shorts = [
  { tone: "t2", views: "212K", title: "How chai tastes at 3 a.m." },
  { tone: "t13", views: "98K", title: "The office cats of Anarkali" },
  { tone: "t8", views: "1.2M", title: "Behind the camera on live night" },
  { tone: "t1", views: "76K", title: "The commute, in 60 seconds" },
  { tone: "t14", views: "143K", title: "Spring in the botanical garden" },
  { tone: "t7", views: "305K", title: "Kite day at the beach" },
];

export const cats = [
  {
    name: "Culture", lower: "culture", tone: "t4", kick: "Heritage",
    title: "The Qawwali Revival Is Happening in Basements and Bedrooms",
    dek: "A new generation is learning the form from grandparents and YouTube at once — and recording it on phones in rooms built for neither.",
    author: "Usman Sheikh", comments: "24", read: "8 min read",
    items: [
      { tone: "t17", kick: "Books", title: "Five Debut Novels That Read Like Letters Home", author: "Sana Javed", read: "5 min" },
      { tone: "t8", kick: "Film", title: "The Small Cinemas Refusing to Close", author: "Hamza Ali", read: "7 min" },
      { tone: "t14", kick: "Art", title: "Painters Return to the Botanical Garden", author: "Ayesha Noor", read: "6 min" },
    ],
  },
  {
    name: "Lifestyle", lower: "lifestyle", tone: "t7", kick: "Weekend",
    title: "The Weekend the Whole City Went to the Sea",
    dek: "Kites, cold water and a traffic jam that stretched back to the highway. A field report from the first warm Sunday of the season.",
    author: "Mehwish Tariq", comments: "41", read: "6 min read",
    items: [
      { tone: "t11", kick: "Travel", title: "A Three-Day Route Through the Northern Valleys", author: "Bilal Ahmed", read: "10 min" },
      { tone: "t12", kick: "Outdoors", title: "The Birdwatchers Who Wake Up Before the Fishermen", author: "Noor Fatima", read: "4 min" },
      { tone: "t15", kick: "Home", title: "Small Porches, Big Light: Five Homes That Work", author: "Daniyal Khan", read: "5 min" },
    ],
  },
];

export const columnists = [
  { tone: "t8", name: "Farah Siddiqui", column: "The City Desk", piece: "Our Cities Are Built for Cars. Who Asked?", read: "5 min" },
  { tone: "t12", name: "Omar Haider", column: "On Money", piece: "The Savings Advice Nobody Under 30 Can Follow", read: "6 min" },
  { tone: "t13", name: "Rabia Anwar", column: "Screen Time", piece: "In Defence of the Very Long Video", read: "4 min" },
  { tone: "t16", name: "Kamran Yousaf", column: "Letters", piece: "You Wrote Back. Here Is What You Said.", read: "7 min" },
];

export const mostRead = [
  { n: "1", title: "When the City Learned to Listen Again After Midnight", read: "7 min" },
  { n: "2", title: "First-Time Voters Rewrite the Rules of the Campaign Trail", read: "5 min" },
  { n: "3", title: "A New Motorway, and the Towns It Quietly Bypasses", read: "9 min" },
  { n: "4", title: "The Savings Advice Nobody Under 30 Can Follow", read: "6 min" },
  { n: "5", title: "The Weekend the Whole City Went to the Sea", read: "6 min" },
];

export const issues = [
  { tone: "t3", name: "Issue 14 — The Night Issue", month: "October 2026", cover: "Who Stays Up?" },
  { tone: "t5", name: "Issue 13 — Open Country", month: "August 2026", cover: "After the Rain" },
  { tone: "t6", name: "Issue 12 — Food", month: "June 2026", cover: "Table for Twelve" },
  { tone: "t10", name: "Issue 11 — Roads", month: "April 2026", cover: "Leaving Town" },
  { tone: "t4", name: "Issue 10 — Craft", month: "March 2026", cover: "Made by Hand" },
];

export const tickerText =
  "Karachi's night markets stretch past 2 a.m. as winter arrives. National team names two uncapped spinners for the home series. Lahore literary circle opens applications for young writers. Rupee holds steady ahead of policy meeting. Episode 48 of The Long Table goes live tonight at 9.";
