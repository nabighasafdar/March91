"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { label: "Articles", href: "/admin", icon: "M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h8" },
  { label: "Write article", href: "/admin/write", icon: "M4 20h4L19 9l-4-4L4 16z" },
  { label: "Publishing options", href: "/admin/editor", icon: "M12 5v14M5 12h14" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const logout = () => {
    document.cookie = "m91_staff=; path=/; max-age=0; samesite=lax";
    router.push("/admin/login");
  };
  return (
    <div className="adm">
      <div className="adm-frame">
        <aside className="side" aria-label="Admin navigation">
          <div className="brand" style={{ padding: "4px 12px 18px" }}>
            <div className="d" style={{ fontSize: 34, lineHeight: 1, transform: "scaleY(1.15)", transformOrigin: "left", display: "inline-block" }}><span style={{ color: "#E5231B" }}>MARCH</span>91</div>
            <div style={{ fontSize: 12, color: "#666", letterSpacing: ".08em", textTransform: "uppercase", marginTop: 8 }}>Newsroom</div>
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={path === n.href ? "nv on" : "nv"} aria-current={path === n.href ? "page" : undefined}>
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d={n.icon} /></svg><span style={{ flex: 1 }}>{n.label}</span>
            </Link>
          ))}
          <div className="who" style={{ marginTop: 20, borderTop: "1px solid #EEE", paddingTop: 16 }}>
            <button type="button" className="nv" onClick={logout} style={{ width: "100%", border: 0, background: "transparent", font: "inherit", cursor: "pointer", textAlign: "left" }}>
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10" /></svg><span style={{ flex: 1 }}>Log out</span>
            </button>
          </div>
        </aside>
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
