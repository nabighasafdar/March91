import {
  ACCENT, EMAIL, INSTAGRAM_URL, bg, cats, episodes, featured, latest, mostRead, profile, shorts, spotlight, tickerText,
} from "@/lib/data";
import { ArrowRight, ArrowUR, Clock, Comment, Heart, Instagram, Mail, Play, PlaySm } from "./icons";

const link = { textDecoration: "none", color: "#111" } as const;
const sm = { width: 16, height: 16 } as const;
const ext = { target: "_blank", rel: "noreferrer" } as const;

export function Ticker() {
  return (
    <div className="tick" role="region" aria-label="Latest headlines">
      <em style={{ fontSize: 17, whiteSpace: "nowrap", flex: "none" }}>Start the day here</em>
      <div className="mq">
        <div className="track">
          <span>{tickerText}</span>
          <span aria-hidden="true">{tickerText}</span>
        </div>
      </div>
      <a href={INSTAGRAM_URL} {...ext} className="obtn" style={{ border: 0, color: "#fff" }} aria-label="All latest posts"><ArrowRight style={{ width: 22, height: 22 }} /></a>
    </div>
  );
}

export function Latest() {
  return (
    <section className="card sec" aria-labelledby="latest-h">
      <div className="sh"><h2 id="latest-h" className="d">Latest Stories</h2><a href={INSTAGRAM_URL} {...ext} className="pill">View all <ArrowUR /></a></div>
      <div className="g4">
        {latest.map((a) => (
          <a href={a.url} {...ext} className="hov" key={a.code} style={{ ...link, display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="ph" style={{ aspectRatio: "4/3" }} role="img" aria-label={a.title}><i style={bg(a.img)} /></div>
            <div className="kick">{a.kick}</div>
            <h3 className="d hl" style={{ margin: 0, fontSize: 28, lineHeight: 1.08 }}>{a.title}</h3>
            <div className="meta" style={{ fontSize: 14, gap: 12 }}><span style={{ color: "#111" }}>{profile.full_name.replace("'", "’")}</span><span>{a.date}</span><span><Heart style={sm} />{a.likes}</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function WatchListen() {
  return (
    <section className="card sec" style={{ background: "#0F0F0F", color: "#F2F2F2" }} aria-labelledby="wl-h">
      <div className="sh">
        <h2 id="wl-h" className="d">Watch &amp; Listen</h2>
        <a href={INSTAGRAM_URL} {...ext} className="pill w">All reels <ArrowUR /></a>
      </div>
      <div className="wl">
        <a href={featured.url} {...ext} className="hov" style={{ display: "flex", flexDirection: "column", gap: 18, color: "#F2F2F2", textDecoration: "none" }}>
          <div className="ph" style={{ aspectRatio: "16/9", borderRadius: 20 }} role="img" aria-label={featured.title}>
            <i style={bg(featured.img)} />
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              <span style={{ width: 88, height: 88, borderRadius: "50%", background: "#fff", color: "#111", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Play size={30} /></span>
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <div className="kick" style={{ color: "#a8a8a8" }}>{featured.kick} · {featured.fullDate}</div>
              <h3 className="d hl" style={{ margin: "8px 0 0", fontSize: 40, lineHeight: 1.05, maxWidth: 620 }}>{featured.title}</h3>
              <p style={{ margin: "10px 0 0", color: "#a8a8a8", fontSize: 17 }}>Follow for more weekly NUST news updates. Videography by @stillsbylina, reporting by @aylaa.ab and @aazmirts.</p>
            </div>
            <div className="meta" style={{ color: "#a8a8a8" }}><span><Heart />{featured.likes}</span><span><Comment />{featured.comments}</span></div>
          </div>
        </a>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="kick" style={{ color: "#a8a8a8", paddingBottom: 14 }}>More reels</div>
          {episodes.map((e) => (
            <div className="ep hov" key={e.code}>
              <div className="ph" style={{ aspectRatio: "16/10", borderRadius: 12 }} role="img" aria-label={e.title}><i style={bg(e.img)} /></div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, color: "#a8a8a8", letterSpacing: ".04em" }}>{e.kick} · {e.date}</div>
                <a href={e.url} {...ext} className="hl" style={{ color: "#F2F2F2", textDecoration: "none", fontSize: 18, lineHeight: 1.3, display: "block", marginTop: 4 }}>{e.title}</a>
              </div>
              <a href={e.url} {...ext} className="obtn" style={{ borderColor: "rgba(255,255,255,.4)", color: "#fff" }} aria-label={`Play ${e.title}`}><Play size={16} /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Shorts() {
  return (
    <section className="card sec" aria-labelledby="sh-h">
      <div className="sh"><h2 id="sh-h" className="d">March91 Shorts</h2><a href={INSTAGRAM_URL} {...ext} className="pill">Follow on Instagram <ArrowUR /></a></div>
      <div className="shorts">
        {shorts.map((s) => (
          <a href={s.url} {...ext} className="ph short hov" key={s.code}>
            <i style={bg(s.img)} /><span className="shade" />
            <span style={{ position: "absolute", top: 14, left: 14, zIndex: 2, display: "inline-flex", gap: 6, alignItems: "center", fontSize: 14 }}><PlaySm size={14} />{s.likes} likes</span>
            <span className="hl" style={{ position: "absolute", left: 16, right: 16, bottom: 16, zIndex: 2, fontSize: 17, lineHeight: 1.3 }}>{s.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <>
      {cats.map((c) => (
        <section className="card sec" key={c.name}>
          <div className="sh"><h2 className="d">{c.name}</h2><a href={INSTAGRAM_URL} {...ext} className="pill">More {c.lower} <ArrowUR /></a></div>
          <div className="cat">
            <a href={c.lead.url} {...ext} className="hov" style={{ ...link, display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="ph" style={{ aspectRatio: "16/10", borderRadius: 20 }} role="img" aria-label={c.lead.title}><i style={bg(c.lead.img)} /></div>
              <div className="kick">{c.lead.kick}</div>
              <h3 className="d hl" style={{ margin: 0, fontSize: 48, lineHeight: 1.02 }}>{c.lead.title}</h3>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: "#333", maxWidth: 640 }}>{c.dek}</p>
              <div className="meta"><span style={{ color: "#111" }}>{profile.full_name.replace("'", "’")}</span><span><Heart />{c.lead.likes}</span><span><Comment />{c.lead.comments}</span></div>
            </a>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {c.items.map((it) => (
                <a href={it.url} {...ext} className="li hov" key={it.code}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div className="kick">{it.kick}</div>
                    <div className="d hl" style={{ fontSize: 26, lineHeight: 1.1 }}>{it.title}</div>
                    <div className="meta" style={{ fontSize: 14, gap: 12 }}><span style={{ color: "#111" }}>{it.date}</span><span><Heart style={sm} />{it.likes}</span></div>
                  </div>
                  <div className="ph" style={{ aspectRatio: "1/1", borderRadius: 12 }} role="img" aria-label={it.title}><i style={bg(it.img)} /></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export function Spotlight() {
  return (
    <section className="card sec" style={{ background: "#F4EEE3" }} aria-labelledby="op-h">
      <div className="sh">
        <div><h2 id="op-h" className="d">Student Spotlight</h2><p style={{ margin: "10px 0 0", fontSize: 18, color: "#444" }}>Talented students and the animals of campus, featured every week.</p></div>
        <a href={INSTAGRAM_URL} {...ext} className="pill">All features <ArrowUR /></a>
      </div>
      <div className="g4">
        {spotlight.map((p) => (
          <a href={p.url} {...ext} className="hov" key={p.code} style={{ ...link, background: "#FBF8F3", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="ph" style={{ aspectRatio: "1/1", borderRadius: 14 }} role="img" aria-label={p.title}><i style={bg(p.img)} /></div>
            <div className="d hl" style={{ fontSize: 27, lineHeight: 1.12, fontStyle: "italic" }}>{p.title}</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#444" }}>{p.paras[0]}</p>
            <div className="meta" style={{ fontSize: 14, marginTop: "auto" }}><span><Heart style={sm} />{p.likes}</span><span><Comment style={sm} />{p.comments}</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function MostRead() {
  return (
    <section className="card sec" aria-labelledby="mr-h">
      <div className="sh"><h2 id="mr-h" className="d">Most Loved</h2><span style={{ fontSize: 15, color: "#555" }}>Ranked by likes</span></div>
      <ol className="g5" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {mostRead.map((m) => (
          <li key={m.code} style={{ borderTop: "1px solid #111", paddingTop: 18 }}>
            <a href={m.url} {...ext} className="hov" style={{ ...link, display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="num" aria-hidden="true">{m.n}</span>
              <span className="d hl" style={{ fontSize: 24, lineHeight: 1.12 }}>{m.title}</span>
              <span className="meta" style={{ fontSize: 14 }}><span><Heart style={sm} />{m.likes}</span></span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="card" style={{ padding: "48px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, alignItems: "center" }} aria-labelledby="nl-h">
      <div>
        <h2 id="nl-h" className="d" style={{ margin: 0, fontSize: 64, lineHeight: 1 }}>
          Got a story worth <span style={{ background: ACCENT, color: "#fff", padding: "0 .1em" }}>reporting?</span>
        </h2>
        <p style={{ margin: "14px 0 0", fontSize: 18, lineHeight: 1.5, color: "#444", maxWidth: 520 }}>For any story worth reporting, contact us. If you think your friends have talent and should be interviewed, send us a quick email.</p>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a href={`mailto:${EMAIL}`} className="pill" style={{ background: "#111", color: "#fff", height: 56, padding: "0 28px" }}><Mail /> {EMAIL}</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="card" style={{ padding: "48px 40px 28px", display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
        <div className="fcol" style={{ maxWidth: 300 }}>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: "#333" }}>{profile.biography}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <a href={INSTAGRAM_URL} {...ext} className="obtn" aria-label="Instagram"><Instagram /></a>
            <a href={`mailto:${EMAIL}`} className="obtn" aria-label="Email"><Mail /></a>
          </div>
        </div>
        <nav className="fcol" aria-label="Sections"><div className="kick">Sections</div><a href="#">News</a><a href="#">Features</a><a href="#">Style</a></nav>
        <nav className="fcol" aria-label="Watch and listen"><div className="kick">Watch &amp; Listen</div><a href={INSTAGRAM_URL} {...ext}>Reels</a><a href="#">Weekly News</a><a href="#">Shorts</a></nav>
        <nav className="fcol" aria-label="Contact"><div className="kick">Contact</div><a href={`mailto:${EMAIL}`}>Email us</a><a href={INSTAGRAM_URL} {...ext}>Instagram</a></nav>
      </div>
      <div className="d" style={{ fontSize: "21cqw", lineHeight: 0.8, letterSpacing: "-0.02em", textAlign: "center", transform: "scaleY(1.1)", margin: "20px 0 10px" }} aria-hidden="true">
        <span style={{ color: "#6b6b6b" }}>MARCH</span>91
      </div>
      <hr className="rule" />
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 15, color: "#555" }}>
        <span>© 2026 March91 Magazine. All rights reserved.</span>
        <span style={{ display: "flex", gap: 20 }}><a href={INSTAGRAM_URL} {...ext} style={{ color: "#555" }}>@{profile.username}</a></span>
      </div>
    </footer>
  );
}
