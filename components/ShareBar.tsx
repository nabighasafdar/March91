"use client";

import { useEffect, useState } from "react";

const ic = { width: 20, height: 20 } as const;

/** Client-only bits of the article page: native share / copy link, and a per-browser "save for later". */
export function ShareBar({ slug, title, rail }: { slug: string; title: string; rail?: boolean }) {
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState("");
  const key = "m91-saved";

  useEffect(() => {
    try { setSaved((JSON.parse(localStorage.getItem(key) ?? "[]") as string[]).includes(slug)); } catch {}
  }, [slug]);

  const toggleSave = () => {
    try {
      const all = new Set<string>(JSON.parse(localStorage.getItem(key) ?? "[]"));
      if (all.has(slug)) all.delete(slug); else all.add(slug);
      localStorage.setItem(key, JSON.stringify([...all]));
    } catch {}
    setSaved((s) => !s);
  };
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(""), 1800); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(location.href); flash("Link copied"); } catch { flash("Copy failed"); }
  };
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title, url: location.href }); } catch {} } else copy();
  };
  const enc = (s: string) => encodeURIComponent(s);
  const url = () => (typeof location === "undefined" ? "" : location.href);

  if (rail) {
    return (
      <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 10, alignSelf: "flex-start" }} aria-label="Share this story">
        <a className="obtn" aria-label="Share on WhatsApp" href="#" onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/?text=${enc(`${title} ${url()}`)}`, "_blank", "noopener"); }}>
          <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4A8 8 0 1 1 20 12z" /></svg>
        </a>
        <a className="obtn" aria-label="Share on X" href="#" onClick={(e) => { e.preventDefault(); window.open(`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url())}`, "_blank", "noopener"); }}>
          <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </a>
        <button className="obtn" type="button" aria-label="Copy link" onClick={copy}>
          <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1" /></svg>
        </button>
        <span role="status" style={{ fontSize: 12, color: "#555", textAlign: "center" }}>{note}</span>
      </div>
    );
  }
  return (
    <>
      <button type="button" className="act" onClick={share}>
        <svg className="ic" viewBox="0 0 24 24" style={ic} aria-hidden="true"><path d="M14 5l7 7-7 7M21 12H10a7 7 0 0 0-7 7" /></svg>Share
      </button>
      <button type="button" className="act" onClick={toggleSave} aria-pressed={saved}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z" fill={saved ? "#111" : "none"} stroke="#111" strokeWidth="1.5" strokeLinejoin="round" /></svg>{saved ? "Saved" : "Save"}
      </button>
      <span role="status" style={{ fontSize: 14, color: "#555" }}>{note}</span>
    </>
  );
}
