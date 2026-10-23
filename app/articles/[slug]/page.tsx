import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerFooter, InnerTop } from "@/components/InnerChrome";
import { ArrowUR, Clock, Comment, Heart, Instagram } from "@/components/icons";
import { ShareBar } from "@/components/ShareBar";
import { INSTAGRAM_URL, articleBySlug, articles, bg, ini, profile, related, refresh } from "@/lib/data";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  refresh();
  const a = articleBySlug((await params).slug);
  if (!a) return {};
  return { title: `${a.title} — March91`, description: a.seo || a.dek, openGraph: { title: a.title, description: a.dek, images: [a.img] } };
}

export default async function ArticlePage({ params }: Ctx) {
  refresh();
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  const more = related(a, 3);
  const side = related(a, 4);
  const hl = a.hl && a.title.includes(a.hl) ? a.title.split(a.hl) : null;
  const watch = a.type === "reel";
  const first = a.body[0] ?? "";

  return (
    <div className="pg pg-in">
      <div className="wrap">
        <div className="shell">
          <InnerTop />
          <article>
            <div className="ar-top">
              <div className="rail" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, paddingTop: 10 }}>
                <nav aria-label="Breadcrumb" style={{ fontSize: 15, color: "#555", textAlign: "right", lineHeight: 1.6 }}>
                  <Link href="/" style={{ color: "#555" }}>Home</Link> / <Link href={`/articles?topic=${encodeURIComponent(a.kick)}`} style={{ color: "#555" }}>{a.kick}</Link>
                </nav>
                <Link href="/articles" style={{ fontSize: 15, color: "#555", display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44 }}>
                  <svg className="ic" viewBox="0 0 24 24" style={{ width: 16, height: 16 }} aria-hidden="true"><path d="M20 12H4M10 6l-6 6 6 6" /></svg>All stories
                </Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                <h1 className="d" style={{ margin: 0, fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
                  {hl ? <>{hl[0]}<span className={a.hlStyle === "hl-none" ? undefined : a.hlStyle}>{a.hl}</span>{hl[1]}</> : a.title}
                </h1>
                <p style={{ margin: 0, fontSize: 21, lineHeight: 1.55, color: "#333" }}>{a.dek}</p>
                <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
                  <ShareBar slug={a.slug} title={a.title} />
                  <span className="act" style={{ cursor: "default" }}><Clock style={{ width: 20, height: 20 }} />{a.read} min read</span>
                  {a.url && <a className="pill" href={a.url} target="_blank" rel="noreferrer" style={{ height: 44 }}>{watch ? "Watch the reel" : "View original post"} <Instagram /></a>}
                </div>
              </div>
              <aside className="sideb" aria-label="Story details" style={{ paddingTop: 10 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span className="av" style={{ width: 44, height: 44, fontSize: 14 }}>{ini(a.author)}</span>
                  <div>{a.author}<span>{a.fullDate}</span></div>
                </div>
                {a.url && <div><a href="#discussion" style={{ textDecoration: "none", color: "#111" }}>{a.comments} comments</a><span>Join the discussion</span></div>}
                <div>{a.kick}<span>{a.section}</span></div>
                <div style={{ display: "flex", gap: 14, color: "#333" }}><span style={{ display: "inline-flex", gap: 6, alignItems: "center", margin: 0, color: "#333", fontSize: 16 }}><Heart />{a.likes}</span><span style={{ display: "inline-flex", gap: 6, alignItems: "center", margin: 0, color: "#333", fontSize: 16 }}><Comment />{a.comments}</span></div>
              </aside>
            </div>

            <figure className="ar-fig" style={{ margin: "0 48px" }}>
              <div className="ph" style={{ aspectRatio: "16/9", borderRadius: 24 }} role="img" aria-label={a.title}>
                <i style={{ ...bg(a.img), backgroundPosition: "50% 30%" }} />
              </div>
              <figcaption style={{ fontSize: 15, color: "#555", marginTop: 12, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <span>{a.custom ? a.caption : a.carousel > 1 ? `Cover of a ${a.carousel}-slide carousel` : watch ? "Still from the reel" : "From the post"}</span>
                <span>Photo: {a.custom ? a.credit || "March91" : `${profile.full_name.replace("'", "’")} / Staff`}</span>
              </figcaption>
            </figure>

            <div className="ar-body">
              <div className="rail" style={{ display: "flex", justifyContent: "flex-end" }}><ShareBar slug={a.slug} title={a.title} rail /></div>

              <div className="prose">
                {a.body.map((p, i) =>
                  p.startsWith("## ") ? <h2 key={i}>{p.slice(3)}</h2>
                  : p.startsWith("> ") ? <blockquote key={i} className="d" style={{ margin: "44px 0", fontSize: 36, lineHeight: 1.15, color: "#111" }}>&ldquo;{p.slice(2)}&rdquo;</blockquote>
                  : <p key={i} className={i === 0 && first.length > 120 ? "drop-cap" : undefined}>{p}</p>
                )}
                {a.body.length === 0 && <p>{a.dek}</p>}

                {a.credits.length > 0 && (
                  <div style={{ margin: "40px 0 0", borderTop: "1px solid #E2E2E2", paddingTop: 24 }}>
                    <div className="kick" style={{ marginBottom: 12 }}>Credits</div>
                    <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "max-content 1fr", gap: "8px 24px", fontSize: 17 }}>
                      {a.credits.map((c) => (
                        <div key={c.role} style={{ display: "contents" }}>
                          <dt style={{ color: "#555" }}>{c.role}</dt>
                          <dd style={{ margin: 0 }}>{c.who.map((w, i) => (
                            <span key={w + i}>{i > 0 && ", "}<a href={`https://www.instagram.com/${w.slice(1)}/`} target="_blank" rel="noreferrer" style={{ color: "#111" }}>{w}</a></span>
                          ))}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "40px 0 0" }}>
                  {a.tags.map((t) => <Link key={t} href={`/articles?q=${encodeURIComponent(t)}`} className="atag">#{t}</Link>)}
                </div>

                <div style={{ marginTop: 40, background: "linear-gradient(180deg,#F0F0F0,#F7F7F7)", borderRadius: 24, padding: 28, display: "grid", gridTemplateColumns: "64px minmax(0,1fr)", gap: 18, alignItems: "start" }}>
                  <span className="av" style={{ width: 64, height: 64, fontSize: 20 }}>M91</span>
                  <div>
                    <div className="kick">Published by</div>
                    <div className="d" style={{ fontSize: 30, lineHeight: 1.1, marginTop: 4 }}>{profile.full_name.replace("'", "’")}</div>
                    <p style={{ margin: "8px 0 14px", fontSize: 17, lineHeight: 1.55, color: "#444" }}>{profile.biography}</p>
                    <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="pill" style={{ height: 44, fontSize: 15 }}>Follow @{profile.username} <ArrowUR /></a>
                  </div>
                </div>

                {a.url && (
                <section id="discussion" style={{ marginTop: 56 }} aria-labelledby="cm-h">
                  <h2 id="cm-h" style={{ margin: "0 0 12px" }}>{a.comments} {a.comments === 1 ? "comment" : "comments"}</h2>
                  <p style={{ fontSize: 19, margin: "0 0 18px", whiteSpace: "normal" }}>This story&rsquo;s conversation lives on Instagram, where {a.likes} readers liked it.</p>
                  <a href={a.url} target="_blank" rel="noreferrer" className="pill" style={{ background: "#111", color: "#fff" }}>Join the discussion <Instagram /></a>
                </section>
                )}
              </div>

              <aside className="rail" aria-label="Related">
                <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                  <div className="kick">More in {a.section}</div>
                  {side.map((s) => (
                    <Link key={s.slug} href={`/articles/${s.slug}`} className="hov" style={{ display: "flex", flexDirection: "column", gap: 4, textDecoration: "none", color: "#111", borderTop: "1px solid #E8E8E8", paddingTop: 14 }}>
                      <span className="d hl" style={{ fontSize: 22, lineHeight: 1.12 }}>{s.title}</span>
                      <span style={{ fontSize: 14, color: "#555" }}>{s.kick} · {s.read} min</span>
                    </Link>
                  ))}
                  <Link href="/articles" className="pill" style={{ marginTop: 8, justifyContent: "center" }}>All stories</Link>
                </div>
              </aside>
            </div>
          </article>
        </div>

        <section className="card rn" style={{ padding: "40px 48px 48px", display: "flex", flexDirection: "column", gap: 28 }} aria-labelledby="rn-h">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
            <h2 id="rn-h" className="d" style={{ margin: 0, fontSize: 52, lineHeight: 1 }}>Read next</h2>
            <Link href="/articles" className="pill">All stories <ArrowUR /></Link>
          </div>
          <div className="next3">
            {more.map((n) => (
              <Link key={n.slug} href={`/articles/${n.slug}`} className="hov" style={{ display: "flex", flexDirection: "column", gap: 12, textDecoration: "none", color: "#111" }}>
                <div className="ph" style={{ aspectRatio: "16/10" }} role="img" aria-label={n.title}><i style={bg(n.img)} /></div>
                <div className="kick">{n.kick}</div>
                <h3 className="d hl" style={{ margin: 0, fontSize: 30, lineHeight: 1.08 }}>{n.title}</h3>
                <div className="meta" style={{ fontSize: 14 }}><span style={{ color: "#111" }}>{n.author}</span><span>{n.read} min read</span></div>
              </Link>
            ))}
          </div>
        </section>

        <InnerFooter />
      </div>
    </div>
  );
}
