import Link from "next/link";
import { ACCENT, INSTAGRAM_URL, articleHref, bg, nav, profile } from "@/lib/data";
import { ArrowUR, Chevron, Instagram, Menu } from "./icons";

const link = { textDecoration: "none", color: "#111" } as const;
const ext = { target: "_blank", rel: "noreferrer" } as const;

export function SiteHeader() {
  return (
    <header className="hdr">
    <div style={{ display: "flex", alignItems: "center", gap: 36, minWidth: 0 }}>
      <a className="live" href={INSTAGRAM_URL} {...ext} aria-label={`Follow on Instagram, ${profile.followers} followers`} style={{ textDecoration: "none" }}>
        <Instagram style={{ width: 20, height: 20 }} />
        <span>{profile.followers}</span>
        <span className="pb"><ArrowUR /></span>
      </a>
      <nav className="nav" aria-label="Sections">
        {nav.map((n) => (
          <div className="ni" key={n.label}>
            <Link href={`/articles?section=${n.label}`}>{n.label}<Chevron style={{ width: 13, height: 13, color: "#555" }} /></Link>
            <div className="mega">
              <div>
                <div className="kick" style={{ marginBottom: 8 }}>{n.label}</div>
                <ul>{n.subs.map((s) => <li key={s.label}><Link href={`/articles?topic=${encodeURIComponent(s.topic)}`}>{s.label}</Link></li>)}</ul>
              </div>
              <Link href={articleHref(n.story)} className="hov" style={{ ...link, display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="ph" style={{ aspectRatio: "16/10" }} role="img" aria-label={n.story.title}><i style={bg(n.story.img)} /></div>
                <div className="kick">Featured</div>
                <div className="d hl" style={{ fontSize: 26, lineHeight: 1.08 }}>{n.story.title}</div>
              </Link>
            </div>
          </div>
        ))}
      </nav>
    </div>
    <Link href="/" className="d" style={{ fontSize: 58, lineHeight: 1, textDecoration: "none", letterSpacing: "-0.01em", transform: "scaleY(1.18)", display: "inline-block" }} aria-label="March91 home">
      <span style={{ color: ACCENT }}>MARCH</span><span style={{ color: "#111" }}>91</span>
    </Link>
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 22 }}>
      <div>
        <Link href="/admin/login" className="pill" style={{ height: 46 }}>Newsroom <ArrowUR /></Link>
              </div>
      <button className="obtn" type="button" aria-label="Open menu" style={{ border: 0 }}><Menu style={{ width: 28, height: 28, strokeWidth: 1.6 }} /></button>
    </div>
  </header>
  );
}
