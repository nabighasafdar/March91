"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Block } from "./drafts";

const uid = () => Math.random().toString(36).slice(2, 9);
const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
const Svg = ({ d }: { d: string }) => <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>;
const IMG = "M3 4h18v16H3zM9 10a2 2 0 1 0 0-.01M21 16l-5-5-9 9";

export function AdminWrite({ categories, author: staff }: { categories: string[]; author: string }) {
  const id = useRef(uid());
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [cover, setCover] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(categories[0] ?? "News");
  const [author, setAuthor] = useState(staff);
  const [tags, setTags] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([{ id: uid(), kind: "p", text: "" }]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [status, setStatus] = useState("Unsaved");

  const body = blocks.filter((b) => b.kind !== "img").map((b) => b.text).join(" ");
  const wordCount = words(title + " " + excerpt + " " + body);
  const readTime = Math.max(1, Math.round(words(body) / 200));
  const checks = [
    { label: "Headline", ok: title.trim().length > 0 },
    { label: "Short summary", ok: excerpt.trim().length > 0 },
    { label: "Featured image", ok: !!cover },
    { label: "Article content", ok: words(body) > 0 },
  ];

  const patch = (bid: string, p: Partial<Block>) => setBlocks((l) => l.map((b) => (b.id === bid ? { ...b, ...p } : b)));
  const move = (i: number, d: number) => setBlocks((l) => { const n = [...l], j = i + d; if (j < 0 || j >= n.length) return l; [n[i], n[j]] = [n[j], n[i]]; return n; });
  const add = (kind: Block["kind"]) => setBlocks((l) => [...l, { id: uid(), kind, text: "" }]);
  const read = (f: File | undefined, done: (src: string) => void) => { if (!f) return; const r = new FileReader(); r.onload = () => done(String(r.result)); r.readAsDataURL(f); };

  const [saving, setSaving] = useState(false);
  const [slug, setSlug] = useState("");
  const [liveSlug, setLiveSlug] = useState("");

  // Blocks become the article body: paragraphs as-is, "## " headings, "> " quotes. Inline images aren't stored yet.
  const toBody = () => blocks.filter((b) => b.kind !== "img" && b.text.trim()).map((b) => (b.kind === "h" ? `## ${b.text.trim()}` : b.kind === "q" ? `> ${b.text.trim()}` : b.text.trim()));

  const persist = async (publish: boolean) => {
    setToast(""); setError("");
    if (!title.trim()) { setError("Add a headline first."); return; }
    if (publish && words(body) === 0) { setError("Add some article content before publishing."); return; }
    setSaving(true);
    try {
      const payload = {
        slug, title: title.trim(), dek: excerpt, kick: category, author, tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        body: toBody(), status: publish ? "Published" : "Draft", caption, cover: cover.startsWith("data:") ? cover : undefined,
      };
      const res = await fetch("/api/admin/article", { method: slug ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Couldn't save.");
      setSlug(j.slug);
      setStatus(publish ? "Published" : "Draft saved");
      setLiveSlug(publish ? j.slug : "");
      setToast(publish ? "Published. It's live on the homepage and stories list." : "Draft saved. Find it under Articles › Drafts.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save.");
    } finally { setSaving(false); }
  };

  return (
    <>
      <header className="panel" style={{ padding: "14px 16px 14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 44, height: 44, borderRadius: 14, background: "#F2F2F2", display: "inline-flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true"><Svg d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4" /></span>
          <div>
            <h1 className="d" style={{ margin: 0, fontSize: 32, lineHeight: 1 }}>Add new article</h1>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>Create a March91 story · {status}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <div className="seg" role="tablist" aria-label="Mode">
            <button type="button" role="tab" aria-selected={mode === "write"} className={mode === "write" ? "on" : ""} onClick={() => setMode("write")}>Write</button>
            <button type="button" role="tab" aria-selected={mode === "preview"} className={mode === "preview" ? "on" : ""} onClick={() => setMode("preview")}>Preview</button>
          </div>
          <button type="button" className="btn g" disabled={saving} onClick={() => persist(false)}>Save draft</button>
          <button type="button" className="btn p" disabled={saving} onClick={() => persist(true)}>{saving ? "Saving…" : "Publish"} <Svg d="M7 17L17 7M8 7h9v9" /></button>
        </div>
      </header>

      {error && <div className="err" role="alert"><Svg d="M12 8v5M12 16h.01M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />{error}</div>}
      {toast && <div className="toast" role="status"><svg className="ic" viewBox="0 0 24 24" style={{ color: "#79C29D" }} aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg><span style={{ flex: 1 }}>{toast}</span>{liveSlug && <Link href={`/articles/${liveSlug}`}>View article</Link>}<Link href="/admin">All articles</Link></div>}

      <div className="lay">
        {mode === "write" ? (
          <section className="paper" aria-label="Article editor">
            <label className="lbl" htmlFor="ttl">Article title</label>
            <textarea id="ttl" className="ta ttl" rows={title.length > 45 ? 3 : 2} placeholder="Enter article headline…" value={title} maxLength={90} onChange={(e) => setTitle(e.target.value)} />
            <div style={{ fontSize: 12, color: "#777", margin: "6px 0 28px" }}>{title.length} / 90 characters</div>

            <label className="lbl" htmlFor="exc">Short summary</label>
            <textarea id="exc" className="ta" rows={2} style={{ fontFamily: "var(--font-body), Georgia, serif", fontSize: 21, lineHeight: 1.5, color: "#444" }} placeholder="One or two sentences that appear under the headline…" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />

            <div style={{ margin: "28px 0 32px" }}>
              <span className="lbl">Featured image</span>
              {!cover ? (
                <label className="drop">
                  <input type="file" accept="image/*" aria-label="Upload featured image" onChange={(e) => read(e.target.files?.[0], setCover)} />
                  <svg className="ic" viewBox="0 0 24 24" style={{ width: 32, height: 32, strokeWidth: 1.4 }} aria-hidden="true"><path d={IMG} /></svg>
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#111" }}>Upload image</span>
                  <span style={{ fontSize: 13 }}>Click to choose a file · JPG or PNG</span>
                </label>
              ) : (
                <>
                  <div style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cover} alt="Featured image preview" style={{ display: "block", width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
                    <div style={{ position: "absolute", right: 12, top: 12, display: "flex", gap: 8 }}>
                      <label className="btn" style={{ position: "relative", border: 0, overflow: "hidden" }}>Replace<input type="file" accept="image/*" aria-label="Replace featured image" style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} onChange={(e) => read(e.target.files?.[0], setCover)} /></label>
                      <button type="button" className="btn" style={{ border: 0 }} onClick={() => { setCover(""); setCaption(""); }}>Remove</button>
                    </div>
                  </div>
                  <label className="sr" htmlFor="capt">Image caption</label>
                  <input id="capt" className="fld" type="text" style={{ marginTop: 10 }} placeholder="Caption and photo credit" value={caption} onChange={(e) => setCaption(e.target.value)} />
                </>
              )}
            </div>

            <span className="lbl">Article content</span>
            <div>
              {blocks.map((b, i) => (
                <div className="blk" key={b.id}>
                  <div style={{ minWidth: 0 }}>
                    <div className="btag">{{ p: "Paragraph", h: "Heading", q: "Quote", img: "Image" }[b.kind]}</div>
                    {b.kind === "p" && <textarea className="ta" rows={Math.max(3, Math.ceil(b.text.length / 70))} aria-label={`Paragraph ${i + 1}`} style={{ fontFamily: "var(--font-body), Georgia, serif", fontSize: 20, lineHeight: 1.7 }} placeholder="Write the full article here…" value={b.text} onChange={(e) => patch(b.id, { text: e.target.value })} />}
                    {b.kind === "h" && <textarea className="ta d" rows={1} aria-label={`Heading ${i + 1}`} style={{ fontSize: 36, lineHeight: 1.1 }} placeholder="Section heading" value={b.text} onChange={(e) => patch(b.id, { text: e.target.value })} />}
                    {b.kind === "q" && <div style={{ display: "flex", gap: 12 }}><span className="d" style={{ fontSize: 64, lineHeight: 0.8, color: "#E5231B" }} aria-hidden="true">“</span><textarea className="ta d" rows={2} aria-label={`Quote ${i + 1}`} style={{ fontSize: 32, lineHeight: 1.2 }} placeholder="A line worth pulling out…" value={b.text} onChange={(e) => patch(b.id, { text: e.target.value })} /></div>}
                    {b.kind === "img" && (
                      <>
                        {!b.src ? (
                          <label className="drop" style={{ minHeight: 160 }}><input type="file" accept="image/*" aria-label="Upload image for this block" onChange={(e) => read(e.target.files?.[0], (src) => patch(b.id, { src }))} /><svg className="ic" viewBox="0 0 24 24" style={{ width: 26, height: 26 }} aria-hidden="true"><path d={IMG} /></svg><span style={{ fontWeight: 500, color: "#111" }}>Upload image</span></label>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={b.src} alt="Image in article" style={{ display: "block", width: "100%", borderRadius: 16, aspectRatio: "3/2", objectFit: "cover" }} />
                        )}
                        <input className="fld" type="text" aria-label="Image caption" placeholder="Caption" style={{ marginTop: 8 }} value={b.text} onChange={(e) => patch(b.id, { text: e.target.value })} />
                      </>
                    )}
                  </div>
                  <div className="tools">
                    <button type="button" className="ib8" aria-label="Move up" onClick={() => move(i, -1)}><Svg d="M12 19V5M6 11l6-6 6 6" /></button>
                    <button type="button" className="ib8" aria-label="Move down" onClick={() => move(i, 1)}><Svg d="M12 5v14M6 13l6 6 6-6" /></button>
                    <button type="button" className="ib8" aria-label="Delete block" onClick={() => setBlocks((l) => (l.length > 1 ? l.filter((x) => x.id !== b.id) : l))}><Svg d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="add" aria-label="Add a block">
              <span style={{ color: "#666", marginRight: 4 }}>Add</span>
              <button type="button" className="addb" onClick={() => add("p")}><Svg d="M4 6h16M4 12h16M4 18h10" />Paragraph</button>
              <button type="button" className="addb" onClick={() => add("h")}><b>H</b>Heading</button>
              <button type="button" className="addb" onClick={() => add("q")}><span className="d" style={{ fontSize: 22, lineHeight: 1 }}>“</span>Quote</button>
              <button type="button" className="addb" onClick={() => add("img")}><Svg d={IMG} />Image</button>
            </div>
          </section>
        ) : (
          <article className="paper prose" aria-label="Preview">
            <div style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "#555", marginBottom: 14 }}>{category} · Preview</div>
            <h1 className="d" style={{ margin: "0 0 18px", fontSize: 60, lineHeight: 1.03 }}>{title || "Untitled article"}</h1>
            <p style={{ color: "#444", fontSize: 21 }}>{excerpt || "No summary yet."}</p>
            <div style={{ display: "flex", gap: 18, fontSize: 15, color: "#555", margin: "0 0 28px", flexWrap: "wrap" }}><span style={{ color: "#111" }}>{author}</span><span>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span><span>{readTime} min read</span></div>
            {cover && <figure style={{ margin: "0 0 32px" }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={cover} alt="Featured" style={{ display: "block", width: "100%", borderRadius: 20, aspectRatio: "16/9", objectFit: "cover" }} /><figcaption style={{ fontSize: 14, color: "#555", marginTop: 8 }}>{caption}</figcaption></figure>}
            {blocks.map((b) => b.kind === "p" ? <p key={b.id}>{b.text}</p>
              : b.kind === "h" ? <h2 key={b.id}>{b.text}</h2>
              : b.kind === "q" ? <blockquote key={b.id} className="d" style={{ margin: "36px 0", fontSize: 36, lineHeight: 1.15 }}>“{b.text}”</blockquote>
              : b.src ? <figure key={b.id} style={{ margin: "32px 0" }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={b.src} alt={b.text} style={{ display: "block", width: "100%", borderRadius: 16 }} /><figcaption style={{ fontSize: 14, color: "#555", marginTop: 8 }}>{b.text}</figcaption></figure> : null)}
            {words(body) === 0 && <p style={{ color: "#888" }}>Nothing written yet. Switch to Write to start the story.</p>}
          </article>
        )}

        <aside className="set" aria-label="Article settings">
          <section className="panel" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="d" style={{ fontSize: 26, lineHeight: 1 }}>Details</div>
            <div><label className="lbl" htmlFor="cat">Category</label><select id="cat" className="fld" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="lbl" htmlFor="au">Author</label><select id="au" className="fld" value={author} onChange={(e) => setAuthor(e.target.value)}><option>{staff}</option><option>Guest contributor</option></select></div>
            <div><label className="lbl" htmlFor="tg">Tags</label><input id="tg" className="fld" type="text" placeholder="e.g. campus, spotlight" value={tags} onChange={(e) => setTags(e.target.value)} /><div className="hint">Separate with commas</div></div>
          </section>
          <section className="panel" style={{ paddingTop: 18, paddingBottom: 18 }}>
            <div className="d" style={{ fontSize: 26, lineHeight: 1, marginBottom: 8 }}>Checklist</div>
            {checks.map((c) => <div className="stat" key={c.label}><span>{c.label}</span><span style={{ color: c.ok ? "#1E6B45" : "#9B1C14", fontWeight: 500 }}>{c.ok ? "Done" : "Missing"}</span></div>)}
            <div className="stat"><span>Words</span><span style={{ fontVariantNumeric: "tabular-nums" }}>{wordCount}</span></div>
            <div className="stat"><span>Read time</span><span>{readTime} min</span></div>
            <Link href={slug ? `/admin/editor?slug=${slug}` : "/admin/editor"} className="btn g" style={{ width: "100%", boxSizing: "border-box", marginTop: 12 }}>Homepage &amp; SEO options <Svg d="M7 17L17 7M8 7h9v9" /></Link>
          </section>
        </aside>
      </div>
    </>
  );
}
