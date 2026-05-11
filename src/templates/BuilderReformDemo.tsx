import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS HOME RENOVATION — リフォーム・住宅専門
   ベージュ×グリーン / Before-Afterドラッグスライダー / 温かい
   ============================================================ */

function BeforeAfter({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement | null>(null)
  const drag = useRef(false)

  const move = (clientX: number) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const p = ((clientX - r.left) / r.width) * 100
    setPos(Math.max(2, Math.min(98, p)))
  }

  useEffect(() => {
    const up = () => { drag.current = false }
    const mv = (e: MouseEvent) => drag.current && move(e.clientX)
    const tmv = (e: TouchEvent) => drag.current && e.touches[0] && move(e.touches[0].clientX)
    window.addEventListener('mouseup', up)
    window.addEventListener('mousemove', mv)
    window.addEventListener('touchend', up)
    window.addEventListener('touchmove', tmv)
    return () => {
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mousemove', mv)
      window.removeEventListener('touchend', up)
      window.removeEventListener('touchmove', tmv)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="br-ba"
      onMouseDown={(e) => { drag.current = true; move(e.clientX) }}
      onTouchStart={(e) => { drag.current = true; if (e.touches[0]) move(e.touches[0].clientX) }}
    >
      <img src={`https://images.unsplash.com/${after}?auto=format&fit=crop&w=1600&q=80`} alt="" className="br-ba-img" />
      <div className="br-ba-clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={`https://images.unsplash.com/${before}?auto=format&fit=crop&w=1600&q=80`} alt="" className="br-ba-img" />
      </div>
      <div className="br-ba-handle" style={{ left: `${pos}%` }}>
        <div className="br-ba-handle-line"/>
        <div className="br-ba-handle-circle">
          <span>‹</span><span>›</span>
        </div>
      </div>
      <div className="br-ba-label br-ba-label-before">BEFORE</div>
      <div className="br-ba-label br-ba-label-after">AFTER</div>
      <div className="br-ba-caption">{label}<small>（架空の施工事例）</small></div>
    </div>
  )
}

export default function BuilderReformDemo() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.br-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="br-root">
      <style>{cssText}</style>

      <div className="br-warning">
        <div className="br-warning-row">
          <span className="br-warning-pill">SAMPLE</span>
          <span className="br-warning-text">⚠️ <b>POLARIS HOME RENOVATION</b> は<b className="br-warning-emph">実在しない仮想リフォーム会社</b>です。デザイン見本としてポラリスクリエイティブが作成。</span>
          <a href="#hp" className="br-warning-back">← 戻る</a>
        </div>
        <div className="br-warning-strip">⚠️ 注意：会社名・住所・電話・施工事例・お客様の声・価格はすべて<u>架空</u>です。</div>
      </div>

      <header className="br-header">
        <a href="#" className="br-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="br-logo-mark" aria-hidden>
            <path d="M6 22 L20 8 L34 22 V34 H6 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round"/>
            <path d="M16 34 V24 H24 V34" fill="none" stroke="currentColor" strokeWidth="2.4"/>
          </svg>
          <div className="br-logo-text">
            <strong>POLARIS HOME</strong>
            <span>ポラリス住まいの相談所（架空）</span>
          </div>
        </a>
        <nav className={`br-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#works" onClick={() => setMenuOpen(false)}>施工事例</a>
          <a href="#service" onClick={() => setMenuOpen(false)}>サービス</a>
          <a href="#flow" onClick={() => setMenuOpen(false)}>流れ</a>
          <a href="#voice" onClick={() => setMenuOpen(false)}>お客様の声</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>お問合せ</a>
        </nav>
        <button className="br-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="br-cta-btn">無料見積もり（仮）</a>
      </header>

      <section className="br-hero">
        <div className="br-hero-bg">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80" alt="" />
        </div>
        <div className="br-hero-badge">※ これは架空のデザイン見本です</div>
        <div className="br-hero-content">
          <div className="br-hero-tag">CASE 2026 · リフォーム実績<b>1,250件</b>（架空）</div>
          <h1 className="br-hero-title">
            <span>「住みなれた家を、</span>
            <span><em>もう少し、好きに。」</em></span>
          </h1>
          <p className="br-hero-sub">
            キッチン・浴室・全面リノベまで。<br/>
            地域密着<u>30年以上</u>（架空）の安心施工。
          </p>
          <div className="br-hero-btns">
            <a href="#works" className="br-btn br-btn-primary">施工事例を見る →</a>
            <a href="#contact" className="br-btn br-btn-ghost">無料相談する（仮）</a>
          </div>
          <div className="br-hero-trust">
            <div><strong>1,250+</strong><span>施工実績（架空）</span></div>
            <div><strong>30年</strong><span>地域密着（架空）</span></div>
            <div><strong>98%</strong><span>顧客満足度（架空）</span></div>
          </div>
        </div>
      </section>

      <section id="works" className="br-works">
        <div className="br-section-head br-reveal">
          <span className="br-eyebrow">▼ WORKS — 施工事例（架空）</span>
          <h2 className="br-h2">スライドで、変化を見る。</h2>
          <p>左右にドラッグして、ビフォー／アフターを比較してください。<br/><span className="br-fake">※ 画像はサンプル素材です。架空の施工事例。</span></p>
        </div>
        <div className="br-works-grid">
          <div className="br-reveal"><BeforeAfter before="photo-1556909114-44e3e9399a2e" after="photo-1556909114-f6e7ad7d3136" label="K様邸 / キッチン全面リフォーム"/></div>
          <div className="br-reveal"><BeforeAfter before="photo-1600566753190-17f0baa2a6c3" after="photo-1600210492493-0946911123ea" label="M様邸 / リビング・ダイニング刷新"/></div>
          <div className="br-reveal"><BeforeAfter before="photo-1620626011761-996317b8d101" after="photo-1552321554-5fefe8c9ef14" label="S様邸 / 浴室・洗面所リフォーム"/></div>
          <div className="br-reveal"><BeforeAfter before="photo-1600585154526-990dced4db0d" after="photo-1600607687939-ce8a6c25118c" label="T様邸 / 全面フルリノベーション"/></div>
        </div>
      </section>

      <section id="service" className="br-service">
        <div className="br-section-head br-reveal">
          <span className="br-eyebrow">▼ SERVICE — リフォーム内容（架空）</span>
          <h2 className="br-h2">小さな相談から、<br/>まるごと一棟まで。</h2>
        </div>
        <div className="br-service-grid">
          {[
            { i: '🍳', t: 'キッチン', p: '¥80万〜', d: '使いやすく、お手入れしやすく。家族が集まる場所を中心に。' },
            { i: '🛁', t: '浴室・洗面所', p: '¥60万〜', d: 'ヒートショック対策・バリアフリー化など、安全性も考慮。' },
            { i: '🚽', t: 'トイレ・水回り', p: '¥20万〜', d: '節水・節電タイプも対応。短期施工でご対応可能です。' },
            { i: '🪟', t: '内装・壁紙', p: '¥10万〜', d: 'クロス・床材の張替えだけでも雰囲気が一変します。' },
            { i: '🌿', t: '外壁・屋根', p: '¥100万〜', d: '防水・遮熱塗装で家の寿命を延ばす本格的な外装工事。' },
            { i: '🏠', t: 'フルリノベ', p: '¥800万〜', d: '間取り変更を伴う全面改修。耐震・断熱もまとめて。' },
          ].map((s) => (
            <div key={s.t} className="br-service-card br-reveal">
              <div className="br-service-icon">{s.i}</div>
              <h3>{s.t}<small>（架空）</small></h3>
              <p>{s.d}</p>
              <div className="br-service-price">{s.p}<small>※価格も架空</small></div>
            </div>
          ))}
        </div>
        <div className="br-fake-pill br-reveal">※ サービス内容・価格はすべて架空のサンプル表示です</div>
      </section>

      <section id="flow" className="br-flow">
        <div className="br-section-head br-reveal">
          <span className="br-eyebrow">▼ FLOW — ご相談の流れ（架空）</span>
          <h2 className="br-h2">ご相談から、完成まで。</h2>
        </div>
        <div className="br-flow-steps">
          {[
            { n: '01', t: 'お問い合わせ', d: 'お電話・WEBフォーム・LINEから（架空）' },
            { n: '02', t: '現地調査・お見積もり', d: '無料でご訪問・採寸・お見積（架空）' },
            { n: '03', t: 'プランご提案', d: '専属プランナーが最適なプランを提案（架空）' },
            { n: '04', t: '契約・着工', d: '工事スケジュールをご説明（架空）' },
            { n: '05', t: '完工・お引渡し', d: 'アフター保証10年（架空）' },
          ].map((s) => (
            <div key={s.n} className="br-flow-step br-reveal">
              <div className="br-flow-num">{s.n}</div>
              <h3>{s.t}<small>（架空）</small></h3>
              <p>{s.d}</p>
              <div className="br-flow-arrow">↓</div>
            </div>
          ))}
        </div>
      </section>

      <section id="voice" className="br-voice">
        <div className="br-section-head br-reveal">
          <span className="br-eyebrow">▼ VOICE — お客様の声（すべて架空）</span>
          <h2 className="br-h2">「相談してよかった」の声。</h2>
          <p className="br-fake-pill">※ 以下のコメント・お名前はすべて<b>架空のサンプル</b>です。</p>
        </div>
        <div className="br-voice-grid">
          {[
            { name: '架空のお客様 K様', loc: '東京都・府中市', q: 'キッチンが見違えるほど明るくなり、料理が楽しくなりました。担当の方の提案も的確で、本当にお願いしてよかったです。', stars: 5 },
            { name: '架空のお客様 M様', loc: '神奈川県・横浜市', q: '見積もりが明朗で、工期も予定通り。職人さんの挨拶や片付けも丁寧で、安心して任せられました。', stars: 5 },
            { name: '架空のお客様 S様', loc: '埼玉県・川越市', q: '浴室のバリアフリー化をお願いしました。母も毎日「お風呂が気持ちいい」と喜んでいます。', stars: 5 },
          ].map((v) => (
            <div key={v.name} className="br-voice-card br-reveal">
              <div className="br-voice-stars">{'★'.repeat(v.stars)}</div>
              <p className="br-voice-q">「{v.q}」</p>
              <div className="br-voice-meta">
                <strong>{v.name}</strong>
                <span>{v.loc}<small>（架空）</small></span>
              </div>
              <div className="br-voice-fake">※架空のレビュー</div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="br-cta">
        <div className="br-cta-inner br-reveal">
          <span className="br-eyebrow">▼ CONTACT</span>
          <h2 className="br-cta-h">まずは、お気軽にご相談を。</h2>
          <p>お見積もり・現地調査は<b>無料</b>です。<br/><span className="br-fake">※ 動作しません。仮想リフォーム会社のデザイン見本です。</span></p>
          <div className="br-cta-grid">
            <a href="#" className="br-cta-card br-cta-card-tel">
              <span>📞</span>
              <strong>0120-000-000<small>※架空</small></strong>
              <span>受付時間 9:00〜19:00（年中無休・架空）</span>
            </a>
            <a href="#" className="br-cta-card br-cta-card-line">
              <span>💬</span>
              <strong>LINEで相談（仮）</strong>
              <span>24時間受付・写真送信OK（架空）</span>
            </a>
            <a href="#" className="br-cta-card br-cta-card-form">
              <span>📝</span>
              <strong>WEBフォーム（仮）</strong>
              <span>翌営業日までにご返信（架空）</span>
            </a>
          </div>
          <dl className="br-cta-info">
            <div><dt>所在地（架空）</dt><dd>東京都〇〇市〇〇 0-0-0 ※実在しません</dd></div>
            <div><dt>営業時間（架空）</dt><dd>9:00〜19:00 / 年中無休</dd></div>
            <div><dt>対応エリア（架空）</dt><dd>東京・神奈川・埼玉・千葉</dd></div>
          </dl>
        </div>
      </section>

      <footer className="br-footer">
        <div className="br-footer-mark">
          <svg viewBox="0 0 40 40" className="br-footer-logo" aria-hidden>
            <path d="M6 22 L20 8 L34 22 V34 H6 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round"/>
            <path d="M16 34 V24 H24 V34" fill="none" stroke="currentColor" strokeWidth="2.4"/>
          </svg>
          <strong>POLARIS HOME RENOVATION（架空）</strong>
        </div>
        <p className="br-footer-tag">— 住まいに、もうひとつの「好き」を。 —</p>
        <div className="br-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS HOME RENOVATION」という<u>実在しない仮想リフォーム会社</u>のデザイン見本です。<br/>
          会社名・住所・電話・施工事例・お客様の声・価格はすべて<u>架空</u>です。
        </div>
        <p className="br-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="br-floating-warning">
        <span className="br-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想リフォーム会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.br-root {
  --br-bg: #faf7f1;
  --br-bg2: #f1ebe0;
  --br-fg: #3a2e1f;
  --br-green: #6b8e4e;
  --br-green-dark: #4a6a30;
  --br-accent: #c79b5e;
  --br-pink: #d4506a;
  background: var(--br-bg);
  color: var(--br-fg);
  font-family: "Hiragino Sans", "Noto Sans JP", sans-serif;
  min-height: 100vh;
}
.br-root *, .br-root *::before, .br-root *::after { box-sizing: border-box; }

.br-warning { position: sticky; top: 0; z-index: 50; background: #2d2418; color: #fff; border-bottom: 2px solid var(--br-pink); }
.br-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.br-warning-pill { background: var(--br-pink); color: #fff; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0; }
.br-warning-text { flex: 1; min-width: 0; }
.br-warning-emph { color: var(--br-pink); }
.br-warning-back { background: #fff; color: #2d2418; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.br-warning-strip { background: var(--br-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.br-header { position: sticky; top: 76px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 14px 28px; background: rgba(250,247,241,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(58,46,31,0.1); }
.br-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--br-fg); }
.br-logo-mark { width: 36px; height: 36px; color: var(--br-green); }
.br-logo-text strong { display: block; font-size: 15px; font-weight: 800; letter-spacing: 0.05em; }
.br-logo-text span { display: block; font-size: 10px; color: rgba(58,46,31,0.55); }
.br-nav { display: none; gap: 28px; margin-left: auto; }
.br-nav a { color: var(--br-fg); text-decoration: none; font-size: 13px; font-weight: 600; transition: color .2s; }
.br-nav a:hover { color: var(--br-green); }
.br-cta-btn { display: none; padding: 12px 22px; background: var(--br-green); color: #fff; font-weight: 700; font-size: 13px; text-decoration: none; border-radius: 999px; transition: all .25s; box-shadow: 0 4px 16px rgba(107,142,78,0.25); }
.br-cta-btn:hover { background: var(--br-green-dark); transform: translateY(-2px); }
.br-burger { margin-left: auto; background: none; border: 1px solid rgba(58,46,31,0.2); width: 38px; height: 38px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; cursor: pointer; border-radius: 8px; }
.br-burger span { display: block; width: 18px; height: 2px; background: var(--br-fg); transition: transform .25s; border-radius: 1px; }
.br-burger span.is-open:first-child { transform: translateY(3.5px) rotate(45deg); }
.br-burger span.is-open:last-child { transform: translateY(-3.5px) rotate(-45deg); }
@media (min-width: 900px) {
  .br-nav { display: flex; }
  .br-cta-btn { display: inline-flex; }
  .br-burger { display: none; }
}
.br-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--br-bg); padding: 24px; display: flex; border-bottom: 1px solid rgba(58,46,31,0.1); }

.br-hero { position: relative; min-height: 88vh; display: flex; align-items: center; padding: 64px 32px; overflow: hidden; }
.br-hero-bg { position: absolute; inset: 0; }
.br-hero-bg img { width: 100%; height: 100%; object-fit: cover; }
.br-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(250,247,241,0.97) 0%, rgba(250,247,241,0.85) 45%, rgba(250,247,241,0.3) 100%); }
.br-hero-badge { position: absolute; top: 28px; right: 28px; background: var(--br-pink); color: #fff; padding: 6px 14px; border-radius: 999px; font-size: 10px; font-weight: 800; z-index: 5; }
.br-hero-content { position: relative; z-index: 10; max-width: 720px; }
.br-hero-tag { display: inline-block; padding: 6px 14px; background: rgba(107,142,78,0.15); color: var(--br-green); border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 24px; }
.br-hero-tag b { color: var(--br-green-dark); }
.br-hero-title { font-size: clamp(36px, 6.5vw, 88px); font-weight: 700; line-height: 1.2; letter-spacing: 0.01em; margin: 0 0 28px; font-family: "Noto Serif JP", serif; }
.br-hero-title span { display: block; opacity: 0; transform: translateY(20px); animation: br-rise .9s ease forwards; }
.br-hero-title span:nth-child(2) { animation-delay: .2s; }
.br-hero-title em { font-style: normal; color: var(--br-green-dark); }
.br-hero-sub { font-size: clamp(15px, 1.6vw, 19px); line-height: 1.9; color: rgba(58,46,31,0.75); margin: 0 0 36px; }
.br-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
.br-btn { display: inline-flex; align-items: center; padding: 16px 28px; font-weight: 700; font-size: 14px; text-decoration: none; border-radius: 999px; transition: all .25s; }
.br-btn-primary { background: var(--br-green); color: #fff; box-shadow: 0 6px 24px rgba(107,142,78,0.3); }
.br-btn-primary:hover { background: var(--br-green-dark); transform: translateY(-2px); }
.br-btn-ghost { color: var(--br-fg); border: 2px solid var(--br-fg); }
.br-btn-ghost:hover { background: var(--br-fg); color: var(--br-bg); }
.br-hero-trust { display: flex; gap: 32px; padding-top: 24px; border-top: 1px solid rgba(58,46,31,0.15); flex-wrap: wrap; }
.br-hero-trust div strong { display: block; font-size: 28px; font-weight: 800; color: var(--br-green-dark); font-family: serif; }
.br-hero-trust div span { display: block; font-size: 11px; color: rgba(58,46,31,0.6); margin-top: 2px; }

.br-works, .br-service, .br-flow, .br-voice, .br-cta { padding: 100px 32px; }
.br-works { background: var(--br-bg); }
.br-service { background: var(--br-bg2); }
.br-flow { background: var(--br-bg); }
.br-voice { background: var(--br-bg2); }
.br-section-head { text-align: center; max-width: 720px; margin: 0 auto 64px; }
.br-eyebrow { display: inline-block; font-size: 12px; letter-spacing: 0.2em; color: var(--br-green); font-weight: 700; margin-bottom: 16px; }
.br-h2 { font-size: clamp(28px, 4.2vw, 52px); font-weight: 700; font-family: "Noto Serif JP", serif; line-height: 1.4; margin: 0 0 16px; }
.br-section-head p { font-size: 14px; color: rgba(58,46,31,0.7); line-height: 1.9; margin: 0; }
.br-fake { color: var(--br-pink); font-weight: 700; }
.br-fake-pill { display: inline-block; padding: 6px 18px; background: rgba(212,80,106,0.1); color: var(--br-pink); border: 1px solid rgba(212,80,106,0.3); border-radius: 999px; font-size: 12px; font-weight: 700; margin-top: 16px; }

.br-works-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 40px; max-width: 1280px; margin: 0 auto; }
@media (max-width: 600px) { .br-works-grid { grid-template-columns: 1fr; } }

.br-ba { position: relative; aspect-ratio: 4/3; border-radius: 16px; overflow: hidden; cursor: ew-resize; user-select: none; box-shadow: 0 20px 50px rgba(58,46,31,0.15); background: #ddd; }
.br-ba-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.br-ba-clip { position: absolute; inset: 0; }
.br-ba-handle { position: absolute; top: 0; bottom: 0; pointer-events: none; }
.br-ba-handle-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; background: #fff; transform: translateX(-50%); box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 0 20px rgba(0,0,0,0.3); }
.br-ba-handle-circle { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 48px; height: 48px; border-radius: 50%; background: #fff; border: 2px solid var(--br-green); display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: 0 6px 20px rgba(0,0,0,0.25); font-weight: 800; color: var(--br-green-dark); font-size: 22px; line-height: 1; }
.br-ba-label { position: absolute; top: 16px; padding: 4px 12px; background: rgba(0,0,0,0.65); color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; border-radius: 4px; }
.br-ba-label-before { left: 16px; }
.br-ba-label-after { right: 16px; background: var(--br-green); }
.br-ba-caption { position: absolute; left: 0; right: 0; bottom: 0; padding: 16px 20px; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); color: #fff; font-size: 14px; font-weight: 700; }
.br-ba-caption small { font-size: 10px; color: rgba(255,255,255,0.7); margin-left: 8px; font-weight: 400; }

.br-service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
.br-service-card { padding: 32px 28px; background: #fff; border-radius: 16px; transition: all .3s; border: 1px solid rgba(58,46,31,0.06); }
.br-service-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(58,46,31,0.1); }
.br-service-icon { font-size: 40px; margin-bottom: 12px; }
.br-service-card h3 { font-size: 20px; font-weight: 700; margin: 0 0 12px; font-family: "Noto Serif JP", serif; }
.br-service-card h3 small { font-size: 10px; color: var(--br-pink); font-weight: 600; margin-left: 6px; }
.br-service-card p { font-size: 13px; line-height: 1.8; color: rgba(58,46,31,0.7); margin: 0 0 16px; }
.br-service-price { font-size: 22px; font-weight: 800; color: var(--br-green-dark); font-family: serif; }
.br-service-price small { font-size: 10px; color: var(--br-pink); font-weight: 500; margin-left: 8px; display: block; margin-top: 2px; }

.br-flow-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; max-width: 1280px; margin: 0 auto; position: relative; }
.br-flow-step { padding: 28px 20px; background: #fff; border-radius: 16px; text-align: center; position: relative; border: 2px solid rgba(107,142,78,0.15); }
.br-flow-num { font-size: 48px; font-weight: 800; color: var(--br-green); font-family: serif; line-height: 1; margin-bottom: 12px; }
.br-flow-step h3 { font-size: 16px; font-weight: 700; margin: 0 0 8px; }
.br-flow-step h3 small { font-size: 10px; color: var(--br-pink); margin-left: 4px; font-weight: 500; }
.br-flow-step p { font-size: 12px; line-height: 1.7; color: rgba(58,46,31,0.6); margin: 0; }
.br-flow-arrow { display: none; }

.br-voice-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto; }
.br-voice-card { padding: 32px 28px; background: #fff; border-radius: 16px; position: relative; border: 1px solid rgba(58,46,31,0.06); }
.br-voice-stars { color: #d4a93a; letter-spacing: 0.1em; margin-bottom: 16px; font-size: 18px; }
.br-voice-q { font-size: 14px; line-height: 1.9; color: var(--br-fg); margin: 0 0 24px; font-family: "Noto Serif JP", serif; }
.br-voice-meta strong { display: block; font-size: 13px; font-weight: 700; }
.br-voice-meta span { display: block; font-size: 11px; color: rgba(58,46,31,0.6); margin-top: 2px; }
.br-voice-meta small { font-size: 9px; color: var(--br-pink); margin-left: 4px; }
.br-voice-fake { position: absolute; top: 12px; right: 12px; font-size: 9px; color: var(--br-pink); background: rgba(212,80,106,0.1); padding: 3px 8px; border-radius: 4px; font-weight: 700; }

.br-cta { background: linear-gradient(135deg, var(--br-green-dark) 0%, var(--br-green) 100%); color: #fff; text-align: center; }
.br-cta .br-eyebrow { color: rgba(255,255,255,0.85); }
.br-cta-h { font-size: clamp(32px, 5vw, 64px); font-family: "Noto Serif JP", serif; font-weight: 700; line-height: 1.3; margin: 0 0 16px; color: #fff; }
.br-cta p { font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin: 0 0 40px; }
.br-cta-inner { max-width: 1100px; margin: 0 auto; }
.br-cta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 48px; }
.br-cta-card { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 28px 20px; background: #fff; color: var(--br-fg); border-radius: 16px; text-decoration: none; transition: transform .25s; }
.br-cta-card:hover { transform: translateY(-4px); }
.br-cta-card > span:first-child { font-size: 36px; }
.br-cta-card strong { font-size: 20px; font-weight: 800; color: var(--br-green-dark); }
.br-cta-card strong small { font-size: 10px; color: var(--br-pink); margin-left: 4px; font-weight: 600; }
.br-cta-card > span:last-child { font-size: 11px; color: rgba(58,46,31,0.6); }
.br-cta-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.2); margin: 0; text-align: left; }
.br-cta-info dt { font-size: 11px; color: rgba(255,255,255,0.7); letter-spacing: 0.15em; margin-bottom: 6px; }
.br-cta-info dd { margin: 0; font-size: 14px; color: #fff; }

.br-footer { padding: 64px 32px 32px; background: #2d2418; color: #f1ebe0; text-align: center; }
.br-footer-mark { display: inline-flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.br-footer-logo { width: 32px; height: 32px; color: var(--br-accent); }
.br-footer-mark strong { font-size: 16px; font-weight: 800; }
.br-footer-tag { font-size: 13px; color: rgba(241,235,224,0.6); font-family: "Noto Serif JP", serif; margin: 0 0 28px; }
.br-footer-disclaimer { max-width: 700px; margin: 0 auto 24px; padding: 16px; background: rgba(212,80,106,0.15); border: 1px solid rgba(212,80,106,0.4); color: rgba(255,255,255,0.85); font-size: 12px; line-height: 1.8; }
.br-footer-disclaimer strong { color: var(--br-pink); }
.br-footer-cr { font-size: 11px; color: rgba(241,235,224,0.3); }

.br-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--br-pink); color: #fff; padding: 10px 16px; border-radius: 999px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(212,80,106,0.4); max-width: 260px; }
.br-floating-warning-icon { background: #fff; color: var(--br-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.br-reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.br-reveal.is-visible { opacity: 1; transform: translateY(0); }

@keyframes br-rise { to { opacity: 1; transform: translateY(0); } }
`
