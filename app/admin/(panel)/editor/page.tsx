import { AdminEditor } from "@/components/admin/AdminEditor";
import { STAFF, allArticles, anyArticle, refresh, topics } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function EditorPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  refresh();
  const { slug } = await searchParams;
  const a = (slug && anyArticle(slug)) || allArticles[0];
  return (
    <AdminEditor
      key={`${a.slug}-${a.title}-${a.status}-${a.body.length}-${a.dek.length}-${a.tags.join()}-${a.place}-${a.ticker}`}
      categories={[...new Set([...topics.map((t) => t.name), a.kick])]}
      staff={STAFF}
      article={{
        slug: a.slug, title: a.title, hl: a.hl ?? "", hlStyle: a.hlStyle, dek: a.dek, body: a.body.join("\n\n"), img: a.img, kick: a.kick,
        tags: a.tags, fullDate: a.fullDate, author: a.author, comments: a.comments, url: a.url, status: a.status, seo: a.seo,
        caption: a.caption, credit: a.credit, place: a.place || "Not on homepage", ticker: a.ticker, custom: a.custom,
      }}
    />
  );
}
