"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Article = { slug: string; title: string; hl: string; hlStyle: string; dek: string; body: string; img: string; kick: string; tags: string[]; fullDate: string; author: string; comments: number; url: string; status: string; seo: string; caption: string; credit: string; place: string; ticker: boolean; custom: boolean };

const Svg = ({ d, style }: { d: string; style?: React.CSSProperties }) => <svg className="ic" viewBox="0 0 24 24" style={style} aria-hidden="true"><path d={d} /></svg>;
const STYLES = [{ id: "hl-red", label: "Red" }, { id: "hl-beige", label: "Beige" }, { id: "hl-none", label: "None" }];
const PLACEMENTS = [
  { id: "Lead story", sub: "Large top slot" },
  { id: "Secondary", sub: "Second column" },
  { id: "Latest", sub: "Latest stories row" },
  { id: "Not on homepage", sub: "Archive only" },
];
const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

export function AdminEditor({ article: a, categories, staff }: { article: Article; categories: string[]; staff: string }) {
  const [title, setTitle] = useState(a.title);
  const [hl, setHl] = useState(a.hl);
  const [hlStyle, setHlStyle] = useState(a.hl ? a.hlStyle : "hl-none");
  const [dek, setDek] = useState(a.dek);
  const [body, setBody] = useState(a.body);
  const [caption, setCaption] = useState(a.caption);
  const [credit, setCredit] = useState(a.credit);
  const slug = a.slug;
  const [seo, setSeo] = useState(a.seo);
  const [status, setStatus] = useState(a.status);
  const [cat, setCat] = useState(a.kick);
  const [tags, setTags] = useState(a.tags);
  const [tagIn, setTagIn] = useState("");
  const [place, setPlace] = useState(a.place);
  const [ticker, setTicker] = useState(a.ticker);
  const router = useRouter();
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const wc = words(body);
  const readTime = Math.max(1, Math.round(wc / 200));
  const parts = hl && title.includes(hl) ? title.split(hl) : null;

  const save = async (nextStatus: string) => {
    setBusy(true); setError(""); setSaved("");
    try {
      const res = await fetch("/api/admin/article", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug, title, hl, hlStyle: hlStyle === "hl-none" ? "hl-none" : hlStyle, dek, body: body.split(/\n\s*\n/), kick: cat, tags, status: nextStatus,
          seo, caption, credit, ticker, place,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Couldn't save.");
      setStatus(nextStatus);
      setSaved(nextStatus === "Published" ? "Saved and live on the site" : `Saved as ${nextStatus.toLowerCase()}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save.");
    } finally { setBusy(false); }
  };

  return (
    <>
      <header className="panel" style={{ padding: "14px 18px 14px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <Link href="/admin" className="btn" style={{ borderColor: "#E2E2E2" }} aria-label="Back to articles"><Svg d="M20 12H4M10 6l-6 6 6 6" />Articles</Link>
          <div>
            <div className="d" style={{ fontSize: 30, lineHeight: 1 }}>Publishing options</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{busy ? "Saving…" : saved || "Edit and save to update the site"}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span className={`chip ${status === "Published" ? "c-pub" : "c-draft"}`}><span className="dot" />{status}</span>
          {status === "Published" && <Link href={`/articles/${a.slug}`} className="btn" style={{ borderColor: "#DCDCDC" }}><Svg d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />View article</Link>}
          <button type="button" className="btn" disabled={busy} onClick={() => save("Draft")}>Save as draft</button>
          <button type="button" className="btn p" disabled={busy} onClick={() => save(status === "Draft" ? "Published" : status)}>{status === "Draft" ? "Publish" : "Save changes"} <Svg d="M7 17L17 7M8 7h9v9" /></button>
        </div>
      </header>

      {error && <div className="err" role="alert"><Svg d="M12 8v5M12 16h.01M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />{error}</div>}
      {saved && <div className="toast" role="status"><svg className="ic" viewBox="0 0 24 24" style={{ color: "#79C29D" }} aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg><span style={{ flex: 1 }}>{saved}. The homepage, stories list and article page are updated.</span>{status === "Published" && <Link href={`/articles/${a.slug}`}>View article</Link>}</div>}

      <div className="grid">
        <div className="colm">
          <section className="panel" style={{ display: "flex", flexDirection: "column", gap: 22 }} aria-label="Story">
            <div>
              <label className="lbl" htmlFor="title">Headline</label>
              <textarea id="title" className="d" rows={2} style={{ width: "100%", boxSizing: "border-box", border: 0, borderBottom: "1px solid #E2E2E2", resize: "none", fontSize: 52, lineHeight: 1.05, padding: "0 0 12px", background: "transparent", color: "#111", outline: "none" }} value={title} onChange={(e) => setTitle(e.target.value)} />
              <div className="hint">{title.length} characters · aim for under 80</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <div>
                <label className="lbl" htmlFor="hlw">Highlight word or phrase</label>
                <input id="hlw" className="fld" type="text" value={hl} onChange={(e) => setHl(e.target.value)} placeholder="e.g. Banana Bread" />
                <div className="hint">{hl && !title.includes(hl) ? "Not found in the headline" : "Must appear in the headline exactly"}</div>
              </div>
              <div>
                <span className="lbl" id="hls-l">Highlight style</span>
                <div role="radiogroup" aria-labelledby="hls-l" style={{ display: "flex", gap: 8 }}>
                  {STYLES.map((s) => (
                    <button key={s.id} type="button" role="radio" aria-checked={hlStyle === s.id} className={hlStyle === s.id ? "opt on" : "opt"} style={{ flex: 1, alignItems: "center" }} onClick={() => setHlStyle(s.id)}>
                      <span className={s.id} style={{ fontFamily: "var(--font-display), serif", fontSize: 20 }}>Aa</span><small>{s.label}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="lbl" htmlFor="dek">Standfirst / excerpt</label>
              <textarea id="dek" className="fld" rows={3} style={{ fontFamily: "var(--font-body), Georgia, serif", fontSize: 18, lineHeight: 1.5, resize: "vertical" }} value={dek} maxLength={220} onChange={(e) => setDek(e.target.value)} />
              <div className="hint">Shown under the headline and in shares · {dek.length}/220</div>
            </div>
            <div>
              <span className="lbl">Cover image</span>
              <div className="cover" role="img" aria-label="Current cover image" style={{ backgroundImage: `url(${a.img})` }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 12 }}>
                <div><label className="lbl" htmlFor="cap">Caption</label><input id="cap" className="fld" type="text" value={caption} onChange={(e) => setCaption(e.target.value)} /></div>
                <div><label className="lbl" htmlFor="cred">Photo credit</label><input id="cred" className="fld" type="text" value={credit} onChange={(e) => setCredit(e.target.value)} /></div>
              </div>
            </div>
            <div>
              <label className="lbl" htmlFor="body">Body</label>
              <textarea id="body" rows={14} className="fld" style={{ fontFamily: "var(--font-body), Georgia, serif", fontSize: 19, lineHeight: 1.65, color: "#222", resize: "vertical", background: "#fff", padding: "20px 22px" }} value={body} onChange={(e) => setBody(e.target.value)} />
              <div className="hint">{wc} words · about {readTime} min read (calculated automatically) · blank line = new paragraph · start a line with ## for a heading or &gt; for a quote</div>
            </div>
          </section>

          <section className="panel" style={{ display: "flex", flexDirection: "column", gap: 16 }} aria-label="Search and sharing">
            <div className="d" style={{ fontSize: 28, lineHeight: 1 }}>Search &amp; sharing</div>
            <div>
              <label className="lbl" htmlFor="slug">URL</label>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #DCDCDC", borderRadius: 14, background: "#FAFAFA", overflow: "hidden" }}>
                <span style={{ padding: "0 4px 0 14px", color: "#666", whiteSpace: "nowrap" }}>march91.com/articles/</span>
                <input id="slug" type="text" value={slug} readOnly aria-describedby="slug-h" style={{ flex: 1, minWidth: 0, height: 46, border: 0, background: "transparent", font: "inherit", outline: "none" }} />
              </div>
            </div>
            <div className="hint" id="slug-h" style={{ marginTop: -8 }}>The URL is fixed once an article exists, so existing links keep working.</div>
            <div><label className="lbl" htmlFor="seo">Meta description</label><textarea id="seo" className="fld" rows={2} style={{ resize: "vertical" }} value={seo} onChange={(e) => setSeo(e.target.value)} /></div>
            <div style={{ fontSize: 13 }}>Original post: <a href={a.url} target="_blank" rel="noreferrer">{a.url}</a></div>
          </section>
        </div>

        <div className="cols">
          <section className="panel" style={{ display: "flex", flexDirection: "column", gap: 16 }} aria-label="Publishing">
            <div className="d" style={{ fontSize: 28, lineHeight: 1 }}>Publish</div>
            <div><label className="lbl" htmlFor="st">Status</label><select id="st" className="fld" value={status} onChange={(e) => setStatus(e.target.value)}><option>Draft</option><option>In review</option><option>Published</option></select><div className="hint">Only Published articles appear on the site.</div></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label className="lbl" htmlFor="cat">Category</label><select id="cat" className="fld" value={cat} onChange={(e) => setCat(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
              <div><label className="lbl" htmlFor="au">Author</label><select id="au" className="fld" defaultValue={a.author}><option>{staff}</option><option>Guest contributor</option></select></div>
            </div>
            <div>
              <label className="lbl" htmlFor="tag">Tags</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {tags.map((t) => <span className="chipx" key={t}>{t}<button type="button" aria-label={`Remove tag ${t}`} onClick={() => setTags((l) => l.filter((x) => x !== t))}>×</button></span>)}
              </div>
              <input id="tag" className="fld" type="text" placeholder="Add a tag and press Enter" value={tagIn} onChange={(e) => setTagIn(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); const t = tagIn.trim(); if (t && !tags.includes(t)) setTags([...tags, t]); setTagIn(""); } }} />
            </div>
          </section>

          <section className="panel" style={{ display: "flex", flexDirection: "column", gap: 14 }} aria-label="Homepage placement">
            <div className="d" style={{ fontSize: 28, lineHeight: 1 }}>Homepage placement</div>
            <div role="radiogroup" aria-label="Placement" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {PLACEMENTS.map((p) => (
                <button key={p.id} type="button" role="radio" aria-checked={place === p.id} className={place === p.id ? "opt on" : "opt"} onClick={() => setPlace(p.id)}><span style={{ fontWeight: 500 }}>{p.id}</span><small>{p.sub}</small></button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderTop: "1px solid #EEE", paddingTop: 14 }}>
              <div><div style={{ fontWeight: 500 }}>Add to headline ticker</div><div className="hint" style={{ marginTop: 2 }}>Shows in the black “Start the day here” strip</div></div>
              <label className="sw"><input type="checkbox" checked={ticker} onChange={(e) => setTicker(e.target.checked)} aria-label="Add to headline ticker" /><span /></label>
            </div>
          </section>

          <section className="panel" style={{ display: "flex", flexDirection: "column", gap: 14 }} aria-label="Live preview">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div className="d" style={{ fontSize: 28, lineHeight: 1 }}>Live preview</div><span style={{ fontSize: 12, color: "#666" }}>{place}</span></div>
            <div className="pv">
              <div style={{ display: "flex", gap: 14, fontSize: 14 }}><span>{a.author}</span><span style={{ color: "#555" }}>{a.fullDate}</span></div>
              <div style={{ aspectRatio: "16/9", borderRadius: 14, background: `url(${a.img}) center/cover` }} role="img" aria-label="Cover image preview" />
              <div style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "#555", fontFamily: "var(--font-ui), sans-serif" }}>{cat}</div>
              <div className="d" style={{ fontSize: 32, lineHeight: 1.05 }}>{parts ? <>{parts[0]}<span className={hlStyle}>{hl}</span>{parts[1]}</> : title}</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#333" }}>{dek}</p>
              <div style={{ display: "flex", gap: 16, fontSize: 14, color: "#555" }}><span>{a.comments} comments</span><span>{readTime} min read</span></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
