import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS ATELIER — デザイナーズ住宅・ライフスタイル誌
   白×淡色 / CSS columnsマサンリー / カスタムカーソル / 大判写真
   ============================================================ */

export default function BuilderDesignerDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  // カスタムカーソル
  useEffect(() => {
    const c = cursorRef.current; if (!c) return
    let raf = 0
    let x = -100, y = -100, tx = -100, ty = -100
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const tick = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18
      c.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    tick()
    // hover detection
    const hov = () => c.classList.add('is-hover')
    const out = () => c.classList.remove('is-hover')
    document.querySelectorAll('.dr-hot').forEach((el) => {
      el.addEventListener('mouseenter', hov); el.addEventListener('mouseleave', out)
    })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.dr-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="dr-root">
      <style>{cssText}</style>

      <div ref={cursorRef} className="dr-cursor" aria-hidden><span>VIEW</span></div>

      <div className="dr-warning">
        <div className="dr-warning-row">
          <span className="dr-warning-pill">SAMPLE</span>
          <span className="dr-warning-text">⚠️ <b>POLARIS ATELIER</b> は<b className="dr-warning-emph">実在しない仮想デザイナーズ住宅会社</b>です。ポラリスクリエイティブ作成のデザイン見本。</span>
          <a href="#hp" className="dr-warning-back">← 戻る</a>
        </div>
        <div className="dr-warning-strip">⚠️ 注意：会社名・住所・電話・施工事例・設計者名はすべて<u>架空</u>です。</div>
      </div>

      <header className="dr-header">
        <a href="#" className="dr-logo dr-hot" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <strong>POLARIS</strong>
          <em>ATELIER</em>
        </a>
        <nav className={`dr-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#archive" onClick={() => setMenuOpen(false)} className="dr-hot">ARCHIVE</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="dr-hot">ABOUT</a>
          <a href="#journal" onClick={() => setMenuOpen(false)} className="dr-hot">JOURNAL</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="dr-hot">CONTACT</a>
        </nav>
        <button className="dr-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
      </header>

      <section className="dr-hero">
        <div className="dr-hero-num">No.<br/>2026<br/>—<br/>03</div>
        <h1 className="dr-hero-title">
          <span>The Art</span>
          <span><em>of Living</em></span>
          <span>Beautifully.</span>
        </h1>
        <p className="dr-hero-issue">Issue 03 · Spring 2026 — Houses for Modern Lives（架空）</p>
        <div className="dr-hero-img dr-hot">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80" alt="" />
          <div className="dr-hero-caption">"House in Karuizawa"（架空） — Photo by P. Studio</div>
        </div>
        <div className="dr-hero-badge">※ 架空のデザイン見本</div>
      </section>

      <section id="archive" className="dr-archive">
        <div className="dr-section-head dr-reveal">
          <span className="dr-eyebrow">— ARCHIVE 2020–2026 —</span>
          <h2 className="dr-h2">Selected Works.</h2>
          <p>建築家による意匠設計の住宅・別荘・アトリエ（架空）。<br/><span className="dr-fake">※ 以下の事例・設計者名はすべて架空のサンプル。</span></p>
        </div>
        <div className="dr-masonry">
          {[
            { img: 'photo-1600585154340-be6161a56a0c', t: 'House in Karuizawa', a: 'A. Tanaka', y: '2024', h: 'tall' },
            { img: 'photo-1493809842364-78817add7ffb', t: 'Studio M', a: 'B. Sato', y: '2024', h: 'short' },
            { img: 'photo-1564540583246-934409427776', t: 'Lakeside Villa', a: 'C. Suzuki', y: '2023', h: 'med' },
            { img: 'photo-1600566753190-17f0baa2a6c3', t: 'Concrete Court', a: 'A. Tanaka', y: '2023', h: 'tall' },
            { img: 'photo-1505691938895-1758d7feb511', t: 'House in Forest', a: 'D. Ito', y: '2023', h: 'short' },
            { img: 'photo-1600607687939-ce8a6c25118c', t: 'White Box', a: 'B. Sato', y: '2022', h: 'med' },
            { img: 'photo-1487958449943-2429e8be8625', t: 'Tower Atelier', a: 'C. Suzuki', y: '2022', h: 'tall' },
            { img: 'photo-1486325212027-8081e485255e', t: 'Urban Hut', a: 'D. Ito', y: '2021', h: 'short' },
          ].map((w, i) => (
            <article key={i} className={`dr-card dr-card-${w.h} dr-reveal dr-hot`}>
              <div className="dr-card-img">
                <img src={`https://images.unsplash.com/${w.img}?auto=format&fit=crop&w=1200&q=80`} alt="" />
                <span className="dr-card-fake">架空</span>
              </div>
              <div className="dr-card-meta">
                <span className="dr-card-num">— No. {String(i + 1).padStart(2, '0')} / {w.y}</span>
                <h3>{w.t}<small>※架空</small></h3>
                <p>Designed by {w.a}（架空）</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="dr-about">
        <div className="dr-about-grid">
          <div className="dr-about-img dr-reveal dr-hot">
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80" alt="" />
          </div>
          <div className="dr-about-text dr-reveal">
            <span className="dr-eyebrow">— ABOUT —</span>
            <h2 className="dr-h2">設計とは、<br/>「暮らしの編集」。</h2>
            <p>POLARIS ATELIER（架空）は、住む人の <i>「日常の所作」</i> から逆算して、住まいの一つひとつを設計するデザインアトリエです。</p>
            <p>建築家・インテリアデザイナー・ランドスケープアーキテクトが横断的にチームを組み、雑誌のような美しさと、暮らしの機能性を、両立させます。</p>
            <p className="dr-fake">※ このページは仮想デザイナーズ住宅会社のデザイン見本です。</p>
          </div>
        </div>
      </section>

      <section id="journal" className="dr-journal">
        <div className="dr-section-head dr-reveal">
          <span className="dr-eyebrow">— JOURNAL —</span>
          <h2 className="dr-h2">読み物。</h2>
          <p className="dr-fake-pill">※ 以下の記事はすべて<b>架空のサンプル</b>です。</p>
        </div>
        <div className="dr-journal-grid">
          {[
            { tag: 'ESSAY', t: '余白という、贅沢について。', d: '北欧建築から学ぶ「何もない」豊かさ。', y: '2026.04.10' },
            { tag: 'INTERVIEW', t: '建築家・田中朗（架空）に聞く、家と時間。', d: '20年の設計人生で見えてきた、住まいの本質。', y: '2026.03.28' },
            { tag: 'TRAVEL', t: '京都の町家を、現代に再編集する。', d: '伝統建築の知恵を、現代の生活に活かす。', y: '2026.03.05' },
          ].map((j, i) => (
            <article key={i} className="dr-journal-card dr-reveal dr-hot">
              <div className="dr-journal-tag">{j.tag}<small>※架空</small></div>
              <h3>{j.t}</h3>
              <p>{j.d}</p>
              <div className="dr-journal-meta">
                <span>{j.y}（架空）</span>
                <span>READ →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="dr-cta">
        <div className="dr-cta-inner dr-reveal">
          <span className="dr-eyebrow">— CONTACT —</span>
          <h2 className="dr-cta-h">あなたの<br/><em>美しい暮らし</em>を、<br/>設計しませんか。</h2>
          <p>家づくりのご相談、設計プランのお見積もりなど、お気軽にお問い合わせください。<br/><span className="dr-fake">※ 動作しません。仮想デザイナーズ住宅会社のデザイン見本です。</span></p>
          <div className="dr-cta-btns">
            <a href="#" className="dr-btn dr-btn-primary dr-hot">設計相談 予約（仮）→</a>
            <a href="#" className="dr-btn dr-btn-ghost dr-hot">作品集 請求（仮）</a>
          </div>
          <dl className="dr-cta-info">
            <div><dt>ATELIER（架空）</dt><dd>東京都〇〇区〇〇 0-0-0 ※実在しません</dd></div>
            <div><dt>OPEN（架空）</dt><dd>水〜日 11:00 - 19:00 / 完全予約制</dd></div>
            <div><dt>CONTACT（架空）</dt><dd>contact@polaris-atelier.example</dd></div>
          </dl>
        </div>
      </section>

      <footer className="dr-footer">
        <div className="dr-footer-mark"><strong>POLARIS</strong><em>ATELIER</em></div>
        <p className="dr-footer-tag">— The Art of Living Beautifully. —</p>
        <div className="dr-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS ATELIER」という<u>実在しない仮想デザイナーズ住宅会社</u>のデザイン見本です。<br/>
          会社名・住所・電話・施工事例・設計者名・記事はすべて<u>架空</u>です。
        </div>
        <p className="dr-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="dr-floating-warning">
        <span className="dr-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想デザイナーズ住宅会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.dr-root {
  --dr-bg: #fafaf7;
  --dr-paper: #f0ede5;
  --dr-fg: #1a1a1a;
  --dr-fg-soft: rgba(26,26,26,0.6);
  --dr-accent: #c2a47e;
  --dr-pink: #d4506a;
  background: var(--dr-bg);
  color: var(--dr-fg);
  font-family: "Hiragino Mincho ProN", "Noto Serif JP", serif;
  min-height: 100vh;
  cursor: none;
}
.dr-root *, .dr-root *::before, .dr-root *::after { box-sizing: border-box; }
@media (max-width: 900px), (pointer: coarse) { .dr-root { cursor: auto; } .dr-cursor { display: none; } }

.dr-cursor { position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none; width: 16px; height: 16px; border-radius: 50%; background: var(--dr-fg); transition: width .25s, height .25s, background .25s; display: flex; align-items: center; justify-content: center; color: transparent; font-size: 10px; letter-spacing: 0.15em; font-family: "Helvetica Neue", sans-serif; font-weight: 700; }
.dr-cursor.is-hover { width: 72px; height: 72px; background: rgba(26,26,26,0.92); color: #fff; }
.dr-cursor span { opacity: 0; transition: opacity .2s; }
.dr-cursor.is-hover span { opacity: 1; }

.dr-warning { position: sticky; top: 0; z-index: 50; background: #1a1a1a; color: #fff; border-bottom: 2px solid var(--dr-pink); font-family: "Helvetica Neue", sans-serif; }
.dr-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.dr-warning-pill { background: var(--dr-pink); color: #fff; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; flex-shrink: 0; }
.dr-warning-text { flex: 1; min-width: 0; }
.dr-warning-emph { color: var(--dr-pink); }
.dr-warning-back { background: #fff; color: #1a1a1a; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.dr-warning-strip { background: var(--dr-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.dr-header { position: sticky; top: 76px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 18px 32px; background: rgba(250,250,247,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(26,26,26,0.08); }
.dr-logo { display: flex; flex-direction: column; line-height: 1; text-decoration: none; color: var(--dr-fg); }
.dr-logo strong { font-size: 18px; letter-spacing: 0.25em; font-weight: 700; font-family: "Helvetica Neue", sans-serif; }
.dr-logo em { font-size: 10px; letter-spacing: 0.4em; font-style: italic; color: var(--dr-fg-soft); margin-top: 4px; }
.dr-nav { display: none; gap: 32px; margin-left: auto; }
.dr-nav a { color: var(--dr-fg); text-decoration: none; font-size: 12px; letter-spacing: 0.2em; font-weight: 600; font-family: "Helvetica Neue", sans-serif; transition: opacity .2s; }
.dr-nav a:hover { opacity: 0.5; }
.dr-burger { margin-left: auto; background: none; border: 1px solid rgba(26,26,26,0.2); width: 38px; height: 38px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; cursor: pointer; }
.dr-burger span { display: block; width: 18px; height: 2px; background: var(--dr-fg); transition: transform .25s; }
.dr-burger span.is-open:first-child { transform: translateY(3.5px) rotate(45deg); }
.dr-burger span.is-open:last-child { transform: translateY(-3.5px) rotate(-45deg); }
@media (min-width: 900px) { .dr-nav { display: flex; } .dr-burger { display: none; } }
.dr-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--dr-bg); padding: 24px; display: flex; }

.dr-hero { position: relative; padding: 64px 32px 80px; max-width: 1400px; margin: 0 auto; }
.dr-hero-num { position: absolute; top: 64px; right: 32px; font-size: 14px; line-height: 1.4; color: var(--dr-fg-soft); font-family: "Helvetica Neue", sans-serif; letter-spacing: 0.15em; }
.dr-hero-title { font-size: clamp(48px, 11vw, 168px); font-weight: 400; line-height: 1; letter-spacing: -0.04em; margin: 32px 0 48px; }
.dr-hero-title span { display: block; opacity: 0; transform: translateY(40px); animation: dr-rise 1s cubic-bezier(.2,.7,.2,1) forwards; }
.dr-hero-title span:nth-child(2) { animation-delay: .2s; padding-left: clamp(40px, 12vw, 200px); }
.dr-hero-title span:nth-child(3) { animation-delay: .4s; }
.dr-hero-title em { font-style: italic; color: var(--dr-accent); font-family: "Times New Roman", "Yu Mincho", serif; }
.dr-hero-issue { font-size: 13px; letter-spacing: 0.15em; color: var(--dr-fg-soft); margin: 0 0 40px; font-family: "Helvetica Neue", sans-serif; }
.dr-hero-img { position: relative; overflow: hidden; aspect-ratio: 16/9; }
.dr-hero-img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.92); transition: transform 1s; }
.dr-hero-img:hover img { transform: scale(1.03); }
.dr-hero-caption { position: absolute; bottom: 16px; left: 24px; right: 24px; color: rgba(255,255,255,0.92); font-size: 11px; letter-spacing: 0.1em; font-style: italic; }
.dr-hero-badge { position: absolute; top: 24px; left: 32px; background: var(--dr-pink); color: #fff; padding: 6px 14px; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; z-index: 5; font-family: "Helvetica Neue", sans-serif; }

.dr-archive, .dr-about, .dr-journal, .dr-cta { padding: 120px 32px; }
.dr-section-head { max-width: 800px; margin: 0 auto 64px; }
.dr-eyebrow { display: inline-block; font-size: 11px; letter-spacing: 0.3em; color: var(--dr-fg-soft); font-weight: 600; margin-bottom: 16px; font-family: "Helvetica Neue", sans-serif; }
.dr-h2 { font-size: clamp(36px, 6vw, 88px); font-weight: 400; line-height: 1.1; letter-spacing: -0.03em; margin: 0 0 24px; }
.dr-h2 em { font-style: italic; color: var(--dr-accent); }
.dr-section-head p { font-size: 14px; line-height: 1.9; color: var(--dr-fg-soft); margin: 0; }
.dr-fake { color: var(--dr-pink); font-weight: 700; }
.dr-fake-pill { display: inline-block; padding: 6px 18px; background: rgba(212,80,106,0.1); color: var(--dr-pink); border: 1px solid rgba(212,80,106,0.3); border-radius: 999px; font-size: 12px; font-weight: 700; margin-top: 12px; font-family: "Helvetica Neue", sans-serif; }

.dr-masonry { columns: 3 280px; column-gap: 24px; max-width: 1400px; margin: 0 auto; }
.dr-card { break-inside: avoid; margin-bottom: 24px; cursor: none; }
.dr-card-tall .dr-card-img { aspect-ratio: 3/4; }
.dr-card-med .dr-card-img { aspect-ratio: 4/5; }
.dr-card-short .dr-card-img { aspect-ratio: 4/3; }
.dr-card-img { position: relative; overflow: hidden; }
.dr-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s; }
.dr-card:hover .dr-card-img img { transform: scale(1.05); }
.dr-card-fake { position: absolute; top: 12px; right: 12px; background: var(--dr-pink); color: #fff; padding: 3px 8px; font-size: 9px; font-weight: 700; font-family: "Helvetica Neue", sans-serif; }
.dr-card-meta { padding: 16px 4px 0; }
.dr-card-num { font-size: 11px; letter-spacing: 0.15em; color: var(--dr-fg-soft); font-family: "Helvetica Neue", sans-serif; }
.dr-card h3 { font-size: 22px; font-weight: 400; margin: 6px 0 4px; letter-spacing: -0.01em; }
.dr-card h3 small { font-size: 9px; color: var(--dr-pink); margin-left: 6px; font-weight: 500; font-family: "Helvetica Neue", sans-serif; }
.dr-card p { font-size: 12px; color: var(--dr-fg-soft); margin: 0; font-style: italic; }

.dr-about { background: var(--dr-paper); }
.dr-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; max-width: 1280px; margin: 0 auto; align-items: center; }
@media (max-width: 800px) { .dr-about-grid { grid-template-columns: 1fr; gap: 40px; } }
.dr-about-img { position: relative; aspect-ratio: 3/4; overflow: hidden; }
.dr-about-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s; }
.dr-about-img:hover img { transform: scale(1.04); }
.dr-about-text p { font-size: 16px; line-height: 2; color: var(--dr-fg); margin: 0 0 20px; }
.dr-about-text i { font-style: italic; color: var(--dr-accent); }

.dr-journal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; max-width: 1280px; margin: 0 auto; }
.dr-journal-card { padding: 32px 28px; border: 1px solid rgba(26,26,26,0.12); transition: all .3s; cursor: none; }
.dr-journal-card:hover { background: var(--dr-paper); border-color: var(--dr-fg); }
.dr-journal-tag { font-size: 11px; letter-spacing: 0.2em; color: var(--dr-pink); font-weight: 700; margin-bottom: 16px; font-family: "Helvetica Neue", sans-serif; }
.dr-journal-tag small { font-size: 9px; opacity: 0.7; margin-left: 6px; }
.dr-journal-card h3 { font-size: 22px; font-weight: 400; line-height: 1.4; margin: 0 0 12px; letter-spacing: -0.01em; }
.dr-journal-card p { font-size: 13px; line-height: 1.8; color: var(--dr-fg-soft); margin: 0 0 20px; }
.dr-journal-meta { display: flex; justify-content: space-between; align-items: center; font-size: 11px; letter-spacing: 0.15em; color: var(--dr-fg-soft); font-family: "Helvetica Neue", sans-serif; padding-top: 16px; border-top: 1px solid rgba(26,26,26,0.1); }

.dr-cta { background: var(--dr-fg); color: var(--dr-bg); text-align: center; }
.dr-cta .dr-eyebrow { color: rgba(250,250,247,0.65); }
.dr-cta-h { font-size: clamp(40px, 7vw, 96px); font-weight: 400; line-height: 1.1; letter-spacing: -0.03em; margin: 0 0 24px; color: #fff; }
.dr-cta-h em { font-style: italic; color: var(--dr-accent); }
.dr-cta p { font-size: 15px; line-height: 1.9; color: rgba(250,250,247,0.7); margin: 0 0 36px; }
.dr-cta-inner { max-width: 800px; margin: 0 auto; }
.dr-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
.dr-btn { display: inline-flex; align-items: center; padding: 16px 28px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-decoration: none; transition: all .25s; font-family: "Helvetica Neue", sans-serif; cursor: none; }
.dr-btn-primary { background: #fff; color: var(--dr-fg); }
.dr-btn-primary:hover { background: var(--dr-accent); color: #fff; }
.dr-btn-ghost { color: #fff; border: 1px solid #fff; }
.dr-btn-ghost:hover { background: #fff; color: var(--dr-fg); }
.dr-cta-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; padding-top: 32px; border-top: 1px solid rgba(250,250,247,0.2); margin: 0; text-align: left; }
.dr-cta-info dt { font-size: 10px; color: var(--dr-accent); letter-spacing: 0.2em; margin-bottom: 6px; font-family: "Helvetica Neue", sans-serif; font-weight: 600; }
.dr-cta-info dd { margin: 0; font-size: 14px; color: rgba(250,250,247,0.85); }

.dr-footer { padding: 64px 32px 32px; background: var(--dr-bg); color: var(--dr-fg); text-align: center; border-top: 1px solid rgba(26,26,26,0.1); }
.dr-footer-mark { margin-bottom: 12px; }
.dr-footer-mark strong { display: block; font-size: 22px; letter-spacing: 0.25em; font-weight: 700; font-family: "Helvetica Neue", sans-serif; }
.dr-footer-mark em { display: block; font-size: 11px; letter-spacing: 0.4em; font-style: italic; color: var(--dr-fg-soft); margin-top: 4px; }
.dr-footer-tag { font-size: 13px; color: var(--dr-fg-soft); font-style: italic; margin: 16px 0 32px; }
.dr-footer-disclaimer { max-width: 700px; margin: 0 auto 24px; padding: 16px; background: rgba(212,80,106,0.08); border: 1px solid rgba(212,80,106,0.3); color: var(--dr-fg); font-size: 12px; line-height: 1.8; font-family: "Helvetica Neue", sans-serif; }
.dr-footer-disclaimer strong { color: var(--dr-pink); }
.dr-footer-cr { font-size: 11px; color: var(--dr-fg-soft); font-family: "Helvetica Neue", sans-serif; }

.dr-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--dr-pink); color: #fff; padding: 10px 16px; border-radius: 999px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(212,80,106,0.4); max-width: 260px; font-family: "Helvetica Neue", sans-serif; }
.dr-floating-warning-icon { background: #fff; color: var(--dr-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.dr-reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s cubic-bezier(.2,.7,.2,1), transform 1s cubic-bezier(.2,.7,.2,1); }
.dr-reveal.is-visible { opacity: 1; transform: translateY(0); }
@keyframes dr-rise { to { opacity: 1; transform: translateY(0); } }
`
