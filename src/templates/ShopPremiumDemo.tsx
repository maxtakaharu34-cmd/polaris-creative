import { useEffect, useState } from 'react'

/* ============================================================
   AURORA STORE — ECサイトテンプレート
   技術: CSS Grid マサンリー風レイアウト
        + 商品カードのホバー画像クロスフェード
        + フィルターチップ（カテゴリー絞り込み）
        + 価格レンジスライダー（仮）
        + IntersectionObserver で順次出現
   テイスト: モダン洗練・北欧ライフスタイル系
   ============================================================ */

const IMG = {
  hero1: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=85',
  p1a: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=85',
  p1b: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
  p2a: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=85',
  p2b: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=900&q=85',
  p3a: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=900&q=85',
  p3b: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
  p4a: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
  p4b: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=85',
  p5a: 'https://images.unsplash.com/photo-1531973486364-5fa64260d75b?auto=format&fit=crop&w=900&q=85',
  p5b: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=85',
  p6a: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=900&q=85',
  p6b: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
  p7a: 'https://images.unsplash.com/photo-1542219550-37153d387c27?auto=format&fit=crop&w=900&q=85',
  p7b: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=85',
  p8a: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85',
  p8b: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=900&q=85',
  story: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=85',
}

const PRODUCTS = [
  { id: 1, name: 'Linen Cushion Cover', cat: 'living', price: 4800, a: IMG.p1a, b: IMG.p1b, badge: 'NEW' },
  { id: 2, name: 'Ceramic Vase Set', cat: 'living', price: 7200, a: IMG.p2a, b: IMG.p2b, badge: '' },
  { id: 3, name: 'Oak Dining Chair', cat: 'furniture', price: 38000, a: IMG.p3a, b: IMG.p3b, badge: 'BEST' },
  { id: 4, name: 'Wool Throw Blanket', cat: 'living', price: 12800, a: IMG.p4a, b: IMG.p4b, badge: '' },
  { id: 5, name: 'Stoneware Mug', cat: 'kitchen', price: 2400, a: IMG.p5a, b: IMG.p5b, badge: '' },
  { id: 6, name: 'Brass Pendant Lamp', cat: 'lighting', price: 18900, a: IMG.p6a, b: IMG.p6b, badge: 'NEW' },
  { id: 7, name: 'Linen Apron', cat: 'kitchen', price: 5600, a: IMG.p7a, b: IMG.p7b, badge: '' },
  { id: 8, name: 'Wooden Tray', cat: 'kitchen', price: 6800, a: IMG.p8a, b: IMG.p8b, badge: 'BEST' },
]

const CATS = [
  { id: 'all', label: 'すべて' },
  { id: 'living', label: 'リビング' },
  { id: 'furniture', label: '家具' },
  { id: 'kitchen', label: 'キッチン' },
  { id: 'lighting', label: '照明' },
]

