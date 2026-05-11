import { useEffect, useRef, useState } from 'react'

/* ============================================================
   POLARIS SMART BUILD — ハイテック・スマート建設
   紺×シアン / BIM / Canvas粒子 / HUD / データバー
   ============================================================ */

export default function BuilderHitechDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // 粒子ネットワーク
  useEffect(() => {
    const c = canvasRef.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    const resize = () => {
      c.width = c.offsetWidth * 2
      c.height = c.offsetHeight * 2
      ctx.setTransform(2, 0, 0, 2, 0, 0)
    }
    resize(); window.addEventListener('resize', resize)
    const N = 90
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * c.offsetWidth,
      y: Math.random() * c.offsetHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))
    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, c.offsetWidth, c.offsetHeight)
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > c.offsetWidth) p.vx *= -1
        if (p.y < 0 || p.y > c.offsetHeight) p.vy *= -1
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 130) * 0.45})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      pts.forEach((p) => {
        ctx.fillStyle = 'rgba(34,211,238,0.85)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  // スクロールリベール
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add('is-visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.bh-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="bh-root">
      <style>{cssText}</style>

      <div className="bh-warning">
        <div className="bh-warning-row">
          <span className="bh-warning-pill">SAMPLE</span>
          <span className="bh-warning-text">⚠️ <b>POLARIS SMART BUILD</b> は<b className="bh-warning-emph">実在しない仮想スマート建設会社</b>です。ポラリスクリエイティブ作成のデザイン見本。</span>
          <a href="#hp" className="bh-warning-back">← 戻る</a>
        </div>
        <div className="bh-warning-strip">⚠️ 注意：会社名・住所・電話番号・施工事例・データはすべて<u>架空</u>です。</div>
      </div>

      <header className="bh-header">
        <a href="#" className="bh-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <svg viewBox="0 0 40 40" className="bh-logo-mark" aria-hidden>
            <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M8 20 L32 20 M20 8 L20 32" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="20" cy="20" r="3" fill="currentColor"/>
          </svg>
          <div className="bh-logo-text">
            <strong>POLARIS SMART BUILD</strong>
            <span>ポラリス・スマートビルド（架空）</span>
          </div>
        </a>
        <nav className={`bh-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#tech" onClick={() => setMenuOpen(false)}>TECHNOLOGY</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>PROJECTS</a>
          <a href="#data" onClick={() => setMenuOpen(false)}>DATA</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
        </nav>
        <button className="bh-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
        <a href="#contact" className="bh-cta-btn">GET QUOTE →</a>
      </header>

      <section className="bh-hero">
        <canvas ref={canvasRef} className="bh-canvas"/>
        <div className="bh-hero-grid-bg"/>
        <div className="bh-hero-badge">※ これは架空のデザイン見本です</div>

        <div className="bh-hero-content">
          <div className="bh-hero-tag">
            <span className="bh-tag-dot"/>SYSTEM ONLINE · BIM v.4.21 · 2026
          </div>
          <h1 className="bh-hero-title">
            <span className="bh-line-fade">Building</span>
            <span className="bh-line-gradient">the Future,</span>
            <span className="bh-line-fade">by Data.</span>
          </h1>
          <p className="bh-hero-sub">
            BIM・IoT・AIで、建設現場の<u>精度・速度・安全性</u>を再定義する。<br/>
            次世代スマートコンストラクション・カンパニー（架空）。
          </p>
          <div className="bh-hero-btns">
            <a href="#tech" className="bh-btn bh-btn-cyan">技術を見る →</a>
            <a href="#contact" className="bh-btn bh-btn-ghost">資料請求（仮）</a>
          </div>
        </div>

        <div className="bh-hud bh-hud-tl"><div className="bh-hud-label">SITE STATUS</div><div className="bh-hud-value bh-hud-on">● OPERATIONAL</div></div>
        <div className="bh-hud bh-hud-tr"><div className="bh-hud-label">PROJECTS ACTIVE</div><div className="bh-hud-value">24 / 30</div></div>
        <div className="bh-hud bh-hud-bl"><div className="bh-hud-label">LAT / LON</div><div className="bh-hud-value">35.67° N / 139.65° E</div></div>
        <div className="bh-hud bh-hud-br"><div className="bh-hud-label">UPTIME (ARCH)</div><div className="bh-hud-value">99.97%</div></div>
      </section>

      <section id="data" className="bh-data">
        {[
          { l: 'BIM MODELS', v: '1,840', s: '構築済モデル数' },
          { l: 'IOT SENSORS', v: '12,400', s: '稼働中センサー' },
          { l: 'AI PREDICTIONS', v: '47.2K', s: '日次予測実行' },
          { l: 'PROJECTS', v: '320+', s: '完了案件数' },
        ].map((d) => (
          <div key={d.l} className="bh-data-item bh-reveal">
            <div className="bh-data-l">{d.l}<small>（架空）</small></div>
            <div className="bh-data-v">{d.v}</div>
            <div className="bh-data-s">{d.s}</div>
            <div className="bh-data-bar"><div className="bh-data-bar-fill"/></div>
          </div>
        ))}
      </section>

      <section id="tech" className="bh-tech">
        <div className="bh-tech-head bh-reveal">
          <span className="bh-eye">[01] / TECHNOLOGY STACK</span>
          <h2 className="bh-h2">建設現場を、<br/><em>データ駆動に。</em></h2>
          <p className="bh-fake-pill">※ 技術内容はすべて架空のサンプル表示です</p>
        </div>
        <div className="bh-tech-grid">
          {[
            { code: 'BIM-01', t: 'BIM/CIM モデリング', d: '構造・設備・施工計画を統合した3Dモデルで、設計から維持管理まで一気通貫。', metric: '98.4%', metricL: '干渉検出率' },
            { code: 'IOT-02', t: 'IoT センサーネット', d: '温度・湿度・振動・人員配置をリアルタイム監視。安全管理と工程最適化に直結。', metric: '12.4K', metricL: '稼働センサー数' },
            { code: 'AI-03',  t: 'AI 工程予測',         d: '過去の施工データから工期・コストの精緻な予測。経営判断のリードタイムを短縮。', metric: '±2.8%', metricL: '工期予測誤差' },
            { code: 'DRN-04', t: 'ドローン測量',         d: '広域敷地のオルソ画像・点群データを高速取得。設計精度と検査効率を倍化。', metric: '15x',   metricL: '従来比 測量速度' },
          ].map((s) => (
            <div key={s.code} className="bh-tech-card bh-reveal">
              <div className="bh-tech-corner"/>
              <div className="bh-tech-code">{s.code}</div>
              <h3>{s.t}<small>（架空）</small></h3>
              <p>{s.d}</p>
              <div className="bh-tech-metric">
                <strong>{s.metric}</strong>
                <span>{s.metricL}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="bh-projects">
        <div className="bh-tech-head bh-reveal">
          <span className="bh-eye">[02] / SELECTED PROJECTS</span>
          <h2 className="bh-h2">スマート施工の、<br/><em>現場たち。</em></h2>
          <p className="bh-fake-pill">※ 施工事例はすべて架空のサンプル表示です</p>
        </div>
        <div className="bh-projects-list">
          {[
            { code: '#PRJ-2024-018', t: '中央データセンター建設（架空）', loc: '千葉県・印西', y: '2024', area: '48,200 ㎡', status: 'IN PROGRESS' },
            { code: '#PRJ-2024-011', t: '高層オフィスタワー（架空）',     loc: '東京都・港区', y: '2024', area: '92,400 ㎡', status: 'COMPLETED' },
            { code: '#PRJ-2023-042', t: '物流センターXL（架空）',         loc: '神奈川県・川崎', y: '2023', area: '64,800 ㎡', status: 'COMPLETED' },
            { code: '#PRJ-2023-029', t: '滑走路拡張工事（架空）',         loc: '北海道・千歳', y: '2023', area: '120,000 ㎡', status: 'COMPLETED' },
          ].map((p) => (
            <div key={p.code} className="bh-project bh-reveal">
              <div className="bh-project-l">
                <div className="bh-project-code">{p.code}</div>
                <h3>{p.t}</h3>
                <div className="bh-project-meta">
                  <span>{p.loc}</span><i/><span>{p.y}</span><i/><span>{p.area}</span>
                </div>
              </div>
              <div className={`bh-project-status ${p.status === 'IN PROGRESS' ? 'bh-status-active' : ''}`}>● {p.status}</div>
              <div className="bh-project-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bh-cta">
        <div className="bh-cta-bg"/>
        <div className="bh-cta-content bh-reveal">
          <div className="bh-cta-mono">[ 03 ] / GET STARTED</div>
          <h2 className="bh-cta-h">現場のデータを、<br/><em>明日の競争力に。</em></h2>
          <p>BIM導入支援・スマートコンストラクション設計・IoT現場可視化のご相談を承ります。<br/><span className="bh-fake">※ 動作しません。仮想スマート建設会社のデザイン見本です。</span></p>
          <div className="bh-hero-btns">
            <a href="#" className="bh-btn bh-btn-cyan">無料コンサル予約（仮）→</a>
            <a href="#" className="bh-btn bh-btn-ghost">技術資料DL（仮）</a>
          </div>
          <dl className="bh-cta-dl">
            <div><dt>HQ（架空）</dt><dd>東京都〇〇区〇〇 0-0-0</dd></div>
            <div><dt>TEL（架空）</dt><dd>03-0000-0000</dd></div>
            <div><dt>EMAIL（架空）</dt><dd>contact@polaris-smartbuild.example</dd></div>
          </dl>
        </div>
      </section>

      <footer className="bh-footer">
        <h2 className="bh-footer-mega">POLARIS / SMART BUILD</h2>
        <p className="bh-footer-tag">— Engineering the Future of Construction —</p>
        <div className="bh-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「POLARIS SMART BUILD」という<u>実在しない仮想スマート建設会社</u>のデザイン見本です。<br/>
          会社名・住所・電話・施工事例・データはすべて<u>架空</u>です。
        </div>
        <p className="bh-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="bh-floating-warning">
        <span className="bh-floating-warning-icon">!</span>
        <span>このサイトは架空の仮想スマート建設会社です</span>
      </div>
    </div>
  )
}

const cssText = `
.bh-root {
  --bh-bg: #050a18;
  --bh-bg2: #0b1530;
  --bh-fg: #e5e7eb;
  --bh-cyan: #22d3ee;
  --bh-cyan-soft: rgba(34,211,238,0.4);
  --bh-pink: #ec4899;
  background: var(--bh-bg);
  color: var(--bh-fg);
  font-family: "Inter", "Noto Sans JP", sans-serif;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}
.bh-root *, .bh-root *::before, .bh-root *::after { box-sizing: border-box; }

.bh-warning { position: sticky; top: 0; z-index: 50; background: #0a0a0a; color: #fff; border-bottom: 2px solid var(--bh-pink); }
.bh-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.bh-warning-pill { background: linear-gradient(90deg,#ec4899,#22d3ee); color: #fff; padding: 2px 10px; border-radius: 4px; font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0; }
.bh-warning-text { flex: 1; min-width: 0; }
.bh-warning-emph { color: var(--bh-pink); }
.bh-warning-back { background: #fff; color: #0a0a0a; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0; }
.bh-warning-strip { background: var(--bh-pink); color: #fff; text-align: center; padding: 6px 12px; font-size: 11px; font-weight: 700; }

.bh-header { position: sticky; top: 76px; z-index: 40; display: flex; align-items: center; gap: 24px; padding: 16px 32px; background: rgba(5,10,24,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(34,211,238,0.15); }
.bh-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--bh-fg); }
.bh-logo-mark { width: 32px; height: 32px; color: var(--bh-cyan); animation: bh-spin 12s linear infinite; }
.bh-logo-text strong { display: block; font-size: 14px; letter-spacing: 0.15em; font-weight: 800; }
.bh-logo-text span { display: block; font-size: 10px; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; }
.bh-nav { display: none; gap: 28px; margin-left: auto; }
.bh-nav a { color: var(--bh-fg); text-decoration: none; font-size: 12px; letter-spacing: 0.2em; font-weight: 600; opacity: 0.7; transition: opacity .2s; }
.bh-nav a:hover { opacity: 1; color: var(--bh-cyan); }
.bh-cta-btn { display: none; padding: 10px 18px; background: var(--bh-cyan); color: #050a18; font-weight: 800; font-size: 11px; letter-spacing: 0.15em; text-decoration: none; clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%); }
.bh-burger { margin-left: auto; background: none; border: 1px solid rgba(34,211,238,0.4); width: 38px; height: 38px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4px; cursor: pointer; }
.bh-burger span { display: block; width: 18px; height: 1.5px; background: var(--bh-cyan); transition: transform .25s; }
.bh-burger span.is-open:first-child { transform: translateY(3px) rotate(45deg); }
.bh-burger span.is-open:last-child { transform: translateY(-2.5px) rotate(-45deg); }
@media (min-width: 900px) {
  .bh-nav { display: flex; }
  .bh-cta-btn { display: inline-flex; }
  .bh-burger { display: none; }
}
.bh-nav.is-open { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--bh-bg2); padding: 24px; display: flex; border-bottom: 1px solid rgba(34,211,238,0.2); }

.bh-hero { position: relative; min-height: 90vh; display: flex; align-items: center; padding: 80px 32px; overflow: hidden; background: radial-gradient(ellipse at 30% 50%, #0b1530 0%, #050a18 70%); }
.bh-canvas { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.7; }
.bh-hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%); }
.bh-hero-badge { position: absolute; top: 24px; left: 50%; transform: translateX(-50%); background: var(--bh-pink); color: #fff; padding: 6px 16px; border-radius: 999px; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; z-index: 5; }
.bh-hero-content { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; text-align: center; }
.bh-hero-tag { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border: 1px solid rgba(34,211,238,0.5); border-radius: 999px; font-size: 10px; letter-spacing: 0.2em; color: var(--bh-cyan); margin-bottom: 28px; }
.bh-tag-dot { width: 6px; height: 6px; background: var(--bh-cyan); border-radius: 50%; animation: bh-pulse 1.6s ease-in-out infinite; }
.bh-hero-title { font-size: clamp(48px, 9vw, 128px); font-weight: 800; line-height: 0.95; letter-spacing: -0.03em; margin: 0 0 32px; font-family: "Inter", sans-serif; }
.bh-hero-title span { display: block; opacity: 0; transform: translateY(40px); animation: bh-rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
.bh-line-fade:nth-child(1) { animation-delay: .1s; }
.bh-line-gradient { background: linear-gradient(135deg, var(--bh-cyan), #6366f1); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation-delay: .25s !important; }
.bh-line-fade:nth-child(3) { animation-delay: .4s; }
.bh-hero-sub { font-size: clamp(14px, 1.5vw, 17px); line-height: 1.8; color: rgba(229,231,235,0.7); max-width: 640px; margin: 0 auto 40px; }
.bh-hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.bh-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-weight: 700; font-size: 13px; letter-spacing: 0.1em; text-decoration: none; transition: transform .2s; }
.bh-btn:hover { transform: translateY(-2px); }
.bh-btn-cyan { background: var(--bh-cyan); color: #050a18; clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%); padding-right: 36px; }
.bh-btn-ghost { color: var(--bh-fg); border: 1px solid rgba(229,231,235,0.3); }
.bh-btn-ghost:hover { border-color: var(--bh-cyan); color: var(--bh-cyan); }

.bh-hud { position: absolute; z-index: 10; font-family: "JetBrains Mono", "Courier New", monospace; font-size: 10px; padding: 8px 12px; background: rgba(11,21,48,0.6); border: 1px solid rgba(34,211,238,0.3); backdrop-filter: blur(8px); }
.bh-hud-label { color: rgba(34,211,238,0.6); letter-spacing: 0.15em; margin-bottom: 2px; }
.bh-hud-value { color: var(--bh-cyan); font-weight: 700; }
.bh-hud-on { color: #4ade80; }
.bh-hud-tl { top: 100px; left: 32px; } .bh-hud-tr { top: 100px; right: 32px; }
.bh-hud-bl { bottom: 32px; left: 32px; } .bh-hud-br { bottom: 32px; right: 32px; }
@media (max-width: 700px) { .bh-hud { font-size: 9px; padding: 6px 8px; } .bh-hud-tl, .bh-hud-tr { top: 90px; } }

.bh-data { padding: 60px 32px; background: var(--bh-bg2); border-top: 1px solid rgba(34,211,238,0.15); border-bottom: 1px solid rgba(34,211,238,0.15); display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0; }
.bh-data-item { padding: 24px 32px; border-right: 1px solid rgba(34,211,238,0.1); opacity: 0; transform: translateY(20px); transition: opacity .8s, transform .8s; }
.bh-data-item.is-visible { opacity: 1; transform: translateY(0); }
.bh-data-item:last-child { border-right: none; }
.bh-data-l { font-family: monospace; font-size: 10px; color: rgba(34,211,238,0.7); letter-spacing: 0.2em; margin-bottom: 8px; }
.bh-data-l small { font-size: 9px; color: var(--bh-pink); margin-left: 4px; }
.bh-data-v { font-size: clamp(32px, 4vw, 52px); font-weight: 800; color: var(--bh-cyan); letter-spacing: -0.02em; line-height: 1; }
.bh-data-s { font-size: 12px; color: rgba(229,231,235,0.5); margin-top: 4px; }
.bh-data-bar { height: 2px; background: rgba(34,211,238,0.15); margin-top: 16px; overflow: hidden; }
.bh-data-bar-fill { height: 100%; width: 0; background: var(--bh-cyan); transition: width 1.8s cubic-bezier(.2,.7,.2,1) .4s; }
.bh-data-item.is-visible .bh-data-bar-fill { width: 75%; }

.bh-tech, .bh-projects { padding: 120px 32px; }
.bh-tech-head { text-align: center; margin-bottom: 64px; opacity: 0; transform: translateY(30px); transition: opacity .8s, transform .8s; }
.bh-tech-head.is-visible { opacity: 1; transform: translateY(0); }
.bh-eye { display: inline-block; font-family: monospace; font-size: 11px; color: var(--bh-cyan); letter-spacing: 0.25em; margin-bottom: 16px; }
.bh-h2 { font-size: clamp(36px, 5vw, 72px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; margin: 0; }
.bh-h2 em { font-style: normal; background: linear-gradient(135deg, var(--bh-cyan), #6366f1); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.bh-fake-pill { display: inline-block; margin-top: 16px; padding: 4px 14px; background: rgba(236,72,153,0.15); color: var(--bh-pink); border: 1px solid rgba(236,72,153,0.4); border-radius: 4px; font-size: 11px; font-weight: 700; }

.bh-tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1280px; margin: 0 auto; }
.bh-tech-card { position: relative; padding: 32px 28px; background: rgba(11,21,48,0.6); border: 1px solid rgba(34,211,238,0.2); transition: all .4s; opacity: 0; transform: translateY(40px); }
.bh-tech-card.is-visible { opacity: 1; transform: translateY(0); }
.bh-tech-card:hover { border-color: var(--bh-cyan); background: rgba(34,211,238,0.05); transform: translateY(-4px); }
.bh-tech-corner { position: absolute; top: 0; right: 0; width: 24px; height: 24px; border-top: 2px solid var(--bh-cyan); border-right: 2px solid var(--bh-cyan); }
.bh-tech-code { font-family: monospace; font-size: 11px; color: var(--bh-cyan); letter-spacing: 0.2em; margin-bottom: 16px; }
.bh-tech-card h3 { font-size: 20px; font-weight: 700; margin: 0 0 12px; }
.bh-tech-card h3 small { font-size: 10px; color: var(--bh-pink); margin-left: 6px; font-weight: 600; }
.bh-tech-card p { font-size: 13px; line-height: 1.7; color: rgba(229,231,235,0.7); margin: 0 0 24px; }
.bh-tech-metric { display: flex; align-items: baseline; gap: 8px; padding-top: 16px; border-top: 1px solid rgba(34,211,238,0.15); }
.bh-tech-metric strong { font-size: 28px; color: var(--bh-cyan); font-weight: 800; }
.bh-tech-metric span { font-size: 11px; color: rgba(229,231,235,0.5); letter-spacing: 0.1em; }

.bh-projects-list { max-width: 1100px; margin: 0 auto; }
.bh-project { display: grid; grid-template-columns: 1fr auto auto; gap: 24px; align-items: center; padding: 28px 24px; border-bottom: 1px solid rgba(34,211,238,0.15); transition: all .3s; cursor: pointer; opacity: 0; transform: translateX(-30px); }
.bh-project.is-visible { opacity: 1; transform: translateX(0); }
.bh-project:hover { background: rgba(34,211,238,0.05); padding-left: 40px; }
.bh-project-code { font-family: monospace; font-size: 11px; color: var(--bh-cyan); letter-spacing: 0.15em; margin-bottom: 6px; }
.bh-project h3 { font-size: 20px; font-weight: 700; margin: 0 0 8px; }
.bh-project-meta { display: flex; gap: 8px; align-items: center; font-size: 12px; color: rgba(229,231,235,0.5); }
.bh-project-meta i { width: 3px; height: 3px; background: rgba(34,211,238,0.4); border-radius: 50%; display: inline-block; }
.bh-project-status { font-family: monospace; font-size: 10px; letter-spacing: 0.15em; color: rgba(229,231,235,0.6); }
.bh-status-active { color: #4ade80; animation: bh-pulse 1.4s ease-in-out infinite; }
.bh-project-arrow { font-size: 24px; color: rgba(34,211,238,0.4); transition: all .3s; }
.bh-project:hover .bh-project-arrow { color: var(--bh-cyan); transform: translateX(6px); }

.bh-cta { position: relative; padding: 120px 32px; overflow: hidden; background: linear-gradient(135deg, var(--bh-bg2) 0%, #1a103a 100%); }
.bh-cta-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.6; }
.bh-cta-content { position: relative; max-width: 800px; margin: 0 auto; text-align: center; opacity: 0; transform: translateY(30px); transition: opacity .8s, transform .8s; }
.bh-cta-content.is-visible { opacity: 1; transform: translateY(0); }
.bh-cta-mono { font-family: monospace; font-size: 11px; color: var(--bh-cyan); letter-spacing: 0.25em; margin-bottom: 16px; }
.bh-cta-h { font-size: clamp(40px, 6vw, 88px); font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; margin: 0 0 24px; }
.bh-cta-h em { font-style: normal; background: linear-gradient(135deg, var(--bh-cyan), var(--bh-pink)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.bh-cta p { font-size: 15px; line-height: 1.8; color: rgba(229,231,235,0.7); margin: 0 0 36px; }
.bh-fake { color: var(--bh-pink); font-size: 12px; }
.bh-cta-dl { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin: 48px 0 0; padding-top: 32px; border-top: 1px solid rgba(34,211,238,0.2); text-align: left; }
.bh-cta-dl dt { font-family: monospace; font-size: 10px; color: var(--bh-cyan); letter-spacing: 0.2em; margin-bottom: 6px; }
.bh-cta-dl dd { margin: 0; font-size: 14px; color: rgba(229,231,235,0.8); }

.bh-footer { padding: 80px 32px 40px; background: #030610; text-align: center; }
.bh-footer-mega { font-size: clamp(40px, 9vw, 140px); font-weight: 900; letter-spacing: -0.04em; margin: 0; background: linear-gradient(135deg, var(--bh-cyan), #6366f1 50%, var(--bh-pink)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.bh-footer-tag { font-family: monospace; font-size: 12px; color: rgba(34,211,238,0.6); letter-spacing: 0.2em; margin: 8px 0 32px; }
.bh-footer-disclaimer { max-width: 700px; margin: 0 auto 32px; padding: 16px; background: rgba(236,72,153,0.1); border: 1px solid rgba(236,72,153,0.4); color: rgba(229,231,235,0.8); font-size: 12px; line-height: 1.8; }
.bh-footer-disclaimer strong { color: var(--bh-pink); }
.bh-footer-cr { font-size: 11px; color: rgba(229,231,235,0.3); }

.bh-floating-warning { position: fixed; bottom: 20px; left: 20px; z-index: 100; background: var(--bh-pink); color: #fff; padding: 10px 16px; border-radius: 999px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 30px rgba(236,72,153,0.5); max-width: 260px; }
.bh-floating-warning-icon { background: #fff; color: var(--bh-pink); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; flex-shrink: 0; }

.bh-reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.bh-reveal.is-visible { opacity: 1; transform: translateY(0); }

@keyframes bh-rise { to { opacity: 1; transform: translateY(0); } }
@keyframes bh-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes bh-spin { to { transform: rotate(360deg); } }
`
