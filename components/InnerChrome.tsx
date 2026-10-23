import Link from "next/link";
import { ACCENT, EMAIL } from "@/lib/data";
import { SiteHeader } from "./SiteHeader";
import { Ticker } from "./Sections";

/** Header + ticker used at the top of every inner (non-home) page. */
export function InnerTop() {
  return (
    <div className="shell">
      <SiteHeader />
      <Ticker />
    </div>
  );
}

export function InnerFooter() {
  const a = { color: "#555" } as const;
  return (
    <footer className="card" style={{ padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", fontSize: 15, color: "#555" }}>
      <Link href="/" className="d" style={{ fontSize: 40, lineHeight: 1, textDecoration: "none", transform: "scaleY(1.15)", display: "inline-block" }} aria-label="March91 home">
        <span style={{ color: ACCENT }}>MARCH</span><span style={{ color: "#111" }}>91</span>
      </Link>
      <span style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
        <Link href="/articles" style={a}>All stories</Link>
        <a href={`mailto:${EMAIL}`} style={a}>Contact</a>
        <Link href="/admin/login" style={a}>Staff sign-in</Link>
      </span>
      <span>© 2026 March91 Magazine</span>
    </footer>
  );
}