export default function ShopPremiumDemo() {
  const [cat, setCat] = useState('all')
  const [cart, setCart] = useState(2)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    document.querySelectorAll('.sh-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat)

  return (
    <div className="sh-root">
      <style>{cssText}</style>

      {/* 警告 */}
      <div className="sh-warning">
        <div className="sh-warning-row">
          <span className="sh-warning-pill">SAMPLE</span>
          <span className="sh-warning-text">
            ⚠️ <b>AURORA STORE</b> は<b className="sh-warning-emph">実在しない仮想ECサイト</b>です。
            デザイン見本としてポラリスクリエイティブが作成しました。
          </span>
          <a href="#hp" className="sh-warning-back">← 戻る</a>
        </div>
        <div className="sh-warning-strip">
          ⚠️ 注意：店舗名・商品名・価格・お客様の声などはすべて<u>架空</u>です。決済機能はありません。
        </div>
      </div>

      {/* Header */}
      <header className="sh-header">
        <a href="#" className="sh-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span>AURORA</span>
          <small>STORE（架空）</small>
        </a>
        <nav className={`sh-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#shop" onClick={() => setMenuOpen(false)}>SHOP</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>STORY</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>JOURNAL</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
        </nav>
        <div className="sh-actions">
          <button className="sh-icon-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <button className="sh-icon-btn" aria-label="Account">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>
          </button>
          <button className="sh-icon-btn sh-cart-btn" aria-label="Cart" onClick={() => setCart((v) => v + 1)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l3 13h12l2-9H6"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
            {cart > 0 && <span className="sh-cart-badge">{cart}</span>}
          </button>
        </div>
        <button className="sh-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span className={menuOpen ? 'is-open' : ''}/>
          <span className={menuOpen ? 'is-open' : ''}/>
        </button>
      </header>

      {/* Hero */}
      <section className="sh-hero">
        <div className="sh-hero-img" style={{ backgroundImage: `url("${IMG.hero1}")` }}>
          <div className="sh-hero-overlay"/>
          <div className="sh-img-stamp">SAMPLE</div>
        </div>
        <div className="sh-hero-content">
          <span className="sh-hero-eyebrow">— Spring Collection 2025 —</span>
          <h1 className="sh-hero-title">
            日々を、<br/>
            <em>すこし豊かに。</em>
          </h1>
          <p className="sh-hero-sub">
            北欧と日本の美意識を組み合わせた、暮らしの道具たち。<br/>
            職人の手仕事と、毎日使える機能美を、お届けします。<br/>
            <span className="sh-fake">※ 架空ECサイトのデザイン見本です。</span>
          </p>
          <div className="sh-hero-cta">
            <a href="#shop" className="sh-btn sh-btn-fill">SHOP NOW（仮）</a>
            <a href="#story" className="sh-btn sh-btn-ghost">STORY →</a>
          </div>
          <div className="sh-hero-meta">
            <div><strong>120+</strong><span>(架空) 取扱商品</span></div>
            <div><strong>送料無料</strong><span>(架空) ¥10,000以上</span></div>
            <div><strong>翌日発送</strong><span>(架空) 全国対応</span></div>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="sh-shop">
        <div className="sh-shop-head sh-reveal">
          <div>
            <span className="sh-eyebrow">— Shop —</span>
            <h2 className="sh-h2">商品一覧</h2>
            <p className="sh-fake-pill">※ 商品・価格はすべて架空のサンプル表示です</p>
          </div>
          <div className="sh-shop-meta">
            <span>{filtered.length} アイテム</span>
            <select className="sh-sort">
              <option>おすすめ順</option>
              <option>新着順</option>
              <option>価格が安い順</option>
              <option>価格が高い順</option>
            </select>
          </div>
        </div>

        <div className="sh-filters sh-reveal">
          {CATS.map((c) => (
            <button
              key={c.id}
              className={`sh-chip ${cat === c.id ? 'is-active' : ''}`}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="sh-grid">
          {filtered.map((p) => (
            <article key={p.id} className="sh-card sh-reveal">
              <div className="sh-card-imgs">
                <div className="sh-card-img sh-card-img-a" style={{ backgroundImage: `url("${p.a}")` }}/>
                <div className="sh-card-img sh-card-img-b" style={{ backgroundImage: `url("${p.b}")` }}/>
                {p.badge && <span className={`sh-card-badge sh-badge-${p.badge.toLowerCase()}`}>{p.badge}</span>}
                <span className="sh-card-stamp">SAMPLE</span>
                <button className="sh-card-fav" aria-label="Favorite">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-4.5-9-9.5A5 5 0 0 1 12 6a5 5 0 0 1 9 5.5C19 16.5 12 21 12 21Z"/></svg>
                </button>
              </div>
              <div className="sh-card-info">
                <p className="sh-card-cat">{CATS.find((c) => c.id === p.cat)?.label}</p>
                <h3>{p.name}<small>（架空）</small></h3>
                <p className="sh-card-price">¥{p.price.toLocaleString()}<small>（架空）</small></p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="sh-story">
        <div className="sh-story-img sh-reveal" style={{ backgroundImage: `url("${IMG.story}")` }}>
          <div className="sh-img-stamp">SAMPLE</div>
        </div>
        <div className="sh-story-text sh-reveal">
          <span className="sh-eyebrow">— Story —</span>
          <h2 className="sh-h2">
            毎日に、<br/>
            <em>静かな美しさを。</em>
          </h2>
          <p className="sh-story-body">
            AURORA STORE は、日本各地の職人と、北欧のデザイナーをつなぐ<br/>
            ライフスタイルブランド（架空）です。<br/>
            素材の質感、手仕事の温かさ、そして長く使える機能性。<br/>
            日々の暮らしに、ささやかな喜びをお届けします。<br/>
            <span className="sh-fake">※ 上記は架空のブランドストーリーです。</span>
          </p>
          <a href="#" className="sh-link-arrow">詳しく見る →</a>
        </div>
      </section>

      {/* Newsletter */}
      <section id="contact" className="sh-news">
        <div className="sh-news-content sh-reveal">
          <h2 className="sh-news-h">NEWSLETTER</h2>
          <p>新作・セール情報を、月に2回お届けします（架空）。</p>
          <form className="sh-news-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="メールアドレス（仮）" />
            <button type="submit">登録する（仮）</button>
          </form>
          <p className="sh-fake">※ フォームは動作しません。架空のデザイン見本です。</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="sh-footer">
        <div className="sh-footer-grid">
          <div>
            <p className="sh-footer-logo">AURORA STORE</p>
            <p className="sh-footer-addr">
              〒000-0000 東京都〇〇区〇〇 0-0-0（架空）<br/>
              TEL: 03-0000-0000（架空）
            </p>
          </div>
          <div>
            <h4>SHOP</h4>
            <ul>
              <li><a href="#">新着商品</a></li>
              <li><a href="#">人気ランキング</a></li>
              <li><a href="#">セール</a></li>
            </ul>
          </div>
          <div>
            <h4>ABOUT</h4>
            <ul>
              <li><a href="#">ストーリー</a></li>
              <li><a href="#">ジャーナル</a></li>
              <li><a href="#">採用情報</a></li>
            </ul>
          </div>
          <div>
            <h4>HELP</h4>
            <ul>
              <li><a href="#">配送について</a></li>
              <li><a href="#">返品・交換</a></li>
              <li><a href="#">よくある質問</a></li>
            </ul>
          </div>
        </div>
        <p className="sh-footer-disclaimer">
          <strong>【重要】</strong> このサイトは「AURORA STORE」という<u>実在しない仮想ECサイト</u>のデザイン見本です。
          商品・価格・お客様の声などはすべて<u>架空</u>です。決済機能はありません。
        </p>
        <p className="sh-footer-cr">© POLARIS CREATIVE Inc.（架空デザイン見本）</p>
      </footer>

      <div className="sh-floating-warning">
        <span className="sh-floating-warning-icon">!</span>
        <span>このサイトは架空のECサイトです</span>
      </div>
    </div>
  )
}

const cssText = `
.sh-root {
  --sh-bg: #faf8f5;
  --sh-fg: #1a1a1a;
  --sh-fg-soft: rgba(26,26,26,0.6);
  --sh-line: #e5e1d8;
  --sh-accent: #8b7355;
  --sh-accent-dark: #5a4a35;
  --sh-warn-pink: #ec4899;
  background: var(--sh-bg);
  color: var(--sh-fg);
  font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
  position: relative;
}
.sh-root *, .sh-root *::before, .sh-root *::after { box-sizing: border-box; }

/* Warning */
.sh-warning {
  position: sticky; top: 0; z-index: 50;
  background: #1a1a1a; color: #fff;
  border-bottom: 2px solid var(--sh-warn-pink);
}
.sh-warning-row { display: flex; align-items: center; gap: 12px; padding: 10px 16px; font-size: 12px; }
.sh-warning-pill {
  background: linear-gradient(90deg, #ec4899, #06b6d4);
  color: #fff; padding: 2px 10px; border-radius: 4px;
  font-weight: 800; font-size: 10px; letter-spacing: 1px; flex-shrink: 0;
}
.sh-warning-text { flex: 1; min-width: 0; }
.sh-warning-emph { color: var(--sh-warn-pink); }
.sh-warning-back {
  background: #fff; color: #1a1a1a; padding: 4px 12px; border-radius: 4px;
  font-weight: 700; font-size: 12px; text-decoration: none; flex-shrink: 0;
}
.sh-warning-back:hover { background: var(--sh-warn-pink); color: #fff; }
.sh-warning-strip {
  background: var(--sh-warn-pink); color: #fff; text-align: center;
  padding: 6px 12px; font-size: 11px; font-weight: 700;
}

/* Header */
.sh-header {
  position: sticky; top: 76px; z-index: 40;
  display: flex; align-items: center; gap: 24px;
  padding: 18px 40px;
  background: rgba(250,248,245,0.94);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--sh-line);
}
.sh-logo {
  display: flex; flex-direction: column; text-decoration: none; color: var(--sh-fg);
}
.sh-logo span {
  font-family: "Inter", sans-serif; font-size: 18px; font-weight: 700;
  letter-spacing: 0.25em; line-height: 1;
}
.sh-logo small {
  font-size: 9px; color: var(--sh-fg-soft); margin-top: 4px; letter-spacing: 0.1em;
}
.sh-nav {
  display: flex; gap: 32px; margin: 0 auto;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 600;
  letter-spacing: 0.15em;
}
.sh-nav a {
  color: var(--sh-fg); text-decoration: none; padding: 6px 0;
  border-bottom: 1px solid transparent;
}
.sh-nav a:hover { border-bottom-color: var(--sh-fg); }

.sh-actions { display: flex; gap: 8px; align-items: center; }
.sh-icon-btn {
  position: relative;
  width: 40px; height: 40px; border-radius: 50%;
  background: transparent; border: 1px solid var(--sh-line);
  color: var(--sh-fg); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  transition: all .2s;
}
.sh-icon-btn:hover { background: var(--sh-fg); color: #fff; border-color: var(--sh-fg); }
.sh-cart-badge {
  position: absolute; top: -2px; right: -2px;
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--sh-accent); color: #fff;
  font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}

.sh-burger {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: 0; padding: 8px; cursor: pointer;
}
.sh-burger span {
  width: 22px; height: 1.5px; background: var(--sh-fg); transition: all .3s;
}
.sh-burger span.is-open:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
.sh-burger span.is-open:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }

/* Hero */
.sh-hero {
  display: grid; grid-template-columns: 1.1fr 1fr;
  min-height: 80vh; align-items: stretch;
}
.sh-hero-img {
  position: relative; background-size: cover; background-position: center;
}
.sh-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0)); }
.sh-img-stamp {
  position: absolute; top: 16px; right: 16px;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 800;
  padding: 4px 10px; border-radius: 2px; letter-spacing: 0.2em;
}
.sh-hero-content {
  padding: 80px 64px; display: flex; flex-direction: column; justify-content: center;
}
.sh-hero-eyebrow {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em;
  color: var(--sh-accent); font-weight: 600;
  margin-bottom: 24px;
}
.sh-hero-title {
  font-family: "Noto Serif JP", serif; font-weight: 300;
  font-size: clamp(48px, 6vw, 92px); line-height: 1.15;
  margin: 0 0 24px; letter-spacing: -0.01em;
}
.sh-hero-title em {
  font-style: italic; font-weight: 400; color: var(--sh-accent);
}
.sh-hero-sub { font-size: 14px; line-height: 2; color: var(--sh-fg-soft); margin: 0 0 32px; max-width: 480px; }
.sh-fake { font-size: 11px; color: var(--sh-warn-pink); font-weight: 600; }
.sh-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }

