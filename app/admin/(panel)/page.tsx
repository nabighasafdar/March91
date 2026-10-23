import { AdminArticles } from "@/components/admin/AdminArticles";
import { allArticles, articles, profile, refresh, topics } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function AdminHome() {
  refresh();
  const likes = articles.reduce((n, a) => n + a.likes, 0);
  const comments = articles.reduce((n, a) => n + a.comments, 0);
  const rows = allArticles.map((a) => ({
    slug: a.slug, title: a.title, kick: a.kick, section: a.section, img: a.img, type: a.custom ? "article" : a.type,
    date: a.fullDate, iso: a.iso, likes: a.likes, comments: a.comments, author: a.author, status: a.status,
  }));
  return <AdminArticles rows={rows} topics={topics.map((t) => t.name)} totals={{ published: articles.length, drafts: allArticles.length - articles.length, likes, comments, followers: profile.followers }} />;
}
