"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(true);

  // Placeholder gate: there is no auth backend yet, so any non-empty credentials continue to the newsroom.
  const submit = (e: React.FormEvent) => { e.preventDefault(); document.cookie = `m91_staff=1; path=/; max-age=${remember ? 60 * 60 * 24 * 30 : 60 * 60 * 12}; samesite=lax`; router.push("/admin"); };

  return (
    <form onSubmit={submit} style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: "#555", background: "#F2F2F2", borderRadius: 999, padding: "6px 12px" }}>
          <svg className="ic" viewBox="0 0 24 24" style={{ width: 14, height: 14 }} aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>Staff only
        </span>
        <h1 id="h" className="d" style={{ margin: "16px 0 6px", fontSize: 48, lineHeight: 1 }}>Sign in to the newsroom</h1>
        <p style={{ margin: 0, color: "#555", lineHeight: 1.5 }}>For March91 editors and writers. Readers don’t need an account.</p>
      </div>
      <div>
        <label className="lbl" htmlFor="em">Email</label>
        <input id="em" className="fld" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@march91.com" />
      </div>
      <div>
        <label className="lbl" htmlFor="pw">Password</label>
        <div style={{ position: "relative" }}>
          <input id="pw" className="fld" type={show ? "text" : "password"} autoComplete="current-password" required value={pw} onChange={(e) => setPw(e.target.value)} style={{ paddingRight: 84 }} />
          <button type="button" onClick={() => setShow((s) => !s)} style={{ position: "absolute", right: 6, top: 6, height: 40, padding: "0 12px", border: 0, borderRadius: 10, background: "transparent", font: "inherit", fontSize: 13, color: "#333", cursor: "pointer" }}>{show ? "Hide" : "Show"}</button>
        </div>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 10, color: "#333", minHeight: 44, cursor: "pointer" }}>
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ width: 18, height: 18, accentColor: "#111" }} />Keep me signed in on this device
      </label>
      <button type="submit" className="btn">Sign in <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6" /></svg></button>
      <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.5 }}>Your role decides what you can do: <b style={{ fontWeight: 500, color: "#111" }}>Writers</b> draft stories, <b style={{ fontWeight: 500, color: "#111" }}>Editors</b> publish and place them on the homepage.</p>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#555", fontSize: 14, minHeight: 44 }}>
        <svg className="ic" viewBox="0 0 24 24" style={{ width: 16, height: 16 }} aria-hidden="true"><path d="M20 12H4M10 6l-6 6 6 6" /></svg>Back to march91.com
      </Link>
    </form>
  );
}
