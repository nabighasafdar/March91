"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUR, Clock } from "./icons";
import type { Story } from "@/lib/data";

type Topic = { name: string; count: number; section: string };
type Props = {
  stories: Story[];
  loved: Story[];
  topics: Topic[];
  initial: { section: string; topic: string; type: string; q: string };
};

const SECTIONS = ["All", "News", "Features", "Style"];
const PAGE = 9;
const bg = (img: string) => ({ backgroundImage: `url(${img})` });
const initials = (s: string) => s.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();

export function ArticleBrowser({ stories, loved, topics, initial }: Props) {
  const [section, setSection] = useState(SECTIONS.includes(initial.section) ? initial.section : "All");
  const [topic, setTopic] = useState(initial.topic);
  const [type] = useState(initial.type);
  const [q, setQ] = useState(initial.q);
  const [sort, setSort] = useState("Newest");
  const [shown, setShown] = useState(PAGE);

  const reset = () => setShown(PAGE);
  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let r = stories
      .filter((s) => section === "All" || s.section === section)
      .filter((s) => !topic || s.kick === topic)
      .filter((s) => !type || s.type === type)
      .filter((s) => !needle || `${s.title} ${s.dek} ${s.kick} ${s.body.join(" ")}`.toLowerCase().includes(needle));
    if (sort === "Most loved") r = [...r].sort((a, b) => b.likes - a.likes);
    if (sort === "Longest read") r = [...r].sort((a, b) => b.read - a.read);
    return r;
  }, [stories, section, topic, type, q, sort]);

  const count = (sec: string) => stories.filter((s) => sec === "All" || s.section === sec).length;
  const filtered = section !== "All" || topic || type || q.trim();
  const feat = !filtered ? stories.find((s) => s.type === "carousel" || s.type === "image") ?? stories[0] : undefined;
  const list = items.filter((s) => s !== feat);
  const visible = list.slice(0, shown);
  const heading = topic || (section === "All" ? "Latest" : section);

  return (
    <>
      <section className="card ls-pad" style={{ padding: "56px 48px 32px", display: "flex", flexDirection: "column", gap: 28 }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 15, color: "#555" }}><Link href="/" style={{ color: "#555" }}>Home</Link> <span aria-hidden="true">/</span> <span>All stories</span></nav>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
          <div>
            <h1 className="d ls-title" style={{ margin: 0, fontSize: 112, lineHeight: 0.92, letterSpacing: "-0.03em" }}>All <span style={{ color: "#E5231B" }}>Stories</span></h1>
            <p style={{ margin: "18px 0 0", fontSize: 19, color: "#444", maxWidth: 560, lineHeight: 1.5 }}>{stories.length} stories from the March91 newsroom — student spotlights, campus guides, weekly news and fashion, newest first.</p>
          </div>
          <div style={{ position: "relative", flex: "0 1 420px" }}>
            <label className="sr" htmlFor="q">Search stories</label>
            <svg className="ic" viewBox="0 0 24 24" style={{ position: "absolute", left: 18, top: 17, color: "#666" }} aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            <input id="q" className="ls-in" type="search" placeholder="Search headlines, topics, captions" value={q} onChange={(e) => { setQ(e.target.value); reset(); }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", borderTop: "1px solid #E6E6E6", paddingTop: 22 }}>
          <div role="tablist" aria-label="Filter by section" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SECTIONS.map((s) => (
              <button key={s} type="button" role="tab" aria-selected={section === s} className={section === s ? "fbtn on" : "fbtn"} onClick={() => { setSection(s); setTopic(""); reset(); }}>{s} <small>{count(s)}</small></button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, color: "#555" }}>
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} style={{ height: 44, borderRadius: 999, border: "1px solid #DADADA", padding: "0 16px", font: "inherit", background: "#fff", color: "#111" }}>
              <option>Newest</option><option>Most loved</option><option>Longest read</option>
            </select>
          </div>
        </div>
      </section>

      {feat && (
        <Link href={`/articles/${feat.slug}`} className="card hov ls-feat" style={{ textDecoration: "none", color: "#111" }}>
          <div className="ph" style={{ minHeight: 460, borderRadius: 0 }} role="img" aria-label={feat.title}><i style={bg(feat.img)} /></div>
          <div style={{ padding: 48, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, background: "linear-gradient(180deg,#F0F0F0,#F7F7F7)" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ background: "#111", color: "#fff", borderRadius: 999, padding: "4px 12px", fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase" }}>Editor&rsquo;s pick</span><span className="kick">{feat.kick}</span></div>
            <h2 className="d hl" style={{ margin: 0, fontSize: 58, lineHeight: 1.02 }}>{feat.title}</h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "#333" }}>{feat.dek}</p>
            <div className="meta"><span style={{ color: "#111" }}><span className="av" style={{ width: 28, height: 28, fontSize: 12 }}>{initials(feat.author)}</span>{feat.author}</span><span>{feat.fullDate}</span><span><Clock />{feat.read} min read</span></div>
          </div>
        </Link>
      )}

      <section className="card ls-pad" style={{ padding: "44px 48px 48px" }}>
        <div className="ls">
          <div style={{ display: "flex", flexDirection: "column", gap: 32, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <h2 className="d" style={{ margin: 0, fontSize: 44, lineHeight: 1 }}>{heading}</h2>
              <span style={{ fontSize: 15, color: "#555" }}>
                {filtered ? <>Showing {items.length} stories · <a href="/articles" onClick={(e) => { e.preventDefault(); setSection("All"); setTopic(""); setQ(""); reset(); }} style={{ color: "#555" }}>clear filters</a></> : <>Showing {Math.min(shown, list.length)} of {list.length} stories</>}
              </span>
            </div>
            <div className="grid3">
              {visible.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="hov" style={{ display: "flex", flexDirection: "column", gap: 12, textDecoration: "none", color: "#111" }}>
                  <div className="ph" style={{ aspectRatio: "4/3" }} role="img" aria-label={a.title}><i style={bg(a.img)} />
                    <span style={{ position: "absolute", left: 12, top: 12, background: "rgba(255,255,255,.92)", color: "#111", borderRadius: 999, padding: "3px 10px", fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase" }}>{a.kick}</span>
                  </div>
                  <h3 className="d hl" style={{ margin: "4px 0 0", fontSize: 28, lineHeight: 1.08 }}>{a.title}</h3>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "#444" }}>{a.dek}</p>
                  <div className="meta" style={{ fontSize: 14, gap: 12, marginTop: "auto" }}><span style={{ color: "#111" }}><span className="av" style={{ width: 28, height: 28, fontSize: 12 }}>{initials(a.author)}</span>{a.author}</span><span>{a.date}</span><span>{a.read} min</span></div>
                </Link>
              ))}
            </div>
            {items.length === 0 && (
              <div style={{ textAlign: "center", padding: "56px 0", color: "#555" }}><div className="d" style={{ fontSize: 36, color: "#111" }}>No stories found</div><p>Try another section or a different search.</p></div>
            )}
            {shown < list.length && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, borderTop: "1px solid #E6E6E6", paddingTop: 28, flexWrap: "wrap" }}>
                <button type="button" className="pill" onClick={() => setShown((n) => n + PAGE)}>Load more stories <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg></button>
                <span style={{ fontSize: 15, color: "#555" }}>{Math.min(shown, list.length)} of {list.length}</span>
              </div>
            )}
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: 20 }} aria-label="More">
            <div style={{ background: "linear-gradient(180deg,#F0F0F0,#F7F7F7)", borderRadius: 24, padding: 26 }}>
              <div className="d" style={{ fontSize: 32, lineHeight: 1, marginBottom: 8 }}>Most Loved</div>
              <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {loved.map((m, i) => (
                  <li key={m.slug} style={{ borderTop: "1px solid #E2E2E2" }}>
                    <Link href={`/articles/${m.slug}`} className="hov" style={{ display: "flex", gap: 14, padding: "16px 0", textDecoration: "none", color: "#111" }}>
                      <span className="ls-num" aria-hidden="true">{i + 1}</span>
                      <span style={{ display: "flex", flexDirection: "column", gap: 4 }}><span className="d hl" style={{ fontSize: 21, lineHeight: 1.12 }}>{m.title}</span><span style={{ fontSize: 13, color: "#555" }}>{m.likes} likes</span></span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ background: "#F6EFE4", borderRadius: 24, padding: 26, display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="d" style={{ fontSize: 30, lineHeight: 1 }}>Browse by topic</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {topics.map((t) => (
                  <button key={t.name} type="button" className={topic === t.name ? "fbtn on" : "fbtn"} style={{ height: 36, padding: "0 14px", fontSize: 15 }} onClick={() => { setTopic(topic === t.name ? "" : t.name); setSection("All"); reset(); }}>{t.name} <small>{t.count}</small></button>
                ))}
              </div>
            </div>
            <a href="mailto:march91magazine.nust@gmail.com" style={{ background: "#111", color: "#fff", borderRadius: 24, padding: 26, display: "flex", flexDirection: "column", gap: 14, textDecoration: "none" }}>
              <div className="d" style={{ fontSize: 32, lineHeight: 1 }}>Got a story worth reporting?</div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "#cfcfcf" }}>Pitch us, or tell us whose talent we should feature next.</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff" }}>Email the newsroom <ArrowUR /></span>
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
