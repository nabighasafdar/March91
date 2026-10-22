import { ACCENT, HIGHLIGHT, nav, stats } from "@/lib/data";
import {
  ArrowUR, Chevron, Clock, Comment, Doc, Fire, Headphones, Instagram, Menu, People, Play, PlaySm,
  Share, TikTok, Views, Up, XIcon, YouTubeSolid,
} from "./icons";

const link = { textDecoration: "none", color: "#111" } as const;
const small = { width: 12, height: 12, strokeWidth: 2.4 } as const;
const shareDot = { width: 28, height: 28, borderRadius: "50%", background: "#E6E6E6", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" } as const;

export function Hero() {
  return (
    <div className="shell">
      <header className="hdr">
        <div style={{ display: "flex", alignItems: "center", gap: 36, minWidth: 0 }}>
          <button className="live" type="button" aria-label="Play live broadcast, 5,810 listening">
            <Headphones style={{ width: 20, height: 20 }} />
            <span>5,810</span>
            <span className="pb"><Play /></span>
          </button>
          <nav className="nav" aria-label="Sections">
            {nav.map((n) => (
              <div className="ni" key={n.label}>
                <a href="#">{n.label}<Chevron style={{ width: 13, height: 13, color: "#555" }} /></a>
                <div className="mega">
                  <div>
                    <div className="kick" style={{ marginBottom: 8 }}>{n.label}</div>
                    <ul>{n.subs.map((s) => <li key={s}><a href="#">{s}</a></li>)}</ul>
                  </div>
                  <a href="#" className="hov" style={{ ...link, display: "flex", flexDirection: "column", gap: 12 }}>
                    <div className={`ph ${n.tone}`} style={{ aspectRatio: "16/10" }} role="img" aria-label="Featured story photo"><i /></div>
                    <div className="kick">Featured</div>
                    <div className="d hl" style={{ fontSize: 26, lineHeight: 1.08 }}>{n.feat}</div>
                  </a>
                </div>
              </div>
            ))}
          </nav>
        </div>
        <a href="#" className="d" style={{ fontSize: 58, lineHeight: 1, textDecoration: "none", letterSpacing: "-0.01em", transform: "scaleY(1.18)", display: "inline-block" }} aria-label="March91 home">
          <span style={{ color: "#5f5f5f" }}>MARCH</span><span style={{ color: "#111" }}>91</span>
        </a>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 22 }}>
          <a href="#" className="pill sub" style={{ height: 50, padding: "0 24px", fontSize: 17 }}>Subscribe for [PRICE] <ArrowUR /></a>
          <button className="obtn" type="button" aria-label="Open menu" style={{ border: 0 }}><Menu style={{ width: 28, height: 28, strokeWidth: 1.6 }} /></button>
        </div>
      </header>

      <section className="bento" aria-label="Top stories">
        {/* Lead story */}
        <a href="#" className="gc lead hov" style={{ ...link, minHeight: 880, padding: "40px 40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="ph t4" style={{ position: "absolute", left: 0, right: 0, top: 0, height: "72%", borderRadius: 0, background: "transparent" }} aria-hidden="true">
            <i style={{ filter: "saturate(1.1)", backgroundPosition: "50% 35%" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(241,241,241,.85) 0%, rgba(241,241,241,0) 16%, rgba(244,244,244,0) 42%, rgba(245,245,245,.9) 62%, #F6F6F6 72%)" }} aria-hidden="true" />
          <div className="meta" style={{ position: "relative", color: "#111", fontSize: 17, gap: 22 }}><span>Hira Qadeer</span><span style={{ color: "#555" }}>October 22, 2026</span></div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 26 }}>
            <h1 className="d hl" style={{ margin: 0, fontSize: 70, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
              When the City Learned to <span style={{ background: ACCENT, color: "#fff", padding: "0 .1em", display: "inline-block", lineHeight: 0.98 }}>Listen</span> Again After Midnight
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 17, lineHeight: 1.55, color: "#333", maxWidth: 640 }}>
              <p style={{ margin: 0 }}>For a decade the late-night radio shows went quiet one by one. This winter a handful of young hosts brought them back — not on FM, but on phones propped against chai-stall kettles.</p>
              <p style={{ margin: 0 }}>We spent six nights with the people who stay up to talk, and the much larger crowd who stay up to listen.</p>
            </div>
            <div className="meta" style={{ color: "#333" }}>
              <span><Comment />38</span>
              <span><Clock />7 min read</span>
            </div>
          </div>
        </a>

        {/* Column 2 */}
        <div className="col">
          <a href="#" className="gc hov" style={{ ...link, padding: "30px 30px 28px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
            <div className="meta" style={{ color: "#111", fontSize: 16 }}><span>Zain Malik</span><span style={{ color: "#555" }}>October 20, 2026</span></div>
            <div className="ph t2" style={{ height: 170, width: "74%", alignSelf: "center", borderRadius: 18 }} role="img" aria-label="Photo: cup of chai on a wooden table"><i /></div>
            <h2 className="d hl" style={{ margin: "6px 0 0", fontSize: 40, lineHeight: 1.04 }}>The Slow Ritual of the Morning Chai</h2>
            <div className="meta">
              <span><Comment />17</span>
              <span><Clock />3 min read</span>
            </div>
          </a>

          <a href="#" className="gc" style={{ ...link, background: "#F6EFE4", padding: "24px 30px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="d" style={{ fontSize: 32, lineHeight: 1 }}>March91 Voices</div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.45, color: "#333" }}>Get March91&apos;s opinion columnists, editorials, op-eds and letters in one place.</p>
            <div className="meta" style={{ color: "#111" }}>
              <span><Doc />2,830 articles</span>
              <span><People />175 authors</span>
            </div>
          </a>

          <div className="soc" aria-label="Follow March91">
            <a href="#" style={{ background: "#FBEFF4", color: "#C13584" }} aria-label="Instagram"><Instagram style={{ width: 30, height: 30, strokeWidth: 1.8 }} /></a>
            <a href="#" style={{ background: "#FCEDED", color: "#E00000" }} aria-label="YouTube"><YouTubeSolid /></a>
            <a href="#" style={{ background: "#EDF5F6", color: "#111" }} aria-label="TikTok"><TikTok style={{ width: 30, height: 30, strokeWidth: 1.9 }} /></a>
            <a href="#" style={{ background: "#F2F2F2", color: "#111" }} aria-label="X"><XIcon style={{ width: 28, height: 28, strokeWidth: 2 }} /></a>
          </div>

          <a href="#" className="gc hov" style={{ ...link, height: 236, display: "block" }}>
            <div className="meta" style={{ position: "relative", zIndex: 2, color: "#333", padding: "24px 30px 0" }}>
              <span><PlaySm />32:13</span>
              <span><Views />98,076</span>
            </div>
            <div className="ph t3" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, borderRadius: 0, clipPath: "ellipse(85% 100% at 62% 100%)" }} role="img" aria-label="Video thumbnail: broadcast tower at night">
              <i style={{ backgroundPosition: "50% 30%" }} />
              <span className="shade" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.75))" }} />
              <span style={{ position: "absolute", left: 30, right: 30, bottom: 22, zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, color: "#fff" }}>
                <span className="hl" style={{ fontSize: 18, lineHeight: 1.3, maxWidth: 240 }}>Who Gets to Tell the City&apos;s Story?</span>
                <span style={{ display: "inline-flex", gap: 6, alignItems: "center", fontSize: 15 }}><Comment />38</span>
              </span>
            </div>
          </a>
        </div>

        {/* Column 3 */}
        <div className="col">
          <a href="#" className="gc hov" style={{ ...link, padding: "30px 30px 28px", display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="av" style={{ width: 40, height: 40, fontSize: 14 }} aria-hidden="true">AR</span>
              <span style={{ fontSize: 17, flex: 1 }}>Amna Rauf</span>
              <Fire color={ACCENT} />
              <span className="obtn" aria-hidden="true"><ArrowUR style={{ width: 16, height: 16 }} /></span>
            </div>
            <h2 className="d hl" style={{ margin: 0, fontSize: 40, lineHeight: 1.08 }}>
              First-Time Voters <span style={{ background: HIGHLIGHT, padding: "0 .08em" }}>Rewrite the</span> Rules of the Campaign Trail
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 16, lineHeight: 1.55, color: "#333" }}>
              <p style={{ margin: 0 }}>Rallies are out; group chats and street-corner podcasts are in. Campaign offices are scrambling to keep up.</p>
              <p style={{ margin: 0 }}>Twenty-somethings from four cities told us what actually changes their minds — and it isn&apos;t the posters…</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <div className="meta">
                <span><Comment />32</span>
                <span><Clock />5 min read</span>
              </div>
              <div style={{ display: "flex", gap: 6 }} aria-hidden="true">
                <span style={shareDot}><XIcon style={small} /></span>
                <span style={shareDot}><Instagram style={{ ...small, width: 13, height: 13 }} /></span>
                <span style={shareDot}><Share style={{ ...small, width: 13, height: 13 }} /></span>
              </div>
            </div>
          </a>

          <div className="stats" aria-label="Trending topics this week">
            {stats.map((s) => (
              <div className="gc stat" style={{ background: s.bg }} key={s.tag}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <svg viewBox="0 0 80 24" width="76" height="22" aria-hidden="true"><path d={s.spark} fill="none" stroke="#333" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  <span className="badge" style={{ background: s.badge }} role="img" aria-label={s.dir}>
                    <Up style={{ width: 14, height: 14, strokeWidth: 2.2, transform: s.rot }} />
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: "auto" }}>
                  <span className="d" style={{ fontSize: 42, lineHeight: 1 }}>{s.pct}</span>
                  <span style={{ fontSize: 15, color: "#555" }}>{s.sub}</span>
                </div>
                <div style={{ fontSize: 17 }}>{s.tag}<span style={{ color: "#6b6b6b" }}>/week</span></div>
              </div>
            ))}
          </div>

          <a href="#" style={{ ...link, padding: "18px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 84 }}>
            <div>
              <div className="d" style={{ fontSize: 30, lineHeight: 1.05 }}>Get Print Edition</div>
              <div style={{ fontSize: 16, color: "#444", marginTop: 2 }}>For an authentic tactile experience</div>
            </div>
            <span className="rbtn" aria-hidden="true"><ArrowUR /></span>
          </a>
        </div>
      </section>
    </div>
  );
}
