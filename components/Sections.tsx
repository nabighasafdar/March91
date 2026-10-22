import {
  ACCENT, cats, columnists, episodes, latest, mostRead, shorts, tickerText,
} from "@/lib/data";
import {
  ArrowRight, ArrowUR, Clock, Comment, Eye, Instagram, Play, PlaySm, TikTok, XIcon, YouTubeOutline,
} from "./icons";

const link = { textDecoration: "none", color: "#111" } as const;
const sm = { width: 16, height: 16 } as const;

export function Ticker() {
  return (
    <div className="tick" role="region" aria-label="Breaking headlines">
      <em style={{ fontSize: 17, whiteSpace: "nowrap", flex: "none" }}>Start the day here</em>
      <div className="mq">
        <div className="track">
          <span>{tickerText}</span>
          <span aria-hidden="true">{tickerText}</span>
        </div>
      </div>
      <a href="#" className="obtn" style={{ border: 0, color: "#fff" }} aria-label="All latest news"><ArrowRight style={{ width: 22, height: 22 }} /></a>
    </div>
  );
}

export function Latest() {
  return (
    <section className="card sec" aria-labelledby="latest-h">
      <div className="sh"><h2 id="latest-h" className="d">Latest Stories</h2><a href="#" className="pill">View all <ArrowUR /></a></div>
      <div className="g4">
        {latest.map((a) => (
          <a href="#" className="hov" key={a.title} style={{ ...link, display: "flex", flexDirection: "column", gap: 14 }}>
            <div className={`ph ${a.tone}`} style={{ aspectRatio: "4/3" }} role="img" aria-label="Story photo"><i /></div>
            <div className="kick">{a.cat}</div>
            <h3 className="d hl" style={{ margin: 0, fontSize: 28, lineHeight: 1.08 }}>{a.title}</h3>
            <div className="meta" style={{ fontSize: 14, gap: 12 }}><span style={{ color: "#111" }}>{a.author}</span><span>{a.date}</span><span><Clock style={sm} />{a.read}</span></div>
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
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <h2 id="wl-h" className="d">Watch &amp; Listen</h2>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ACCENT, color: "#fff", borderRadius: 999, padding: "6px 14px", fontSize: 14, letterSpacing: ".06em", textTransform: "uppercase" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />Live now
          </span>
        </div>
        <a href="#" className="pill w">All episodes <ArrowUR /></a>
      </div>
      <div className="wl">
        <a href="#" className="hov" style={{ display: "flex", flexDirection: "column", gap: 18, color: "#F2F2F2", textDecoration: "none" }}>
          <div className="ph t8" style={{ aspectRatio: "16/9", borderRadius: 20 }} role="img" aria-label="Video: camera operator on set">
            <i />
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              <span style={{ width: 88, height: 88, borderRadius: "50%", background: "#fff", color: "#111", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Play size={30} /></span>
            </span>
            <span style={{ position: "absolute", right: 14, bottom: 14, background: "rgba(0,0,0,.65)", padding: "4px 10px", borderRadius: 999, fontSize: 13, zIndex: 2 }}>58:20</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <div className="kick" style={{ color: "#a8a8a8" }}>Episode 48 · The Long Table</div>
              <h3 className="d hl" style={{ margin: "8px 0 0", fontSize: 40, lineHeight: 1.05, maxWidth: 620 }}>Three Generations of Women on Running a Family Business</h3>
            </div>
            <div className="meta" style={{ color: "#a8a8a8" }}><span><Clock />58 min</span><span><Eye />41,208</span></div>
          </div>
        </a>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="kick" style={{ color: "#a8a8a8", paddingBottom: 14 }}>Recent episodes &amp; podcasts</div>
          {episodes.map((e) => (
            <div className="ep hov" key={e.title}>
              <div className={`ph ${e.tone}`} style={{ aspectRatio: "16/10", borderRadius: 12 }} role="img" aria-label="Episode thumbnail"><i /></div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, color: "#a8a8a8", letterSpacing: ".04em" }}>{e.kind} · {e.dur}</div>
                <a href="#" className="hl" style={{ color: "#F2F2F2", textDecoration: "none", fontSize: 18, lineHeight: 1.3, display: "block", marginTop: 4 }}>{e.title}</a>
              </div>
              <button type="button" className="obtn" style={{ borderColor: "rgba(255,255,255,.4)", color: "#fff" }} aria-label={`Play ${e.title}`}><Play size={16} /></button>
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
      <div className="sh"><h2 id="sh-h" className="d">March91 Shorts</h2><a href="#" className="pill">Follow on Instagram <ArrowUR /></a></div>
      <div className="shorts">
        {shorts.map((s) => (
          <a href="#" className={`ph short hov ${s.tone}`} key={s.title}>
            <i /><span className="shade" />
            <span style={{ position: "absolute", top: 14, left: 14, zIndex: 2, display: "inline-flex", gap: 6, alignItems: "center", fontSize: 14 }}><PlaySm size={14} />{s.views}</span>
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
          <div className="sh"><h2 className="d">{c.name}</h2><a href="#" className="pill">More {c.lower} <ArrowUR /></a></div>
          <div className="cat">
            <a href="#" className="hov" style={{ ...link, display: "flex", flexDirection: "column", gap: 16 }}>
              <div className={`ph ${c.tone}`} style={{ aspectRatio: "16/10", borderRadius: 20 }} role="img" aria-label="Story photo"><i /></div>
              <div className="kick">{c.kick}</div>
              <h3 className="d hl" style={{ margin: 0, fontSize: 48, lineHeight: 1.02 }}>{c.title}</h3>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: "#333", maxWidth: 640 }}>{c.dek}</p>
              <div className="meta"><span style={{ color: "#111" }}>{c.author}</span><span><Comment />{c.comments}</span><span><Clock />{c.read}</span></div>
            </a>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {c.items.map((it) => (
                <a href="#" className="li hov" key={it.title}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div className="kick">{it.kick}</div>
                    <div className="d hl" style={{ fontSize: 26, lineHeight: 1.1 }}>{it.title}</div>
                    <div className="meta" style={{ fontSize: 14, gap: 12 }}><span style={{ color: "#111" }}>{it.author}</span><span>{it.read}</span></div>
                  </div>
                  <div className={`ph ${it.tone}`} style={{ aspectRatio: "1/1", borderRadius: 12 }} role="img" aria-label="Story photo"><i /></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export function Opinion() {
  return (
    <section className="card sec" style={{ background: "#F4EEE3" }} aria-labelledby="op-h">
      <div className="sh">
        <div><h2 id="op-h" className="d">Opinion &amp; Columnists</h2><p style={{ margin: "10px 0 0", fontSize: 18, color: "#444" }}>Arguments, not noise. Every week from the people we read first.</p></div>
        <a href="#" className="pill">All columnists <ArrowUR /></a>
      </div>
      <div className="g4">
        {columnists.map((p) => (
          <a href="#" className="hov" key={p.name} style={{ ...link, background: "#FBF8F3", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className={`ph ${p.tone}`} style={{ width: 64, height: 64, borderRadius: "50%", flex: "none" }} role="img" aria-label="Columnist portrait"><i /></span>
              <div><div style={{ fontSize: 18 }}>{p.name}</div><div style={{ fontSize: 14, color: "#555" }}>{p.column}</div></div>
            </div>
            <div className="d hl" style={{ fontSize: 27, lineHeight: 1.12, fontStyle: "italic" }}>“{p.piece}”</div>
            <div className="meta" style={{ fontSize: 14, marginTop: "auto" }}><span><Clock style={sm} />{p.read}</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function MostRead() {
  return (
    <section className="card sec" aria-labelledby="mr-h">
      <div className="sh"><h2 id="mr-h" className="d">Most Read</h2><span style={{ fontSize: 15, color: "#555" }}>Updated hourly</span></div>
      <ol className="g5" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {mostRead.map((m) => (
          <li key={m.n} style={{ borderTop: "1px solid #111", paddingTop: 18 }}>
            <a href="#" className="hov" style={{ ...link, display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="num" aria-hidden="true">{m.n}</span>
              <span className="d hl" style={{ fontSize: 24, lineHeight: 1.12 }}>{m.title}</span>
              <span className="meta" style={{ fontSize: 14 }}><span><Clock style={sm} />{m.read}</span></span>
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
          Start your day with <span style={{ background: ACCENT, color: "#fff", padding: "0 .1em" }}>March91</span>
        </h2>
        <p style={{ margin: "14px 0 0", fontSize: 18, lineHeight: 1.5, color: "#444", maxWidth: 520 }}>One email at 7 a.m. — the five stories worth your morning, tonight&apos;s broadcast, and one long read for the weekend.</p>
      </div>
      <form style={{ display: "flex", gap: 10, flexWrap: "wrap" }} action="#">
        <label className="sr" htmlFor="nl-email">Email address</label>
        <input id="nl-email" className="inp" type="email" placeholder="you@example.com" />
        <button type="submit" className="pill" style={{ background: "#111", color: "#fff", height: 56, padding: "0 28px" }}>Subscribe</button>
        <p style={{ margin: "4px 0 0 24px", fontSize: 14, color: "#555", width: "100%" }}>Free. Unsubscribe anytime.</p>
      </form>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="card" style={{ padding: "48px 40px 28px", display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
        <div className="fcol" style={{ maxWidth: 300 }}>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: "#333" }}>A digital magazine and broadcasting channel. Stories, episodes and shorts — made to be read slowly.</p>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <a href="#" className="obtn" aria-label="Instagram"><Instagram /></a>
            <a href="#" className="obtn" aria-label="YouTube"><YouTubeOutline /></a>
            <a href="#" className="obtn" aria-label="TikTok"><TikTok /></a>
            <a href="#" className="obtn" aria-label="X"><XIcon /></a>
          </div>
        </div>
        <nav className="fcol" aria-label="Sections"><div className="kick">Sections</div><a href="#">News</a><a href="#">Culture</a><a href="#">Lifestyle</a><a href="#">Opinion</a></nav>
        <nav className="fcol" aria-label="Watch and listen"><div className="kick">Watch &amp; Listen</div><a href="#">Episodes</a><a href="#">Podcasts</a><a href="#">Shorts</a><a href="#">Live</a></nav>
        <nav className="fcol" aria-label="About"><div className="kick">About</div><a href="#">About us</a><a href="#">Team</a><a href="#">Advertise</a><a href="#">Contact</a><a href="#">Careers</a></nav>
      </div>
      <div className="d" style={{ fontSize: "21cqw", lineHeight: 0.8, letterSpacing: "-0.02em", textAlign: "center", transform: "scaleY(1.1)", margin: "20px 0 10px" }} aria-hidden="true">
        <span style={{ color: "#6b6b6b" }}>MARCH</span>91
      </div>
      <hr className="rule" />
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 15, color: "#555" }}>
        <span>© 2026 March91 Magazine. All rights reserved.</span>
        <span style={{ display: "flex", gap: 20 }}><a href="#" style={{ color: "#555" }}>Privacy</a><a href="#" style={{ color: "#555" }}>Terms</a><a href="#" style={{ color: "#555" }}>@march91magazine</a></span>
      </div>
    </footer>
  );
}
