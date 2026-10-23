import { ACCENT, EMAIL, HIGHLIGHT, INSTAGRAM_URL, articleHref, bg, heroVideo, lead, profile, second, stats, third } from "@/lib/data";
import type { Story } from "@/lib/data";
import { ArrowUR, Comment, Doc, Fire, Heart, Instagram, Mail, People, PlaySm, Share, Up, XIcon } from "./icons";
import { SiteHeader } from "./SiteHeader";

const link = { textDecoration: "none", color: "#111" } as const;
const small = { width: 12, height: 12, strokeWidth: 2.4 } as const;
const shareDot = { width: 28, height: 28, borderRadius: "50%", background: "#E6E6E6", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" } as const;
const ext = { target: "_blank", rel: "noreferrer" } as const;

/** Headline with an optional highlighted phrase. */
function Title({ s, mark }: { s: Story; mark: React.CSSProperties }) {
  if (!s.hl || !s.title.includes(s.hl)) return <>{s.title}</>;
  const [a, b] = s.title.split(s.hl);
  return <>{a}<span style={mark}>{s.hl}</span>{b}</>;
}

export function Hero() {
  return (
    <div className="shell">
      <SiteHeader />

      <section className="bento" aria-label="Top stories">
        {/* Lead story */}
        <a href={articleHref(lead)} className="gc lead hov" style={{ ...link, padding: "40px 40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="ph" style={{ position: "absolute", left: 0, right: 0, top: 0, height: "72%", borderRadius: 0, background: "transparent" }} aria-hidden="true">
            <i style={{ ...bg(lead.img), filter: "saturate(1.1)", backgroundPosition: "50% 35%" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(241,241,241,.85) 0%, rgba(241,241,241,0) 16%, rgba(244,244,244,0) 42%, rgba(245,245,245,.9) 62%, #F6F6F6 72%)" }} aria-hidden="true" />
          <div className="meta" style={{ position: "relative", color: "#111", fontSize: 17, gap: 22 }}><span>{profile.full_name}</span><span style={{ color: "#555" }}>{lead.fullDate}</span></div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 26 }}>
            <h1 className="d hl" style={{ margin: 0, fontSize: 70, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
              <Title s={lead} mark={{ background: ACCENT, color: "#fff", padding: "0 .1em", display: "inline-block", lineHeight: 0.98 }} />
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 17, lineHeight: 1.55, color: "#333", maxWidth: 640 }}>
              <p style={{ margin: 0 }}>{lead.paras[0]}</p>
              <p className="p2" style={{ margin: 0 }}>{lead.paras[1]}</p>
            </div>
            <div className="meta" style={{ color: "#333" }}>
              <span><Heart />{lead.likes}</span>
              <span><Comment />{lead.comments}</span>
            </div>
          </div>
        </a>

        {/* Column 2 */}
        <div className="col">
          <a href={articleHref(second)} className="gc hov" style={{ ...link, padding: "30px 30px 28px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
            <div className="meta" style={{ color: "#111", fontSize: 16 }}><span>{second.kick}</span><span style={{ color: "#555" }}>{second.fullDate}</span></div>
            <div className="ph c2img" style={{ height: 170, width: "74%", alignSelf: "center", borderRadius: 18 }} role="img" aria-label={second.title}><i style={bg(second.img)} /></div>
            <h2 className="d hl" style={{ margin: "6px 0 0", fontSize: 40, lineHeight: 1.04 }}>{second.title}</h2>
            <div className="meta">
              <span><Heart />{second.likes}</span>
              <span><Comment />{second.comments}</span>
            </div>
          </a>

          <a href={INSTAGRAM_URL} {...ext} className="gc voices" style={{ ...link, background: "#F6EFE4", padding: "24px 30px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="d" style={{ fontSize: 32, lineHeight: 1 }}>{profile.full_name.replace("'", "’")}</div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.45, color: "#333" }}>{profile.biography}</p>
            <div className="meta" style={{ color: "#111" }}>
              <span><Doc />{profile.posts_count} posts</span>
              <span><People />{profile.followers} followers</span>
            </div>
          </a>

          <div className="soc" aria-label="Follow March91">
            <a href={INSTAGRAM_URL} {...ext} style={{ background: "#FBEFF4", color: "#C13584" }} aria-label="Instagram"><Instagram style={{ width: 30, height: 30, strokeWidth: 1.8 }} /></a>
            <a href={`mailto:${EMAIL}`} style={{ background: "#EDF5F6", color: "#111" }} aria-label="Email March91"><Mail style={{ width: 30, height: 30, strokeWidth: 1.8 }} /></a>
          </div>

          <a href={articleHref(heroVideo)} className="gc hov vid" style={{ ...link, height: 236, display: "block" }}>
            <div className="meta" style={{ position: "relative", zIndex: 2, color: "#333", padding: "24px 30px 0" }}>
              <span><PlaySm />Reel</span>
              <span><Heart />{heroVideo.likes}</span>
            </div>
            <div className="ph" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, borderRadius: 0, clipPath: "ellipse(85% 100% at 62% 100%)" }} role="img" aria-label={heroVideo.title}>
              <i style={{ ...bg(heroVideo.img), backgroundPosition: "50% 30%" }} />
              <span className="shade" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.75))" }} />
              <span style={{ position: "absolute", left: 30, right: 30, bottom: 22, zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, color: "#fff" }}>
                <span className="hl" style={{ fontSize: 18, lineHeight: 1.3, maxWidth: 240 }}>{heroVideo.title}</span>
                <span style={{ display: "inline-flex", gap: 6, alignItems: "center", fontSize: 15 }}><Comment />{heroVideo.comments}</span>
              </span>
            </div>
          </a>
        </div>

        {/* Column 3 */}
        <div className="col">
          <a href={articleHref(third)} className="gc hov" style={{ ...link, padding: "30px 30px 28px", display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="av" style={{ width: 40, height: 40, fontSize: 14 }} aria-hidden="true">M91</span>
              <span style={{ fontSize: 17, flex: 1 }}>{third.kick}</span>
              <Fire color={ACCENT} />
              <span className="obtn" aria-hidden="true"><ArrowUR style={{ width: 16, height: 16 }} /></span>
            </div>
            <h2 className="d hl" style={{ margin: 0, fontSize: 40, lineHeight: 1.08 }}>
              <Title s={third} mark={{ background: HIGHLIGHT, padding: "0 .08em" }} />
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 16, lineHeight: 1.55, color: "#333" }}>
              <p style={{ margin: 0 }}>{third.paras[0]}</p>
              <p className="p2" style={{ margin: 0 }}>{third.paras[1]}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <div className="meta">
                <span><Heart />{third.likes}</span>
                <span><Comment />{third.comments}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }} aria-hidden="true">
                <span style={shareDot}><XIcon style={small} /></span>
                <span style={shareDot}><Instagram style={{ ...small, width: 13, height: 13 }} /></span>
                <span style={shareDot}><Share style={{ ...small, width: 13, height: 13 }} /></span>
              </div>
            </div>
          </a>

          <div className="stats" aria-label="March91 on Instagram">
            {stats.map((s) => (
              <div className="gc stat" key={s.tag}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <svg viewBox="0 0 80 24" width="76" height="22" aria-hidden="true"><path d={s.spark} fill="none" stroke="#333" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  <span className="badge" style={{ background: "#79C29D" }} aria-hidden="true"><Up style={{ width: 14, height: 14, strokeWidth: 2.2 }} /></span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: "auto" }}>
                  <span className="d" style={{ fontSize: 42, lineHeight: 1 }}>{s.value}</span>
                </div>
                <div style={{ fontSize: 17 }}>{s.tag}</div>
              </div>
            ))}
          </div>

          <a href={`mailto:${EMAIL}`} className="pr" style={{ ...link, padding: "18px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 84 }}>
            <div>
              <div className="d" style={{ fontSize: 30, lineHeight: 1.05 }}>Pitch a Story</div>
              <div style={{ fontSize: 16, color: "#444", marginTop: 2 }}>For any story worth reporting, contact us</div>
            </div>
            <span className="rbtn" aria-hidden="true"><ArrowUR /></span>
          </a>
        </div>
      </section>
    </div>
  );
}
