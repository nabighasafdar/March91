"use client";

import Link from "next/link";
import { useState } from "react";

type Row = { slug: string; title: string; kick: string; section: string; img: string; type: string; date: string; iso: string; likes: number; comments: number; author: string; status: string };
type Props = { rows: Row[]; topics: string[]; totals: { published: number; drafts: number; likes: number; comments: number; followers: number } };

const fmt = (n: number) => n.toLocaleString("en-US");

export function AdminArticles({ rows, topics, totals }: Props) {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All categories");
  const all = rows.map((r) => ({ ...r, id: r.slug }));

  const tabs = ["All", "Published", "Drafts", "In review"];
  const match = (r: { status: string }, t: string) => t === "All" || r.status === (t === "Drafts" ? "Draft" : t);
  const needle = q.trim().toLowerCase();
  const shown = all.filter((r) => match(r, tab)).filter((r) => cat === "All categories" || r.kick === cat).filter((r) => !needle || r.title.toLowerCase().includes(needle));

  return (
    <>
      <div className="panel" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 className="d" style={{ margin: 0, fontSize: 46, lineHeight: 1 }}>Articles</h1>
          <p style={{ margin: "6px 0 0", color: "#555" }}>Write, edit and review every March91 story.</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", flex: "0 1 520px", justifyContent: "flex-end" }}>
          <div style={{ position: "relative", flex: "1 1 240px" }}>
            <label className="sr" htmlFor="q">Search articles</label>
            <svg className="ic" viewBox="0 0 24 24" style={{ position: "absolute", left: 14, top: 13, color: "#777" }} aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            <input id="q" className="inp" type="search" placeholder="Search by headline" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Link href="/admin/write" className="btn p"><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>New article</Link>
        </div>
      </div>

      <div className="stats">
        <div className="st"><span style={{ color: "#555" }}>Published stories</span><span className="d" style={{ fontSize: 40, lineHeight: 1 }}>{totals.published}</span><span style={{ fontSize: 12, color: "#666" }}>From @march91magazine</span></div>
        <div className="st"><span style={{ color: "#555" }}>Drafts</span><span className="d" style={{ fontSize: 40, lineHeight: 1 }}>{totals.drafts}</span><span style={{ fontSize: 12, color: "#666" }}>Drafts and in review</span></div>
        <div className="st"><span style={{ color: "#555" }}>Total likes</span><span className="d" style={{ fontSize: 40, lineHeight: 1 }}>{fmt(totals.likes)}</span><span style={{ fontSize: 12, color: "#666" }}>{fmt(totals.comments)} comments</span></div>
        <div className="st"><span style={{ color: "#555" }}>Followers</span><span className="d" style={{ fontSize: 40, lineHeight: 1 }}>{fmt(totals.followers)}</span><span style={{ fontSize: 12, color: "#666" }}>Instagram</span></div>
      </div>

      <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div className="tabs" role="tablist" aria-label="Filter by status">
            {tabs.map((t) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? "tab on" : "tab"} onClick={() => setTab(t)}>{t} <span>{all.filter((r) => match(r, t)).length}</span></button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#555" }}>
            <label htmlFor="cat">Category</label>
            <select id="cat" value={cat} onChange={(e) => setCat(e.target.value)} style={{ height: 40, borderRadius: 999, border: "1px solid #E2E2E2", padding: "0 14px", font: "inherit", background: "#fff" }}>
              <option>All categories</option>
              {topics.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Article</th><th>Category</th><th>Status</th><th>Date</th><th style={{ textAlign: "right" }}>Likes</th><th style={{ textAlign: "right" }}>Comments</th><th><span className="sr">Actions</span></th></tr></thead>
            <tbody>
              {shown.map((r) => {
                const edit = `/admin/editor?slug=${r.slug}`;
                return (
                  <tr key={r.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span className="th" role="img" aria-label="Cover image" style={r.img ? { backgroundImage: `url(${r.img})` } : undefined} />
                        <div style={{ minWidth: 0 }}>
                          <Link href={edit} style={{ fontWeight: 500, textDecoration: "none", display: "block", lineHeight: 1.35 }}>{r.title}</Link>
                          <div style={{ display: "flex", gap: 6, marginTop: 6 }}><span className="slot">{r.type}</span></div>
                        </div>
                      </div>
                    </td>
                    <td>{r.kick}</td>
                    <td><span className={`chip ${r.status === "Published" ? "c-pub" : r.status === "In review" ? "c-rev" : "c-draft"}`}><span className="dot" />{r.status}</span></td>
                    <td style={{ color: "#555", whiteSpace: "nowrap" }}>{r.date}</td>
                    <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.status === "Published" ? fmt(r.likes) : "—"}</td>
                    <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.status === "Published" ? fmt(r.comments) : "—"}</td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      {r.status === "Published" && <Link href={`/articles/${r.slug}`} className="ib" aria-label={`View ${r.title}`}><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg></Link>}
                      <Link href={edit} className="ib" aria-label={`Edit ${r.title}`}><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z" /></svg></Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {shown.length === 0 && <p style={{ textAlign: "center", color: "#666", padding: "40px 0" }}>No articles match. Try another filter or search.</p>}
        </div>
        <div style={{ color: "#555" }}>Showing {shown.length} of {all.length} articles</div>
      </div>
    </>
  );
}
