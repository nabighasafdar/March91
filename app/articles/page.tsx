import type { Metadata } from "next";
import { ArticleBrowser } from "@/components/ArticleBrowser";
import { InnerFooter, InnerTop } from "@/components/InnerChrome";
import { articles, profile, topLoved, topics, refresh } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Stories — March91",
  description: `${articles.length} stories from ${profile.full_name}, NUST's official student magazine.`,
};

type Params = { section?: string; topic?: string; type?: string; q?: string };

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<Params> }) {
  refresh();
  const sp = await searchParams;
  return (
    <div className="pg pg-in">
      <div className="wrap">
        <InnerTop />
        <ArticleBrowser
          stories={articles}
          loved={topLoved(5)}
          topics={topics}
          initial={{ section: sp.section ?? "All", topic: sp.topic ?? "", type: sp.type ?? "", q: sp.q ?? "" }}
        />
        <InnerFooter />
      </div>
    </div>
  );
}