.sh-hero-meta {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 20px; padding-top: 32px; border-top: 1px solid var(--sh-line);
  max-width: 480px;
}
.sh-hero-meta div {
  display: flex; flex-direction: column; gap: 4px;
}
.sh-hero-meta strong {
  font-family: "Inter", sans-serif; font-size: 14px; font-weight: 700;
  letter-spacing: 0.05em;
}
.sh-hero-meta span { font-size: 10px; color: var(--sh-fg-soft); }

/* Buttons */
.sh-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border: 1px solid var(--sh-fg);
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 600;
  letter-spacing: 0.2em; text-decoration: none;
  text-transform: uppercase; cursor: pointer;
  transition: all .25s ease;
}
.sh-btn-fill { background: var(--sh-fg); color: #fff; }
.sh-btn-fill:hover { background: var(--sh-accent); border-color: var(--sh-accent); }
.sh-btn-ghost { background: transparent; color: var(--sh-fg); }
.sh-btn-ghost:hover { background: var(--sh-fg); color: #fff; }

/* Common */
.sh-eyebrow {
  font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 0.2em;
  color: var(--sh-accent); font-weight: 600;
}
.sh-h2 {
  font-family: "Noto Serif JP", serif; font-weight: 300;
  font-size: clamp(36px, 5vw, 64px); line-height: 1.3;
  margin: 12px 0 16px; letter-spacing: -0.01em;
}
.sh-h2 em { font-style: italic; color: var(--sh-accent); }
.sh-fake-pill {
  display: inline-block; padding: 4px 12px;
  background: rgba(236,72,153,0.08); border: 1px solid rgba(236,72,153,0.25);
  color: var(--sh-warn-pink); border-radius: 999px;
  font-size: 10px; font-weight: 700; margin: 8px 0 0;
}

/* Reveal */
.sh-reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
.sh-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* Shop */
.sh-shop { padding: 120px 40px; max-width: 1400px; margin: 0 auto; }
.sh-shop-head {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 24px; margin-bottom: 32px; flex-wrap: wrap;
}
.sh-shop-meta { display: flex; align-items: center; gap: 16px; font-size: 12px; color: var(--sh-fg-soft); }
.sh-sort {
  background: transparent; border: 1px solid var(--sh-line);
  padding: 8px 14px; font-family: inherit; font-size: 12px;
  cursor: pointer;
}

.sh-filters {
  display: flex; gap: 8px; flex-wrap: wrap;
  margin-bottom: 48px;
  padding-bottom: 24px; border-bottom: 1px solid var(--sh-line);
}
.sh-chip {
  background: transparent; border: 1px solid var(--sh-line);
  padding: 8px 18px; border-radius: 999px;
  font-family: inherit; font-size: 12px; font-weight: 600;
  letter-spacing: 0.05em; color: var(--sh-fg);
  cursor: pointer; transition: all .2s;
}
.sh-chip:hover { background: var(--sh-bg); border-color: var(--sh-fg); }
.sh-chip.is-active { background: var(--sh-fg); color: #fff; border-color: var(--sh-fg); }

.sh-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px 24px;
}
.sh-card { cursor: pointer; }
.sh-card-imgs {
  position: relative; aspect-ratio: 4/5; margin-bottom: 16px;
  overflow: hidden; background: var(--sh-line);
}
.sh-card-img {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  transition: opacity .5s ease, transform .8s ease;
}
.sh-card-img-b { opacity: 0; }
.sh-card:hover .sh-card-img-a { opacity: 0; transform: scale(1.05); }
.sh-card:hover .sh-card-img-b { opacity: 1; transform: scale(1.05); }
.sh-card-badge {
  position: absolute; top: 12px; left: 12px;
  font-family: "Inter", sans-serif; font-size: 10px; font-weight: 700;
  letter-spacing: 0.15em; padding: 4px 10px;
}
.sh-badge-new { background: var(--sh-fg); color: #fff; }
.sh-badge-best { background: var(--sh-accent); color: #fff; }
.sh-card-stamp {
  position: absolute; top: 12px; right: 12px;
  background: rgba(0,0,0,0.7); color: #fff;
  font-family: "Inter", sans-serif; font-size: 9px; font-weight: 800;
  padding: 3px 8px; border-radius: 2px; letter-spacing: 0.2em;
}
.sh-card-fav {
  position: absolute; bottom: 12px; right: 12px;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,0.92); border: 0;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; opacity: 0; transition: opacity .25s, color .2s;
}
.sh-card:hover .sh-card-fav { opacity: 1; }
.sh-card-fav:hover { color: var(--sh-accent); }

.sh-card-info { padding: 0 4px; }
.sh-card-cat {
  font-family: "Inter", sans-serif; font-size: 10px;
  letter-spacing: 0.15em; color: var(--sh-fg-soft);
  text-transform: uppercase; margin: 0 0 4px;
}
.sh-card-info h3 {
  font-family: "Noto Serif JP", serif; font-size: 15px; font-weight: 500;
  margin: 0 0 6px;
}
.sh-card-info h3 small { font-size: 10px; color: var(--sh-warn-pink); font-weight: 600; }
.sh-card-price {
  font-family: "Inter", sans-serif; font-size: 14px; font-weight: 600;
  margin: 0;
}
.sh-card-price small { font-size: 10px; color: var(--sh-warn-pink); font-weight: 500; margin-left: 4px; }

/* Story */
.sh-story {
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center; gap: 80px;
  padding: 120px 64px; max-width: 1400px; margin: 0 auto;
}
.sh-story-img {
  position: relative; aspect-ratio: 4/5;
  background-size: cover; background-position: center;
}
.sh-story-text {}
.sh-story-body { font-size: 14px; line-height: 2; color: var(--sh-fg-soft); margin: 24px 0 32px; }
.sh-link-arrow {
  display: inline-block;
  font-family: "Inter", sans-serif; font-size: 13px; font-weight: 600;
  letter-spacing: 0.05em; color: var(--sh-fg); text-decoration: none;
  border-bottom: 1px solid var(--sh-fg); padding-bottom: 4px;
  transition: all .2s;
}
.sh-link-arrow:hover { color: var(--sh-accent); border-color: var(--sh-accent); padding-left: 8px; }

/* Newsletter */
.sh-news {
  padding: 100px 32px;
  background: var(--sh-fg); color: #fff;
  text-align: center;
}
.sh-news-content { max-width: 600px; margin: 0 auto; }
.sh-news-h {
  font-family: "Inter", sans-serif; font-weight: 300;
  font-size: clamp(36px, 5vw, 56px); letter-spacing: 0.15em;
  margin: 0 0 16px;
}
.sh-news-content > p { color: rgba(255,255,255,0.7); font-size: 14px; margin: 0 0 32px; }
.sh-news-form {
  display: flex; gap: 0; max-width: 480px; margin: 0 auto;
  border: 1px solid rgba(255,255,255,0.3);
}
.sh-news-form input {
  flex: 1; padding: 16px 20px;
  background: transparent; border: 0;
  color: #fff; font: inherit; font-size: 13px;
  outline: 0;
}
.sh-news-form input::placeholder { color: rgba(255,255,255,0.4); }
.sh-news-form button {
  background: #fff; color: var(--sh-fg);
  border: 0; padding: 16px 28px;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.2em; cursor: pointer; text-transform: uppercase;
}
.sh-news-form button:hover { background: var(--sh-accent); color: #fff; }
.sh-news .sh-fake { display: block; margin-top: 16px; font-size: 11px; color: rgba(236,72,153,0.9); }

/* Footer */
.sh-footer {
  padding: 80px 40px 40px;
  background: #f0ece3; color: var(--sh-fg);
  border-top: 1px solid var(--sh-line);
}
.sh-footer-grid {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px; max-width: 1400px; margin: 0 auto 40px;
}
.sh-footer-logo {
  font-family: "Inter", sans-serif; font-size: 20px; font-weight: 700;
  letter-spacing: 0.25em; margin: 0 0 16px;
}
.sh-footer-addr {
  font-size: 12px; line-height: 1.9; color: var(--sh-fg-soft); margin: 0;
}
.sh-footer h4 {
  font-family: "Inter", sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.2em; margin: 0 0 16px;
}
.sh-footer ul { list-style: none; padding: 0; margin: 0; }
.sh-footer ul li { margin-bottom: 8px; }
.sh-footer ul a { color: var(--sh-fg-soft); font-size: 13px; text-decoration: none; }
.sh-footer ul a:hover { color: var(--sh-fg); }
.sh-footer-disclaimer {
  max-width: 1400px; margin: 0 auto 16px;
  font-size: 12px; line-height: 1.7;
  background: rgba(236,72,153,0.08); border: 1px solid rgba(236,72,153,0.25);
  padding: 14px 20px; border-radius: 4px;
}
.sh-footer-disclaimer strong { color: var(--sh-warn-pink); }
.sh-footer-cr {
  text-align: center; font-size: 11px; color: var(--sh-fg-soft); margin: 0;
}

/* Floating warning */
.sh-floating-warning {
  position: fixed; bottom: 20px; left: 20px; z-index: 60;
  background: var(--sh-warn-pink); color: #fff;
  font-size: 11px; font-weight: 700;
  padding: 8px 14px; border-radius: 999px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 12px 32px rgba(236,72,153,0.4);
}
.sh-floating-warning-icon {
  background: #fff; color: var(--sh-warn-pink);
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 12px;
}

@media (max-width: 1024px) {
  .sh-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .sh-header { padding: 14px 16px; gap: 12px; top: 76px; }
  .sh-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; background: var(--sh-bg);
    box-shadow: 0 12px 32px rgba(0,0,0,0.06);
    padding: 0; max-height: 0; overflow: hidden; margin: 0;
    transition: max-height .4s, padding .4s;
  }
  .sh-nav.is-open { max-height: 500px; padding: 16px 0; }
  .sh-nav a { padding: 14px 24px; }
  .sh-burger { display: flex; }
  .sh-actions .sh-icon-btn:not(.sh-cart-btn) { display: none; }
  .sh-hero { grid-template-columns: 1fr; }
  .sh-hero-img { aspect-ratio: 4/3; min-height: 320px; }
  .sh-hero-content { padding: 60px 24px; }
  .sh-shop { padding: 80px 24px; }
  .sh-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 16px; }
  .sh-story { grid-template-columns: 1fr; gap: 40px; padding: 80px 24px; }
  .sh-news { padding: 80px 24px; }
  .sh-news-form { flex-direction: column; }
  .sh-news-form button { padding: 14px; }
  .sh-footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; padding: 0; }
  .sh-footer-grid > div:first-child { grid-column: 1 / -1; }
  .sh-floating-warning { bottom: 12px; left: 12px; font-size: 10px; }
  .sh-warning-row { flex-wrap: wrap; }
}
`
