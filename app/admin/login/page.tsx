import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { articleBySlug, refresh } from "@/lib/data";
import "../admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Staff sign-in — March91 Newsroom", robots: { index: false, follow: false } };

export default function LoginPage() {
  refresh();
  const art = articleBySlug("DdwajnTs0_U")!;
  return (
    <div className="adm-login">
      <section className="art" aria-label="March91 newsroom" style={{ backgroundImage: `url(${art.img})` }}>
        <Link href="/" className="d" style={{ color: "#fff", textDecoration: "none", fontSize: 44, lineHeight: 1, transform: "scaleY(1.15)", transformOrigin: "left", display: "inline-block" }} aria-label="Back to March91 homepage">MARCH91</Link>
        <div>
          <div style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "#E8E8E8", marginBottom: 12 }}>Newsroom</div>
          <p className="d big" style={{ margin: 0, fontSize: 60, lineHeight: 1.02, maxWidth: 560 }}>Write it, check it, <span style={{ background: "#E5231B", padding: "0 .1em" }}>publish</span> it.</p>
        </div>
      </section>
      <section className="form" aria-labelledby="h"><LoginForm /></section>
    </div>
  );
}
