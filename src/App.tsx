import { useEffect, useState } from 'react'
// touch for rebuild
import RestaurantPremiumDemo from './templates/RestaurantPremiumDemo'
import SalonPremiumDemo from './templates/SalonPremiumDemo'
import ClinicPremiumDemo from './templates/ClinicPremiumDemo'
import BuilderPremiumDemo from './templates/BuilderPremiumDemo'
import BuilderModernDemo from './templates/BuilderModernDemo'
import BuilderIndustrialDemo from './templates/BuilderIndustrialDemo'
import BuilderHitechDemo from './templates/BuilderHitechDemo'
import BuilderReformDemo from './templates/BuilderReformDemo'
import BuilderHeritageDemo from './templates/BuilderHeritageDemo'
import LawPremiumDemo from './templates/LawPremiumDemo'
import SchoolPremiumDemo from './templates/SchoolPremiumDemo'
import ShopPremiumDemo from './templates/ShopPremiumDemo'
import CorpPremiumDemo from './templates/CorpPremiumDemo'
import RecruitPremiumDemo from './templates/RecruitPremiumDemo'
import EventPremiumDemo from './templates/EventPremiumDemo'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Menu, X, ChevronRight, ChevronLeft, ArrowUpRight, Phone, MapPin,
  Megaphone, Smartphone, Hammer, Globe, Cpu, Check, ArrowRight,
} from 'lucide-react'

/* ============================================================
   Inline SVGs (lucide-react v1.14 lacks Instagram/Twitter)
   ============================================================ */
const IconYouTube = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M21.6 7.2c-.2-.8-.9-1.5-1.8-1.7C18.3 5 12 5 12 5s-6.3 0-7.8.4c-.9.2-1.6.9-1.8 1.7C2 8.7 2 12 2 12s0 3.3.4 4.8c.2.8.9 1.5 1.8 1.7C5.7 19 12 19 12 19s6.3 0 7.8-.4c.9-.2 1.6-.9 1.8-1.7.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8zM10 15V9l5 3-5 3z" />
  </svg>
)
const IconTikTok = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19.6 8.4a6.4 6.4 0 0 1-3.7-1.2v6.7a5.5 5.5 0 1 1-5.5-5.5v2.7a2.8 2.8 0 1 0 2.8 2.8V2h2.7a3.7 3.7 0 0 0 3.7 3.7v2.7z" />
  </svg>
)
const IconInstagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)
const IconX = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2H21l-6.51 7.44L22 22h-6.844l-4.74-6.215L4.8 22H2.04l6.96-7.96L2 2h6.91l4.27 5.65L18.244 2zm-2.4 18h1.51L7.27 4H5.66l10.184 16z" />
  </svg>
)
const IconLine = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2C6.5 2 2 5.6 2 10c0 4 3.5 7.3 8.3 8 .3.1.7.2.8.5.1.3 0 .7 0 1l-.1.7c0 .2-.2.8.7.5.9-.4 4.8-2.8 6.5-4.8 1.2-1.3 1.8-2.7 1.8-4.4 0-4.4-4.5-8-10-8z" />
  </svg>
)

/* ============================================================
   Constants
   ============================================================ */
const COMPANY = {
  name: '株式会社ポラリスクリエイティブ',
  nameEn: 'POLARIS CREATIVE Inc.',
  corpNumber: '9012401041381',
  zip: '〒183-0035',
  addr: '東京都府中市四谷3丁目30番地の8 – 2F',
  tel: '042-365-5532',
  telSales: '080-4796-3797',
  email: 'tenchosan346@gmail.com',
  director: '取締役社長　斉藤 誓良（ちから）',
  founded: '2024年2月',
}

const NAV: { label: string; href: string }[] = [
  { label: 'ホーム', href: '#home' },
  { label: '事業内容', href: '#business' },
  { label: 'SNS', href: '#sns' },
  { label: 'アプリ', href: '#app' },
  { label: '建設', href: '#construction' },
  { label: 'HP制作', href: '#hp' },
  { label: 'AI導入', href: '#ai' },
  { label: '会社案内', href: '#company' },
]

const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'POLARIS CREATIVE',
    title: 'テクノロジーで、\n未来を創る。',
    desc: 'SNS・アプリ・建設・HP制作・AI導入。\n5つの事業を内製でつなぐ、総合カンパニー。',
  },
  {
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'SNS MARKETING',
    title: '届けたい人に、\n届ける運用を。',
    desc: 'YouTube・TikTok を起点に、ブランドの接点を広げる。',
  },
  {
    img: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'WEB DEVELOPMENT',
    title: '営業の現場で、\n戦えるHPを。',
    desc: 'ヒアリングから運用まで、ワンストップで責任を持つ。',
  },
  {
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'CONSTRUCTION',
    title: '街と人の暮らしを、\n確かな技術で。',
    desc: 'ダイヤモンドコア・ウォールソー・道路カッター施工。',
  },
  {
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2400&q=80',
    eyebrow: 'AI CONSULTING',
    title: 'AIを、業務の中心に。',
    desc: '導入から運用定着まで、現場目線で伴走するコンサル。',
  },
]

const BUSINESSES = [
  { id: 'sns',           icon: Megaphone,  jp: 'SNS事業',         en: 'SNS', desc: 'YouTube・TikTok 運用代行' },
  { id: 'app',           icon: Smartphone, jp: 'アプリ開発',       en: 'APP', desc: '事業企画から実装まで（準備中）' },
  { id: 'construction',  icon: Hammer,     jp: '建設事業',         en: 'CONSTRUCTION', desc: '特殊施工・コアボーリング' },
  { id: 'hp',            icon: Globe,      jp: 'HP制作',           en: 'WEB', desc: '制作・運用・テンプレート' },
  { id: 'ai',            icon: Cpu,        jp: 'AI導入コンサル',   en: 'AI', desc: '業務自動化・チャットボット' },
]

type DemoSection = { title: string; desc: string; img: string; price?: string }
type Template = {
  slug: string
  name: string
  domain: string
  brand: string
  copy: string
  sub: string         // hero subtitle
  cta: string
  bg: string
  fg: string
  accent: string
  font: 'serif' | 'sans' | 'display'
  img: string
  navItems: string[]
  about: { label: string; title: string; body: string }
  services: { label: string; title: string; items: DemoSection[] }
  gallery: string[]   // unsplash photo ids
  testimonial: { quote: string; author: string; role: string }
  contact: { address: string; phone: string; hours: string }
}

// ============================================================
// 重要：以下のテンプレートはすべて「実在しない仮想ブランド」です。
// 店名・会社名・住所・電話番号・お客様の声、すべて架空。
// 実在する人物・店舗・会社とは一切関係ありません。
// デザイン見本（モックアップ）として、ポラリスクリエイティブが作成しました。
// ============================================================
const FAKE_PHONE = '03-0000-0000（※架空の番号）'
const FAKE_ADDR_PREFIX = '※架空の住所：'

const HP_TEMPLATES: Template[] = [
  {
    slug: 'restaurant', name: '飲食店向け', domain: 'polaris-shokudo.jp', brand: 'ポラリス食堂',
    copy: '一皿で、季節を語る。', sub: '※このサイトは仮想店舗のデザイン見本です。旬の素材を、丁寧に。月替わりの日本料理コース。',
    cta: 'ご予約（仮）', bg: '#1a1410', fg: '#f5e6c8', accent: '#c9a063', font: 'serif',
    img: 'photo-1517248135467-4c7edcad34c4', navItems: ['お品書き', '店舗', 'ご予約'],
    about: { label: 'CONCEPT（仮想）', title: '一期一会の、一皿を。', body: '※本店舗は実在しません。デザイン見本として作成された架空の飲食店です。― 日本各地から届く旬の食材を、最小限の調理で。料理人が手仕事で仕立てる、月替わりのコース料理。' },
    services: { label: 'MENU（架空メニュー）', title: 'お品書き', items: [
      { title: '昼の御膳（架空）', desc: '前菜・お造り・椀物・主菜・水菓子', img: 'photo-1517248135467-4c7edcad34c4', price: '¥4,800' },
      { title: '夜の懐石コース（架空）', desc: '全8品。季節の素材を5,000円〜', img: 'photo-1546069901-ba9599a7e63c', price: '¥9,800' },
      { title: '特別会席（架空）', desc: '記念日・接待にふさわしい全11品', img: 'photo-1551183053-bf91a1d81141', price: '¥15,000' },
    ]},
    gallery: ['photo-1517248135467-4c7edcad34c4', 'photo-1546069901-ba9599a7e63c', 'photo-1551183053-bf91a1d81141', 'photo-1559339352-11d035aa65de'],
    testimonial: { quote: '※架空のレビューです。実在のお客様ではありません。 ― 季節の移ろいを感じる、心のこもったお料理。記念日には必ず伺っています。', author: '架空のお客様A', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※営業時間も架空：昼 11:30-14:30 / 夜 17:30-22:00' },
  },
  {
    slug: 'salon', name: '美容院・サロン', domain: 'polaris-hair.jp', brand: 'ポラリスヘア',
    copy: '今日の気分で、まとう髪を。', sub: '※このサイトは仮想サロンのデザイン見本です。一人ひとりに合わせた、丁寧なカウンセリングから。',
    cta: '空き状況（仮）', bg: '#fdf4f0', fg: '#3a2820', accent: '#d4a373', font: 'sans',
    img: 'photo-1562322140-8baeececf3df', navItems: ['STYLE', 'MENU', 'BOOK'],
    about: { label: 'ABOUT（仮想）', title: 'わたしらしさを、髪から。', body: '※本サロンは実在しません。デザイン見本として作成された架空の美容院です。― 骨格・髪質・ライフスタイルに合わせて、毎日の "なりたい" を叶えます。' },
    services: { label: 'MENU（架空メニュー）', title: 'メニュー', items: [
      { title: 'カット（架空）', desc: 'シャンプー・ブロー込み', img: 'photo-1562322140-8baeececf3df', price: '¥6,600' },
      { title: 'カラー＋カット（架空）', desc: '髪質改善トリートメント付き', img: 'photo-1521590832167-7bcbfaa6381f', price: '¥14,300' },
      { title: 'パーマ＋カット（架空）', desc: 'デジタルパーマ対応', img: 'photo-1487412947147-5cebf100ffc2', price: '¥16,500' },
    ]},
    gallery: ['photo-1562322140-8baeececf3df', 'photo-1521590832167-7bcbfaa6381f', 'photo-1487412947147-5cebf100ffc2', 'photo-1599387737466-29d7b9b82e69'],
    testimonial: { quote: '※架空のレビューです。実在のお客様ではありません。 ― スタイリストさんが本当に親身に話を聞いてくれて、毎回 "なりたい自分" になれます。', author: '架空のお客様B', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※営業時間も架空：10:00-20:00（火休）' },
  },
  {
    slug: 'clinic', name: 'クリニック', domain: 'polaris-clinic.jp', brand: 'ポラリスクリニック',
    copy: '心と身体に、寄り添う医療を。', sub: '※このサイトは仮想クリニックのデザイン見本です。内科・小児科・皮膚科。',
    cta: 'WEB予約（仮）', bg: '#ffffff', fg: '#1f3a5f', accent: '#06b6d4', font: 'sans',
    img: 'photo-1576091160550-2173dba999ef', navItems: ['診療科目', '医師紹介', 'アクセス'],
    about: { label: 'OUR MISSION（仮想）', title: 'いつも、安心できる場所へ。', body: '※本クリニックは実在しません。デザイン見本として作成された架空の医療機関です。― 小さなお子様からご高齢の方まで、地域のすべての方に "ここに来てよかった" と感じていただけるクリニックを目指しています。' },
    services: { label: 'DEPARTMENT（架空科目）', title: '診療科目', items: [
      { title: '内科（架空）', desc: '生活習慣病・健康診断・予防接種', img: 'photo-1576091160399-112ba8d25d1f' },
      { title: '小児科（架空）', desc: 'お子様の体調管理・予防接種', img: 'photo-1607619056574-7b8d3ee536b2' },
      { title: '皮膚科（架空）', desc: 'アレルギー・湿疹・美容皮膚', img: 'photo-1551601651-2a8555f1a136' },
    ]},
    gallery: ['photo-1576091160550-2173dba999ef', 'photo-1631815589968-fdb09a223b1e', 'photo-1666214280391-8ff5bd3c0bf0', 'photo-1629909613654-28e377c37b09'],
    testimonial: { quote: '※架空のレビューです。実在の患者様ではありません。 ― 先生もスタッフの方も丁寧で、子供も安心して通えています。', author: '架空のお客様C', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※診療時間も架空：平日 9:00-12:30 / 14:00-18:00' },
  },
  {
    slug: 'workshop', name: '工務店・建築', domain: 'polaris-koumuten.jp', brand: 'ポラリス工務店',
    copy: 'ふるさとを、住み継ぐ家へ。', sub: '※このサイトは仮想工務店のデザイン見本です。注文住宅・古民家再生。',
    cta: '施工事例（仮）', bg: '#f3f1ec', fg: '#2e3a2c', accent: '#7a8c5e', font: 'serif',
    img: 'photo-1503387762-592deb58ef4e', navItems: ['施工実績', '工法', '資料請求'],
    about: { label: 'OUR STORY（仮想）', title: '土地と向き合う、家づくり。', body: '※本工務店は実在しません。デザイン見本として作成された架空の建築会社です。― 地域の風土と暮らしを知り尽くした職人が、お客様の "理想の住まい" を一棟ずつ手がけます。' },
    services: { label: 'WORKS（架空実績）', title: '施工実績', items: [
      { title: '注文住宅（架空）', desc: '無垢材を使った、長く住める家', img: 'photo-1568605114967-8130f3a36994' },
      { title: '古民家再生（架空）', desc: '伝統工法で、文化を未来へ', img: 'photo-1572120360610-d971b9d7767c' },
      { title: 'リノベ（架空）', desc: '今ある家を、もう一度価値ある住まいへ', img: 'photo-1556909114-f6e7ad7d3136' },
    ]},
    gallery: ['photo-1568605114967-8130f3a36994', 'photo-1572120360610-d971b9d7767c', 'photo-1556909114-f6e7ad7d3136', 'photo-1600585154340-be6161a56a0c'],
    testimonial: { quote: '※架空のレビューです。実在の施主ではありません。 ― 提案から完成まで、職人さんの真剣さが伝わる家づくりでした。', author: '架空のお客様D', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇市〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※営業時間も架空：9:00-18:00（水・日休）' },
  },
  {
    slug: 'workshop-modern', name: '建築（モダン）', domain: 'polaris-architect.jp', brand: 'ポラリス・アーキテクト',
    copy: 'SPACE SHAPES LIFE.', sub: '※このサイトは仮想建築事務所のデザイン見本です。意匠設計・住宅・店舗。',
    cta: 'CONTACT（仮）', bg: '#fafaf8', fg: '#0a0a0a', accent: '#0a0a0a', font: 'display',
    img: 'photo-1487958449943-2429e8be8625', navItems: ['WORKS', 'PHILOSOPHY', 'PROCESS'],
    about: { label: 'PHILOSOPHY（仮想）', title: '余白が、空間を生かす。', body: '※本事務所は実在しません。' },
    services: { label: 'WORKS（架空）', title: 'SELECTED WORKS', items: [
      { title: '光の家（架空）', desc: '東京都・港区 / 2024', img: 'photo-1518780664697-55e3ad937233' },
      { title: 'コンクリートの庵（架空）', desc: '京都府・東山 / 2023', img: 'photo-1600566753190-17f0baa2a6c3' },
      { title: '海辺の別荘（架空）', desc: '神奈川県・葉山 / 2023', img: 'photo-1600585154526-990dced4db0d' },
    ]},
    gallery: ['photo-1487958449943-2429e8be8625', 'photo-1518780664697-55e3ad937233', 'photo-1600566753190-17f0baa2a6c3', 'photo-1564540583246-934409427776'],
    testimonial: { quote: '※架空のレビュー。― 余白の使い方が美しく、住むほどに愛着が深まります。', author: '架空のお客様K', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※受付時間も架空：MON-FRI 10:00-18:00' },
  },
  {
    slug: 'workshop-industrial', name: '建設（重機系）', domain: 'polaris-heavy.jp', brand: 'ポラリス重建',
    copy: 'BUILD HARD. BUILD RIGHT.', sub: '※このサイトは仮想建設会社のデザイン見本です。コンクリート切断・穿孔・解体。',
    cta: '24h 緊急対応（仮）', bg: '#0a0a0a', fg: '#f5f5f0', accent: '#ff6b1a', font: 'display',
    img: 'photo-1581094794329-c8112a89af12', navItems: ['SERVICES', 'WORKS', 'EQUIPMENT'],
    about: { label: 'ABOUT（仮想）', title: 'とにかく早く、確実に。', body: '※本会社は実在しません。' },
    services: { label: 'SERVICES（架空）', title: '事業内容', items: [
      { title: 'ダイヤモンドコアボーリング（架空）', desc: 'φ20mm〜φ800mmまで対応', img: 'photo-1503387762-592deb58ef4e' },
      { title: 'ウォールソー切断（架空）', desc: '壁・床の大規模切断 / 最大厚600mm', img: 'photo-1541888946425-d81bb19240f5' },
      { title: '道路カッター施工（架空）', desc: 'アスファルト・コンクリート舗装の精密切断', img: 'photo-1581092160562-40aa08e78837' },
    ]},
    gallery: ['photo-1581094794329-c8112a89af12', 'photo-1541888946425-d81bb19240f5', 'photo-1503387762-592deb58ef4e', 'photo-1590856029826-c7a73142bbf1'],
    testimonial: { quote: '※架空のレビュー。― 緊急の現場でも即対応してくれて本当に助かっています。', author: '架空の取引先L社', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: '0120-000-000（※架空）', hours: '※受付時間も架空：24時間365日対応' },
  },
  {
    slug: 'workshop-hitech', name: 'スマート建設（ハイテック）', domain: 'polaris-smartbuild.jp', brand: 'POLARIS SMART BUILD',
    copy: 'Building the Future, by Data.', sub: '※このサイトは仮想スマート建設会社のデザイン見本です。BIM・IoT・AI・ドローン測量。',
    cta: 'GET QUOTE（仮）', bg: '#050a18', fg: '#e5e7eb', accent: '#22d3ee', font: 'display',
    img: 'photo-1503387762-592deb58ef4e', navItems: ['TECHNOLOGY', 'PROJECTS', 'DATA'],
    about: { label: 'ABOUT（仮想）', title: 'データ駆動の建設へ。', body: '※本会社は実在しません。BIM/IoT/AIで現場を再定義する仮想スマート建設会社のデザイン見本です。' },
    services: { label: 'TECHNOLOGY（架空）', title: '技術スタック', items: [
      { title: 'BIM/CIMモデリング（架空）', desc: '構造・設備・施工計画を統合した3Dモデル', img: 'photo-1503387762-592deb58ef4e' },
      { title: 'IoTセンサーネット（架空）', desc: '温度・振動・人員配置をリアルタイム監視', img: 'photo-1581094794329-c8112a89af12' },
      { title: 'AI工程予測（架空）', desc: '工期・コストの精緻な予測で経営判断を高速化', img: 'photo-1486325212027-8081e485255e' },
    ]},
    gallery: ['photo-1503387762-592deb58ef4e', 'photo-1486325212027-8081e485255e', 'photo-1581094794329-c8112a89af12', 'photo-1565008447742-97f6f38c985c'],
    testimonial: { quote: '※架空のレビュー。― BIMでの可視化が圧倒的で、社内合意形成がスムーズに。', author: '架空の発注主M社', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※受付時間も架空：MON-FRI 9:00-18:00' },
  },
  {
    slug: 'workshop-reform', name: 'リフォーム・住宅', domain: 'polaris-home.jp', brand: 'ポラリス住まいの相談所',
    copy: '「住みなれた家を、もう少し、好きに。」', sub: '※このサイトは仮想リフォーム会社のデザイン見本です。キッチン・浴室・全面リノベ。',
    cta: '無料見積もり（仮）', bg: '#faf7f1', fg: '#3a2e1f', accent: '#6b8e4e', font: 'serif',
    img: 'photo-1600585154340-be6161a56a0c', navItems: ['施工事例', 'サービス', '流れ'],
    about: { label: 'ABOUT（仮想）', title: '地域密着30年（架空）。', body: '※本会社は実在しません。Before/Afterスライダーで施工事例を比較できる仮想リフォーム会社のデザイン見本です。' },
    services: { label: 'SERVICE（架空）', title: 'リフォーム内容', items: [
      { title: 'キッチン（架空）', desc: '使いやすく、お手入れしやすく。¥80万〜', img: 'photo-1556909114-f6e7ad7d3136' },
      { title: '浴室・洗面所（架空）', desc: 'ヒートショック対策・バリアフリー化。¥60万〜', img: 'photo-1552321554-5fefe8c9ef14' },
      { title: 'フルリノベ（架空）', desc: '間取り変更・耐震・断熱まで一括。¥800万〜', img: 'photo-1600607687939-ce8a6c25118c' },
    ]},
    gallery: ['photo-1556909114-f6e7ad7d3136', 'photo-1600210492493-0946911123ea', 'photo-1552321554-5fefe8c9ef14', 'photo-1600607687939-ce8a6c25118c'],
    testimonial: { quote: '※架空のレビュー。― キッチンが見違えるほど明るくなり、料理が楽しくなりました。', author: '架空のお客様K様', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇市〇〇 0-0-0（実在しません）`, phone: '0120-000-000（※架空）', hours: '※受付時間も架空：9:00-19:00 年中無休' },
  },
  {
    slug: 'workshop-heritage', name: 'ゼネコン（老舗・重厚）', domain: 'polaris-heritage.jp', brand: '株式会社ポラリス建設',
    copy: '百年、街に、骨を、残す。', sub: '※このサイトは仮想ゼネコンのデザイン見本です。大正創業（架空）・建築・土木・公共。',
    cta: 'お問合せ（仮）', bg: '#f5f1e8', fg: '#14213d', accent: '#b8323a', font: 'serif',
    img: 'photo-1486325212027-8081e485255e', navItems: ['沿革', '実績', '事業'],
    about: { label: 'ABOUT（仮想）', title: '創業 大正十二年（架空）。', body: '※本会社は実在しません。縦タイムラインと数字カウントアップで歴史を語る仮想ゼネコンのデザイン見本です。' },
    services: { label: 'BUSINESS（架空）', title: '四つの専門領域', items: [
      { title: '建築事業（架空）', desc: '商業・オフィス・マンション・公共建築まで', img: 'photo-1486325212027-8081e485255e' },
      { title: '土木事業（架空）', desc: '橋梁・トンネル・道路・河川・港湾', img: 'photo-1487958449943-2429e8be8625' },
      { title: 'リニューアル（架空）', desc: '長寿命化・耐震改修・歴史的建造物の保存修復', img: 'photo-1494380005750-93f72b4dba1d' },
    ]},
    gallery: ['photo-1486325212027-8081e485255e', 'photo-1487958449943-2429e8be8625', 'photo-1448630360428-65456885c650', 'photo-1565008447742-97f6f38c985c'],
    testimonial: { quote: '※架空のレビュー。― 百年の歴史に裏打ちされた確かな技術と誠実さに感謝しています。', author: '架空の発注機関N', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0 ポラリスビル（実在しません）`, phone: FAKE_PHONE, hours: '※受付時間も架空：平日 9:00-17:30' },
  },
  {
    slug: 'law', name: '士業', domain: 'polaris-law.jp', brand: 'ポラリス法律事務所',
    copy: '法を、あなたの味方に。', sub: '※このサイトは仮想法律事務所のデザイン見本です。中小企業法務・労務・契約・相続。',
    cta: '無料相談（仮）', bg: '#0f1a2e', fg: '#f5f5f7', accent: '#c9a754', font: 'serif',
    img: 'photo-1450101499163-c8848c66ca85', navItems: ['取扱業務', '弁護士紹介', '料金'],
    about: { label: 'OUR PHILOSOPHY（仮想）', title: '一人ひとりの、最善の解決へ。', body: '※本事務所は実在しません。デザイン見本として作成された架空の法律事務所です。― 法律は、戦うためではなく、明日を生きるための道具です。立場に寄り添い最善策を導きます。' },
    services: { label: 'PRACTICE AREAS（架空）', title: '取扱業務', items: [
      { title: '企業法務（架空）', desc: '契約書・労務・コンプライアンス', img: 'photo-1450101499163-c8848c66ca85' },
      { title: '相続・遺言（架空）', desc: '相続対策から争族解決まで', img: 'photo-1554224155-6726b3ff858f' },
      { title: '労働問題（架空）', desc: '解雇・残業代・ハラスメント', img: 'photo-1589829545856-d10d557cf95f' },
    ]},
    gallery: ['photo-1450101499163-c8848c66ca85', 'photo-1554224155-6726b3ff858f', 'photo-1589829545856-d10d557cf95f', 'photo-1505664194779-8beaceb93744'],
    testimonial: { quote: '※架空のレビューです。実在のクライアントではありません。 ― 難しい契約問題を、わかりやすく整理してくださいました。', author: '架空のお客様E', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※受付時間も架空：平日 9:30-18:00' },
  },
  {
    slug: 'school', name: '教室・スクール', domain: 'polaris-school.jp', brand: 'ポラリススクール',
    copy: '学ぶって、たのしい！', sub: '※このサイトは仮想スクールのデザイン見本です。英会話・プログラミング・アート。',
    cta: '体験申込（仮）', bg: '#fff8e1', fg: '#3d2c1f', accent: '#ff7a3d', font: 'display',
    img: 'photo-1523240795612-9a054b0db644', navItems: ['コース', '講師', '体験'],
    about: { label: 'WHY POLARIS（仮想）', title: '"できた！" を、毎日。', body: '※本スクールは実在しません。デザイン見本として作成された架空の教室です。― 正解を教えるのではなく、自分で考える力を育てる。' },
    services: { label: 'COURSES（架空コース）', title: 'コース', items: [
      { title: '英会話（架空）', desc: 'ネイティブ講師の少人数レッスン', img: 'photo-1503676260728-1c00da094a0b', price: '月¥8,800' },
      { title: 'プログラミング（架空）', desc: 'Scratch・micro:bit・Python', img: 'photo-1564865878688-9a244444042a', price: '月¥9,900' },
      { title: 'アート＆クラフト（架空）', desc: '創造力を伸ばす表現の場', img: 'photo-1607275155000-df5e1631fb45', price: '月¥7,700' },
    ]},
    gallery: ['photo-1523240795612-9a054b0db644', 'photo-1503676260728-1c00da094a0b', 'photo-1564865878688-9a244444042a', 'photo-1607275155000-df5e1631fb45'],
    testimonial: { quote: '※架空のレビューです。実在の保護者ではありません。 ― 通い始めて半年で、子どもが自分から英語で話すように！', author: '架空のお客様F', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※営業時間も架空：平日 15:00-19:00 / 土 10:00-17:00' },
  },
  {
    slug: 'ec', name: 'EC・ショップ', domain: 'polaris-store.jp', brand: 'ポラリスストア',
    copy: '長く、好きでいられる服。', sub: '※このサイトは仮想ECショップのデザイン見本です。MADE IN JAPAN。',
    cta: 'SHOP NOW（仮）', bg: '#ffffff', fg: '#1d1d1f', accent: '#1d1d1f', font: 'sans',
    img: 'photo-1556742049-0cfed4f6a45d', navItems: ['SHOP', 'LOOKBOOK', 'ABOUT'],
    about: { label: 'PHILOSOPHY（仮想）', title: '少なく持って、長く着る。', body: '※本ショップは実在しません。デザイン見本として作成された架空のECサイトです。― 素材選びから縫製まで、すべて国内の職人と。' },
    services: { label: 'NEW IN（架空商品）', title: '新着アイテム', items: [
      { title: 'コットンTシャツ（架空）', desc: '日本製スーピマコットン使用', img: 'photo-1521572163474-6864f9cf17ab', price: '¥6,800' },
      { title: 'リネンシャツ（架空）', desc: '通気性の良い夏の定番', img: 'photo-1602810318383-e386cc2a3ccf', price: '¥12,800' },
      { title: 'ウールパンツ（架空）', desc: 'すっきり見える美シルエット', img: 'photo-1594633312681-425c7b97ccd1', price: '¥18,800' },
    ]},
    gallery: ['photo-1556742049-0cfed4f6a45d', 'photo-1521572163474-6864f9cf17ab', 'photo-1602810318383-e386cc2a3ccf', 'photo-1594633312681-425c7b97ccd1'],
    testimonial: { quote: '※架空のレビューです。実在のお客様ではありません。 ― 5年着てもヘタらない。一度買うと他が着られなくなります。', author: '架空のお客様G', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※営業時間も架空：12:00-20:00（無休）' },
  },
  {
    slug: 'corp', name: 'コーポレート', domain: 'polaris-corp.jp', brand: 'ポラリス株式会社',
    copy: '世界の課題に、技術で挑む。', sub: '※このサイトは仮想コーポレートサイトのデザイン見本です。',
    cta: 'CONTACT（仮）', bg: '#ffffff', fg: '#0a2540', accent: '#1d4ed8', font: 'sans',
    img: 'photo-1497366216548-37526070297c', navItems: ['BUSINESS', 'COMPANY', 'IR'],
    about: { label: 'OUR VISION（仮想）', title: '"つくる" で、未来を。', body: '※本会社は実在しません。デザイン見本として作成された架空のコーポレートサイトです。― 日本のものづくりを牽引する技術力で、世界の "持続可能性" に貢献します。' },
    services: { label: 'BUSINESS（架空事業）', title: '事業領域', items: [
      { title: '半導体（架空）', desc: '次世代半導体の素材開発', img: 'photo-1518770660439-4636190af475' },
      { title: '機能性素材（架空）', desc: '軽量・高強度の独自素材', img: 'photo-1581094794329-c8112a89af12' },
      { title: 'エネルギー（架空）', desc: '再生可能エネルギー関連事業', img: 'photo-1466611653911-95081537e5b7' },
    ]},
    gallery: ['photo-1497366216548-37526070297c', 'photo-1518770660439-4636190af475', 'photo-1581094794329-c8112a89af12', 'photo-1466611653911-95081537e5b7'],
    testimonial: { quote: '※架空のレビューです。実在の取引先ではありません。 ― 技術力と提案力の両面で、長くお付き合いさせていただいています。', author: '架空の取引先H社', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: FAKE_PHONE, hours: '※受付時間も架空：平日 9:00-17:30' },
  },
  {
    slug: 'recruit', name: '採用LP', domain: 'polaris-recruit.jp', brand: 'ポラリスリクルート',
    copy: '同じ、未来をつくる仲間へ。', sub: '※このサイトは仮想採用LPのデザイン見本です。',
    cta: 'ENTRY（仮）', bg: '#0d0d0d', fg: '#ffffff', accent: '#e60039', font: 'display',
    img: 'photo-1521737711867-e3b97375f902', navItems: ['MESSAGE', 'CULTURE', 'PEOPLE'],
    about: { label: 'MESSAGE（仮想）', title: 'ここで、本気を試してほしい。', body: '※本採用情報は実在しません。デザイン見本として作成された架空の採用LPです。― 何かを変えたい人、本気で挑戦したい人を、私たちは待っています。' },
    services: { label: 'POSITIONS（架空募集）', title: '募集職種', items: [
      { title: 'エンジニア（架空）', desc: 'フルスタック / モバイル / インフラ', img: 'photo-1517048676732-d65bc937f952' },
      { title: 'デザイナー（架空）', desc: 'UI/UX・ブランディング・グラフィック', img: 'photo-1542744173-8e7e53415bb0' },
      { title: 'ビジネス（架空）', desc: '営業・マーケ・コーポレート', img: 'photo-1556761175-5973dc0f32e7' },
    ]},
    gallery: ['photo-1521737711867-e3b97375f902', 'photo-1517048676732-d65bc937f952', 'photo-1542744173-8e7e53415bb0', 'photo-1556761175-5973dc0f32e7'],
    testimonial: { quote: '※架空の社員インタビューです。実在の社員ではありません。 ― 入社2年目で大型プロジェクトのリーダーに。挑戦できる環境です。', author: '架空の社員I', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}東京都〇〇区〇〇 0-0-0（実在しません）`, phone: `採用窓口 ${FAKE_PHONE}`, hours: '※受付情報も架空：応募はWEBエントリーから24時間受付' },
  },
  {
    slug: 'event', name: 'イベント', domain: 'polaris-fest.jp', brand: 'ポラリスフェス',
    copy: 'その夜、世界が踊り出す。', sub: '※このサイトは仮想イベントのデザイン見本です。実際の開催予定はありません。',
    cta: 'TICKET（仮）', bg: '#0f0533', fg: '#ffffff', accent: '#ff2da0', font: 'display',
    img: 'photo-1492684223066-81342ee5ff30', navItems: ['LINEUP', 'VENUE', 'TICKET'],
    about: { label: 'ABOUT（仮想）', title: 'ひと夏の、特別な記憶を。', body: '※本イベントは実在しません。デザイン見本として作成された架空の音楽フェスです。― 海と空、最高の音楽が交差する1日。（実際の開催予定はありません）' },
    services: { label: 'STAGES（架空ステージ）', title: 'ステージ', items: [
      { title: 'MAIN STAGE（架空）', desc: 'ヘッドライナー含む15組', img: 'photo-1493225457124-a3eb161ffa5f' },
      { title: 'BEACH STAGE（架空）', desc: 'チルアウトと夕焼けと', img: 'photo-1506157786151-b8491531f063' },
      { title: 'FOREST STAGE（架空）', desc: '深夜まで踊れる森のステージ', img: 'photo-1429962714451-bb934ecdc4ec' },
    ]},
    gallery: ['photo-1492684223066-81342ee5ff30', 'photo-1493225457124-a3eb161ffa5f', 'photo-1506157786151-b8491531f063', 'photo-1429962714451-bb934ecdc4ec'],
    testimonial: { quote: '※架空のレビューです。実在の来場者ではありません。 ― 会場の一体感が忘れられない。来年も絶対行きます！', author: '架空の来場者J', role: '※架空 / デザイン見本用' },
    contact: { address: `${FAKE_ADDR_PREFIX}千葉県〇〇市〇〇 0-0-0（実在しません）`, phone: 'お問い合わせフォームのみ（架空）', hours: '※開催日も架空：〇月〇日 12:00〜23:00（実際の開催予定はありません）' },
  },
]

const TPL_FONT: Record<Template['font'], string> = {
  serif:   '"Noto Serif JP", serif',
  sans:    '"Noto Sans JP", sans-serif',
  display: '"Inter", "Noto Sans JP", sans-serif',
}

const HP_OPTIONS = [
  { name: '追加ページ',                   price: '¥7,500〜 / 1ページ',   market: '相場 ¥15,000' },
  { name: 'ロゴ制作',                     price: '¥15,000〜',            market: '相場 ¥30,000' },
  { name: '撮影（スチール）',             price: '¥25,000〜 / 半日',     market: '相場 ¥50,000' },
  { name: '撮影（動画）',                 price: '¥50,000〜 / 半日',     market: '相場 ¥100,000' },
  { name: 'SEO対策（基本セット）',        price: '¥25,000〜',            market: '相場 ¥50,000' },
  { name: '多言語対応（1言語追加）',      price: '¥25,000〜',            market: '相場 ¥50,000' },
  { name: 'お問い合わせフォーム拡張',     price: '¥15,000〜',            market: '相場 ¥30,000' },
  { name: 'ブログ・お知らせCMS導入',      price: '¥25,000〜',            market: '相場 ¥50,000' },
  { name: '予約システム連携',             price: '¥40,000〜',            market: '相場 ¥80,000' },
  { name: 'EC（Shopify / Stripe）連携',   price: '¥50,000〜',            market: '相場 ¥100,000' },
]

const REASONS = [
  { num: '01', title: '相場の半額',     desc: 'HP制作の追加料金は業界相場のおよそ半額。明朗会計でコストを抑えます。' },
  { num: '02', title: '完全内製ワンストップ', desc: '企画・撮影・実装・運用まで全て内製。複数業者を挟まないから速い・安い・責任が明確。' },
  { num: '03', title: '建設×IT のクロス事業', desc: '建設施工とWeb・SNS・AIを横断する稀有な総合企業。業種を超えた提案が可能。' },
  { num: '04', title: '最短1週間納品',   desc: 'HP制作は最短1週間で公開可能。SNSも即日始動。営業のスピードに追従します。' },
  { num: '05', title: '経営者目線で提案', desc: '「作って終わり」ではなく、売上と運用に直結する提案。経営課題を一緒に解きます。' },
]

const NEWS_ITEMS = [
  { date: '2026.05.01', cat: 'NEWS',    title: '株式会社ポラリスクリエイティブ コーポレートサイトをリリース' },
  { date: '2026.04.15', cat: 'WORKS',   title: '飲食チェーン様 公式HP・採用LP を納品しました' },
  { date: '2026.04.01', cat: 'TOPICS',  title: 'AI導入コンサルティングサービス 提供開始' },
]

/* ============================================================
   Logo
   ============================================================ */
const Logo = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex items-center gap-2.5">
    <svg viewBox="0 0 40 40" className="w-10 h-10">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <path d="M20 3 L24.7 14.5 L37 15.5 L27.5 23.6 L30.5 35.5 L20 29 L9.5 35.5 L12.5 23.6 L3 15.5 L15.3 14.5 Z" fill="url(#logoGrad)" />
    </svg>
    <div className={`leading-tight ${dark ? 'text-white' : 'text-[var(--color-pc-ink)]'}`}>
      <div className="text-[15px] font-bold tracking-tight">{COMPANY.name}</div>
      <div className="text-[9px] tracking-[0.25em] text-[var(--color-pc-sub)]" style={{ fontFamily: 'Inter, sans-serif' }}>
        {COMPANY.nameEn}
      </div>
    </div>
  </div>
)

/* ============================================================
   Header
   ============================================================ */
function Header({ onMenu, scrolled }: { onMenu: () => void; scrolled: boolean }) {
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'bg-white/95 backdrop-blur border-b border-[var(--color-pc-line)]' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-5 lg:px-8 h-16 lg:h-[72px]">
        <a href="#home" className="block"><Logo /></a>
        <nav className="hidden xl:flex items-center gap-7">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[13px] text-[var(--color-pc-ink)] hover:text-[var(--color-pc-pink)] transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <a href={`tel:${COMPANY.tel}`} className="hidden xl:flex items-center gap-1.5 text-[13px] text-[var(--color-pc-ink)] hover:text-[var(--color-pc-pink)]">
            <Phone className="w-3.5 h-3.5" /> {COMPANY.tel}
          </a>
          <a href="#contact" className="bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white px-5 py-2.5 text-[13px] font-bold transition-colors flex items-center gap-1.5 rounded-full">
            お問い合わせ <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex items-center gap-1 xl:hidden">
          <a href={`tel:${COMPANY.telSales}`} className="w-10 h-10 rounded-full bg-grad-brand text-white flex items-center justify-center" aria-label="電話">
            <Phone className="w-4 h-4" />
          </a>
          <button onClick={onMenu} className="p-2" aria-label="メニュー">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-white overflow-auto">
          <div className="flex justify-between items-center p-5 border-b border-[var(--color-pc-line)]">
            <Logo />
            <button onClick={onClose} aria-label="閉じる" className="p-2"><X className="w-6 h-6" /></button>
          </div>
          <nav className="p-5 flex flex-col">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={onClose} className="py-4 border-b border-[var(--color-pc-line)] text-base flex justify-between items-center">
                <span>{n.label}</span><ChevronRight className="w-4 h-4 text-[var(--color-pc-sub)]" />
              </a>
            ))}
            <a href="#contact" onClick={onClose} className="mt-6 bg-[var(--color-pc-pink)] text-white text-center py-4 rounded-full font-bold">
              お問い合わせ
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ============================================================
   Hero Carousel
   ============================================================ */
function HeroCarousel() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])
  const prev = () => setIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  const next = () => setIdx((i) => (i + 1) % HERO_SLIDES.length)
  const slide = HERO_SLIDES[idx]
  return (
    <section id="home" className="relative w-full h-[88vh] min-h-[640px] overflow-hidden bg-[var(--color-pc-bg)] mt-16 lg:mt-[72px]">
      <AnimatePresence>
        <motion.div key={idx} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }} className="absolute inset-0">
          <img src={slide.img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <div className="text-[var(--color-pc-pink)] text-xs lg:text-sm tracking-[0.4em] mb-5 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                {slide.eyebrow}
              </div>
              <h1 className="text-[var(--color-pc-ink)] text-[34px] lg:text-[64px] font-black leading-[1.15] mb-6 whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="text-[var(--color-pc-ink)]/70 text-sm lg:text-base leading-relaxed mb-8 whitespace-pre-line">
                {slide.desc}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#business" className="bg-[var(--color-pc-ink)] hover:bg-black text-white px-7 py-3.5 text-sm font-bold transition-colors flex items-center gap-2 rounded-full">
                  事業を見る <ChevronRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white px-7 py-3.5 text-sm font-bold transition-colors flex items-center gap-2 rounded-full">
                  お問い合わせ <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <button onClick={prev} className="absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-[var(--color-pc-line)] flex items-center justify-center shadow" aria-label="前へ">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-[var(--color-pc-line)] flex items-center justify-center shadow" aria-label="次へ">
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1 transition-all rounded-full ${i === idx ? 'w-10 bg-[var(--color-pc-pink)]' : 'w-5 bg-[var(--color-pc-ink)]/30'}`} aria-label={`スライド ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   5 Business Icons (SoftBank-style row)
   ============================================================ */
function BusinessIcons() {
  // Shorter labels for mobile to avoid wrapping
  const shortJp: Record<string, string> = {
    sns: 'SNS',
    app: 'アプリ',
    construction: '建設',
    hp: 'HP制作',
    ai: 'AIコンサル',
  }
  return (
    <section id="business" className="bg-white border-b border-[var(--color-pc-line)]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 py-10">
        <ul className="grid grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
          {BUSINESSES.map((b) => (
            <li key={b.id}>
              <a href={`#${b.id}`} className="group flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-[var(--color-pc-bg)] group-hover:bg-grad-brand flex items-center justify-center transition-colors mb-2 lg:mb-3">
                  <b.icon className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-[var(--color-pc-ink)] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm font-bold text-[var(--color-pc-ink)] group-hover:text-[var(--color-pc-pink)] transition-colors leading-tight whitespace-nowrap">
                  <span className="lg:hidden">{shortJp[b.id]}</span>
                  <span className="hidden lg:inline">{b.jp}</span>
                </div>
                <div className="text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.2em] text-[var(--color-pc-sub)] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {b.en}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ============================================================
   Common: SectionHeading
   ============================================================ */
function SectionHeading({ en, jp, sub }: { en: string; jp: string; sub?: string }) {
  return (
    <div className="mb-12 lg:mb-16">
      <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{en}</div>
      <h2 className="text-3xl lg:text-5xl font-black text-[var(--color-pc-ink)] leading-tight">{jp}</h2>
      {sub && <p className="text-[var(--color-pc-sub)] text-sm lg:text-base mt-4 leading-relaxed max-w-3xl">{sub}</p>}
      <div className="w-12 h-[3px] bg-[var(--color-pc-pink)] mt-6" />
    </div>
  )
}

function PriceCard({ unit, price, note, cta = '相談する' }: { unit: string; price: string; note: string; cta?: string }) {
  return (
    <div className="bg-white border-2 border-[var(--color-pc-ink)] p-7 lg:p-9">
      <div className="text-xs tracking-[0.3em] text-[var(--color-pc-sub)] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>PRICE</div>
      <div className="text-sm text-[var(--color-pc-sub)] mb-1">{unit}</div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-5xl lg:text-6xl font-black text-[var(--color-pc-ink)]" style={{ fontFamily: 'Inter, sans-serif' }}>{price}</span>
        <span className="text-base text-[var(--color-pc-ink)]">〜</span>
      </div>
      <div className="text-xs text-[var(--color-pc-sub)] mb-6">{note}</div>
      <a href="#contact" className="block w-full bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white text-center py-3 text-sm font-bold rounded-full transition-colors">
        {cta} →
      </a>
    </div>
  )
}

/* ============================================================
   ① SNS
   ============================================================ */
function SectionSNS() {
  return (
    <section id="sns" className="py-24 lg:py-32 px-5 lg:px-12 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          en="01 — SNS BUSINESS"
          jp="SNS運用代行"
          sub="YouTube・TikTok を中心に、企画・撮影・編集・投稿・分析までワンストップ。30社以上の運用実績、自社で総フォロワー200万人を抱える運用ノウハウを、御社の集客に。"
        />
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-10">
          <div className="bg-grad-brand text-white p-3 sm:p-5 lg:p-7 text-center rounded-lg">
            <div className="text-[9px] sm:text-[10px] tracking-widest opacity-90 mb-1 sm:mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>YOUTUBE</div>
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center sm:gap-1 whitespace-nowrap">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>150</span>
              <span className="text-xs sm:text-base font-bold mt-0.5 sm:mt-0">万人</span>
            </div>
            <div className="text-[9px] sm:text-[10px] lg:text-xs opacity-90 mt-1">登録者数</div>
          </div>
          <div className="bg-grad-brand text-white p-3 sm:p-5 lg:p-7 text-center rounded-lg">
            <div className="text-[9px] sm:text-[10px] tracking-widest opacity-90 mb-1 sm:mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>TIKTOK</div>
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center sm:gap-1 whitespace-nowrap">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>36</span>
              <span className="text-xs sm:text-base font-bold mt-0.5 sm:mt-0">万人</span>
            </div>
            <div className="text-[9px] sm:text-[10px] lg:text-xs opacity-90 mt-1">フォロワー</div>
          </div>
          <div className="bg-[var(--color-pc-ink)] text-white p-3 sm:p-5 lg:p-7 text-center rounded-lg">
            <div className="text-[9px] sm:text-[10px] tracking-widest text-[var(--color-pc-pink)] mb-1 sm:mb-2 font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>TOTAL</div>
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center sm:gap-1 whitespace-nowrap">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>200</span>
              <span className="text-xs sm:text-base font-bold mt-0.5 sm:mt-0">万人</span>
            </div>
            <div className="text-[9px] sm:text-[10px] lg:text-xs opacity-80 mt-1">総フォロワー</div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <div className="bg-[var(--color-pc-bg)] p-7 rounded-lg">
              <IconYouTube className="w-10 h-10 text-[#ff0000] mb-4" />
              <div className="text-xl font-bold mb-1">YouTube 運用</div>
              <div className="text-xs text-[var(--color-pc-sub)] mb-4 tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>SUBSCRIBERS / VIEWS</div>
              <ul className="text-sm space-y-2">
                {['チャンネル設計・初期構築', '台本・構成作成', '撮影・編集（4K対応）', 'サムネイル制作', 'SEO・分析レポート'].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--color-pc-pink)] mt-0.5 flex-shrink-0" /><span>{t}</span></li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-[var(--color-pc-line)]">
                <div className="text-xs text-[var(--color-pc-sub)]">自社運用チャンネル登録者</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-2xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>1,500,000</div>
                  <div className="text-sm">名</div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-pc-bg)] p-7 rounded-lg">
              <IconTikTok className="w-10 h-10 text-[var(--color-pc-ink)] mb-4" />
              <div className="text-xl font-bold mb-1">TikTok 運用</div>
              <div className="text-xs text-[var(--color-pc-sub)] mb-4 tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>FOLLOWERS / REACH</div>
              <ul className="text-sm space-y-2">
                {['アカウント戦略立案', 'ショート動画企画', '撮影・編集', 'ハッシュタグ・トレンド分析', '投稿スケジュール運用'].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--color-pc-pink)] mt-0.5 flex-shrink-0" /><span>{t}</span></li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-[var(--color-pc-line)]">
                <div className="text-xs text-[var(--color-pc-sub)]">自社運用アカウントフォロワー</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-2xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>360,000</div>
                  <div className="text-sm">名</div>
                </div>
              </div>
            </div>
          </div>
          <PriceCard unit="月額" price="¥100,000" note="運用代行プラン・撮影回数等は要相談" />
        </div>
        <div className="text-center mt-4 text-xs text-[var(--color-pc-sub)]">
          ※ 数値は自社運用アカウント実績。30社以上のクライアント運用経験あり。
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ② App Coming Soon
   ============================================================ */
function SectionApp() {
  return (
    <section id="app" className="relative py-24 lg:py-32 px-5 lg:px-12 bg-[var(--color-pc-ink)] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-[1280px] mx-auto">
        <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>02 — APP DEVELOPMENT</div>
        <h2 className="text-3xl lg:text-5xl font-black mb-6">アプリ開発事業</h2>
        <div className="w-12 h-[3px] bg-[var(--color-pc-pink)] mb-10" />
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10 items-end">
          <div>
            <div className="inline-block bg-[var(--color-pc-pink)] text-white text-xs tracking-[0.3em] font-bold px-4 py-1.5 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              COMING SOON
            </div>
            <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-2xl">
              事業企画・要件定義から、iOS / Android / Web アプリの設計・実装・運用までを内製で完結。
              <br />
              現在、サービス詳細を準備中です。リリースまで今しばらくお待ちください。
            </p>
          </div>
          <div className="text-right">
            <a href="#contact" className="inline-flex items-center gap-2 text-sm tracking-widest border-b border-white/40 pb-1 hover:text-[var(--color-pc-pink)] hover:border-[var(--color-pc-pink)] transition-colors">
              先行相談する <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ③ Construction
   ============================================================ */
function SectionConstruction() {
  const items = [
    { name: 'ダイヤモンドコアボーリング施工', desc: 'コンクリートに精密な円形の穴を空ける専門工法。配管・配線・設備の貫通工事に。', img: 'photo-1503387762-592deb58ef4e' },
    { name: 'ウォールソー施工',           desc: '壁面・床面の大規模切断工事。建物の解体・改修・開口部新設に対応。',           img: 'photo-1541888946425-d81bb19240f5' },
    { name: '道路カッター施工（外注）',     desc: 'アスファルト・コンクリート舗装の精密切断。道路工事・配管埋設・補修工事に。',     img: 'photo-1581094288338-2314dddb7ece' },
  ]
  return (
    <section id="construction" className="py-24 lg:py-32 px-5 lg:px-12 bg-[var(--color-pc-bg)]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          en="03 — CONSTRUCTION BUSINESS"
          jp="建設事業"
          sub="コンクリート切断・穿孔の特殊施工。創業以来 20,000件以上の施工実績。大手公共工事の現場経験で培った精度と安全性で対応します。"
        />

        {/* Construction stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          <div className="bg-white p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>TOTAL WORKS</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>20,000</span>
              <span className="text-sm font-bold">件 +</span>
            </div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">累計施工実績</div>
          </div>
          <div className="bg-white p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-cyan)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>AREA</div>
            <div className="text-2xl lg:text-3xl font-black mt-1">首都圏</div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">関東圏も出張対応可</div>
          </div>
          <div className="bg-white p-5 lg:p-6 text-center col-span-2 lg:col-span-1">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>MAJOR PROJECT</div>
            <div className="text-sm lg:text-base font-bold leading-tight">大手町駅<br />改修工事</div>
          </div>
          <div className="bg-white p-5 lg:p-6 text-center col-span-2 lg:col-span-1">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>MAJOR PROJECT</div>
            <div className="text-sm lg:text-base font-bold leading-tight">横浜都営住宅<br />改修工事</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={it.name} className="bg-white overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={`https://images.unsplash.com/${it.img}?auto=format&fit=crop&w=800&q=80`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-[var(--color-pc-pink)] text-xs tracking-widest font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  METHOD 0{i + 1}
                </div>
                <div className="text-lg font-bold text-[var(--color-pc-ink)] mb-2 leading-tight">{it.name}</div>
                <div className="text-sm text-[var(--color-pc-sub)] leading-relaxed">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#contact" className="inline-flex items-center gap-2 bg-[var(--color-pc-ink)] hover:bg-black text-white px-8 py-3.5 text-sm font-bold rounded-full transition-colors">
            施工のご相談・お見積もり <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Demo Site (full virtual website per template)
   ============================================================ */
function DemoSite({ t }: { t: Template }) {
  const fontFamily = TPL_FONT[t.font]
  const overlay = `linear-gradient(135deg, ${t.bg}cc 0%, ${t.bg}33 60%, transparent 100%)`
  return (
    <div style={{ background: t.bg, color: t.fg, fontFamily }}>
      {/* Polaris demo banner — strong disclaimer */}
      <div className="bg-[#1d1d1f] text-white sticky top-0 z-50 border-b-2 border-[var(--color-pc-pink)]">
        <div className="px-4 py-2.5 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-grad-brand text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>SAMPLE</span>
            <span className="truncate">⚠️ <b>{t.brand}</b> は<b className="text-[var(--color-pc-pink)]">実在しない仮想の{t.slug === 'event' ? 'イベント' : t.slug === 'recruit' || t.slug === 'corp' ? '会社' : '店舗'}</b>です。デザイン見本としてポラリスクリエイティブが作成しました。</span>
          </div>
          <a href="#hp" className="bg-white text-[#1d1d1f] px-3 py-1 rounded font-bold whitespace-nowrap hover:bg-grad-brand hover:text-white transition-colors">← 戻る</a>
        </div>
      </div>
      {/* Disclaimer band #2 */}
      <div className="bg-[var(--color-pc-pink)] text-white text-center text-[11px] py-1.5 px-3 font-bold">
        ⚠️ 注意：このページに表示される店舗名・会社名・住所・電話番号・お客様の声などは<u>すべて架空</u>です。実在しません。
      </div>

      {/* Demo nav */}
      <nav className="border-b" style={{ borderColor: `${t.fg}22`, background: `${t.bg}f0`, backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5 lg:px-8 h-16">
          <div className="font-bold text-xl tracking-wide">{t.brand}</div>
          <ul className="hidden sm:flex items-center gap-6 text-sm" style={{ color: `${t.fg}cc` }}>
            {t.navItems.map((n) => <li key={n}>{n}</li>)}
            <li><a className="px-4 py-2 rounded-full font-bold text-sm" style={{ background: t.accent, color: t.bg }}>{t.cta}</a></li>
          </ul>
          <div className="sm:hidden text-sm font-bold px-3 py-1.5 rounded-full" style={{ background: t.accent, color: t.bg }}>{t.cta}</div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <img src={`https://images.unsplash.com/${t.img}?auto=format&fit=crop&w=2400&q=80`} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: overlay }} />
        {/* Watermark — diagonal */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-[5]">
          <div className="text-white/15 font-black tracking-[0.3em] text-[14vw] -rotate-[20deg] whitespace-nowrap select-none" style={{ fontFamily: 'Inter, sans-serif', textShadow: '0 0 40px rgba(0,0,0,0.4)' }}>
            SAMPLE / 仮想
          </div>
        </div>
        {/* Corner badge */}
        <div className="absolute top-4 right-4 z-10 bg-[var(--color-pc-pink)] text-white text-[10px] lg:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          ※ これは架空のデザイン見本です
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1200px] mx-auto w-full px-5 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-xs lg:text-sm tracking-[0.4em] mb-4 font-bold" style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>
                {t.domain.split('.')[0].toUpperCase()} <span className="opacity-60">/ 仮想ドメイン</span>
              </div>
              <h1 className="text-4xl lg:text-7xl font-bold leading-[1.15] mb-6" style={{ color: t.fg }}>
                {t.copy}
              </h1>
              <p className="text-base lg:text-lg opacity-80 mb-8" style={{ color: t.fg }}>{t.sub}</p>
              <a className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-full" style={{ background: t.accent, color: t.bg }}>
                {t.cta} <ArrowRight className="w-4 h-4" />
              </a>
              <div className="mt-6 inline-block bg-black/40 text-white text-[11px] px-3 py-1.5 rounded backdrop-blur">
                ⚠️ ※ボタンは動作しません。仮想店舗のデザイン見本です。
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mid-page disclaimer strip */}
      <div className="bg-[#1d1d1f] text-white text-center text-xs py-3 px-4">
        <span className="font-bold text-[var(--color-pc-pink)]">【重要】</span> 当ページの「<b>{t.brand}</b>」は実在しない<u>架空の仮想{t.slug === 'event' ? 'イベント' : t.slug === 'recruit' || t.slug === 'corp' ? '会社' : '店舗'}</u>です。実在の人物・店舗・会社・サービスとは一切関係ありません。
      </div>

      {/* About */}
      <section className="py-20 lg:py-28 px-5 lg:px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="inline-block bg-[var(--color-pc-pink)]/10 border border-[var(--color-pc-pink)]/30 text-[var(--color-pc-pink)] text-[10px] font-bold px-3 py-1 rounded-full mb-4">※ 以下は架空の文章です</div>
          <div className="text-xs tracking-[0.4em] font-bold mb-4" style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>{t.about.label}</div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">{t.about.title}</h2>
          <div className="w-12 h-[2px] mx-auto mb-8" style={{ background: t.accent }} />
          <p className="text-base lg:text-lg leading-loose opacity-80">{t.about.body}</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 px-5 lg:px-8" style={{ background: `${t.fg}08` }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block bg-[var(--color-pc-pink)]/10 border border-[var(--color-pc-pink)]/30 text-[var(--color-pc-pink)] text-[10px] font-bold px-3 py-1 rounded-full mb-4">※ メニュー・価格はすべて架空の表示例です</div>
            <div className="text-xs tracking-[0.4em] font-bold mb-4" style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>{t.services.label}</div>
            <h2 className="text-3xl lg:text-5xl font-bold">{t.services.title}</h2>
            <div className="w-12 h-[2px] mx-auto mt-6" style={{ background: t.accent }} />
          </div>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
            {t.services.items.map((s) => (
              <div key={s.title} className="overflow-hidden group" style={{ background: t.bg, border: `1px solid ${t.fg}1a` }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={`https://images.unsplash.com/${s.img}?auto=format&fit=crop&w=800&q=80`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm opacity-75 leading-relaxed">{s.desc}</p>
                  {s.price && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: `${t.fg}1a` }}>
                      <span className="text-2xl font-bold" style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>{s.price}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 lg:py-28 px-5 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-[var(--color-pc-pink)]/10 border border-[var(--color-pc-pink)]/30 text-[var(--color-pc-pink)] text-[10px] font-bold px-3 py-1 rounded-full mb-4">※ 画像はイメージ素材です（架空）</div>
            <div className="text-xs tracking-[0.4em] font-bold mb-4" style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>GALLERY</div>
            <h2 className="text-3xl lg:text-4xl font-bold">ギャラリー</h2>
            <div className="w-12 h-[2px] mx-auto mt-6" style={{ background: t.accent }} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
            {t.gallery.map((g) => (
              <div key={g} className="relative aspect-square overflow-hidden">
                <img src={`https://images.unsplash.com/${g}?auto=format&fit=crop&w=600&q=80`} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">SAMPLE</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 lg:py-28 px-5 lg:px-8" style={{ background: `${t.fg}08` }}>
        <div className="max-w-[820px] mx-auto text-center">
          <div className="inline-block bg-[var(--color-pc-pink)]/10 border border-[var(--color-pc-pink)]/30 text-[var(--color-pc-pink)] text-[10px] font-bold px-3 py-1 rounded-full mb-6">⚠️ お客様の声はすべて架空です。実在の人物ではありません。</div>
          <div className="text-5xl lg:text-7xl mb-6" style={{ color: t.accent }}>“</div>
          <p className="text-xl lg:text-3xl font-bold leading-relaxed mb-8">{t.testimonial.quote}</p>
          <div className="text-sm opacity-75">
            <div className="font-bold">{t.testimonial.author}</div>
            <div className="opacity-75">{t.testimonial.role}</div>
          </div>
          <div className="mt-6 text-[10px] opacity-50">※ このレビューはデザイン見本のため、ポラリスクリエイティブが架空に作成したものです。</div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 lg:py-28 px-5 lg:px-8">
        <div className="max-w-[820px] mx-auto text-center">
          <div className="inline-block bg-[var(--color-pc-pink)]/10 border border-[var(--color-pc-pink)]/30 text-[var(--color-pc-pink)] text-[10px] font-bold px-3 py-1 rounded-full mb-4">⚠️ 住所・電話・営業時間はすべて架空です</div>
          <div className="text-xs tracking-[0.4em] font-bold mb-4" style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>CONTACT / ACCESS</div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-10">お気軽にどうぞ。</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-left mb-10">
            <div>
              <div className="text-[10px] tracking-widest font-bold mb-2" style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>ADDRESS <span className="text-[var(--color-pc-pink)]">※架空</span></div>
              <div className="text-sm">{t.contact.address}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest font-bold mb-2" style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>PHONE <span className="text-[var(--color-pc-pink)]">※架空</span></div>
              <div className="text-sm">{t.contact.phone}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest font-bold mb-2" style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>HOURS <span className="text-[var(--color-pc-pink)]">※架空</span></div>
              <div className="text-sm">{t.contact.hours}</div>
            </div>
          </div>
          <a className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-full" style={{ background: t.accent, color: t.bg }}>
            {t.cta} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-5 lg:px-8 text-center text-sm" style={{ borderColor: `${t.fg}1a` }}>
        <div className="font-bold mb-2 text-lg">{t.brand} <span className="text-[var(--color-pc-pink)] text-xs font-bold">（架空ブランド）</span></div>
        <div className="opacity-60 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>© {t.brand} — Sample design by Polaris Creative</div>
      </footer>

      {/* Final big disclaimer */}
      <div className="bg-[#1d1d1f] text-white py-8 px-5 lg:px-8">
        <div className="max-w-[820px] mx-auto text-center">
          <div className="inline-block bg-[var(--color-pc-pink)] text-white text-[10px] font-bold px-3 py-1 rounded-full mb-4 tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>IMPORTANT NOTICE / 重要な注意事項</div>
          <h3 className="text-lg lg:text-xl font-bold mb-3">本ページは架空の仮想{t.slug === 'event' ? 'イベント' : t.slug === 'recruit' || t.slug === 'corp' ? '会社' : '店舗'}デザイン見本です</h3>
          <p className="text-xs lg:text-sm opacity-80 leading-relaxed mb-2">
            「<b>{t.brand}</b>」というブランド名・店舗名・会社名は<u>実在しません</u>。
            掲載されている住所・電話番号・メールアドレス・営業時間・メニュー・価格・お客様の声・社員インタビュー・写真・ロゴ等、
            すべて<u>架空のデモデータ</u>です。実在する人物・団体・店舗・サービスとは一切関係ありません。
          </p>
          <p className="text-xs lg:text-sm opacity-80 leading-relaxed mb-4">
            このページは、株式会社<b className="text-[var(--color-pc-pink)]">ポラリスクリエイティブ</b>がHP制作のデザインサンプルとして作成したものであり、
            実際のサービス提供・予約・お問い合わせの受付は行っておりません。
          </p>
          <a href="#hp" className="inline-block bg-white text-[#1d1d1f] hover:bg-grad-brand hover:text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors">← ポラリスクリエイティブのHPに戻る</a>
        </div>
      </div>

      {/* Floating return CTA */}
      <a href="#hp" className="fixed bottom-5 right-5 z-50 bg-[#1d1d1f] hover:bg-grad-brand text-white px-5 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2">
        ← ポラリスのHPに戻る
      </a>

      {/* Floating sample badge — bottom-left */}
      <div className="fixed bottom-5 left-5 z-50 bg-[var(--color-pc-pink)] text-white px-3 py-2 rounded-full text-[10px] font-bold shadow-2xl flex items-center gap-1.5 max-w-[220px]">
        <span className="bg-white text-[var(--color-pc-pink)] rounded-full w-5 h-5 flex items-center justify-center text-[11px]">!</span>
        <span>このサイトは架空の仮想{t.slug === 'event' ? 'イベント' : t.slug === 'recruit' || t.slug === 'corp' ? '会社' : '店舗'}です</span>
      </div>
    </div>
  )
}

/* ============================================================
   Template Mockup (browser-chrome window preview)
   ============================================================ */
function MockupBrowser({ t, large = false }: { t: Template; large?: boolean }) {
  const titleSize = large ? 'text-3xl lg:text-5xl' : 'text-[10px] lg:text-sm'
  const subSize = large ? 'text-sm lg:text-base' : 'text-[6px] lg:text-[8px]'
  const padding = large ? 'p-6 lg:p-10' : 'p-2 lg:p-3'
  const heroH = large ? 'h-72 lg:h-96' : 'h-16 lg:h-20'
  return (
    <div className="w-full h-full bg-[#e8e8ea] flex flex-col" style={{ fontFamily: TPL_FONT[t.font] }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 bg-[#dcdce0] border-b border-[#c2c2c8]">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-[#fc615d]" />
          <span className="w-2 h-2 rounded-full bg-[#fdbc40]" />
          <span className="w-2 h-2 rounded-full bg-[#34c749]" />
        </div>
        <div className="flex-1 mx-2 bg-white rounded px-2 py-0.5 text-[8px] lg:text-[10px] text-neutral-600 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
          🔒 {t.domain}
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 relative overflow-hidden" style={{ background: t.bg, color: t.fg }}>
        {/* Nav strip */}
        <div className="flex items-center justify-between px-2 lg:px-4 py-1.5 lg:py-2.5 border-b" style={{ borderColor: `${t.fg}22` }}>
          <div className={`font-bold tracking-wide ${large ? 'text-base lg:text-lg' : 'text-[7px] lg:text-[9px]'}`}>
            {t.brand}
          </div>
          <div className={`hidden sm:flex items-center gap-2 lg:gap-4 ${large ? 'text-xs lg:text-sm' : 'text-[5px] lg:text-[7px]'}`} style={{ color: `${t.fg}99` }}>
            {t.navItems.map((n) => <span key={n}>{n}</span>)}
            <span className="px-2 py-0.5 rounded-full font-bold" style={{ background: t.accent, color: t.bg }}>{t.cta}</span>
          </div>
        </div>

        {/* Hero */}
        <div className={`relative ${heroH} overflow-hidden`}>
          <img
            src={`https://images.unsplash.com/${t.img}?auto=format&fit=crop&w=${large ? 1400 : 600}&q=80`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${t.bg}cc 0%, ${t.bg}33 60%, transparent 100%)` }} />
          <div className={`relative h-full flex items-center ${padding}`}>
            <div>
              <div className={`${subSize} mb-1 lg:mb-2 tracking-widest opacity-80`} style={{ color: t.accent, fontFamily: 'Inter, sans-serif' }}>
                {t.domain.split('.')[0].toUpperCase()}
              </div>
              <div className={`${titleSize} font-bold leading-tight`} style={{ color: t.fg }}>
                {t.copy}
              </div>
              {large && (
                <div className="mt-6">
                  <span className="inline-block px-6 py-3 rounded-full font-bold text-sm" style={{ background: t.accent, color: t.bg }}>
                    {t.cta} →
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sample sections */}
        <div className={`grid grid-cols-3 gap-1 lg:gap-2 ${padding}`}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-[4/3] rounded" style={{ background: `${t.fg}12`, border: `1px solid ${t.fg}1a` }}>
              {large && (
                <div className="p-3 lg:p-4">
                  <div className="h-1 w-1/2 rounded-full mb-2" style={{ background: t.accent }} />
                  <div className="h-1 w-full rounded-full mb-1" style={{ background: `${t.fg}33` }} />
                  <div className="h-1 w-4/5 rounded-full" style={{ background: `${t.fg}33` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TemplatesGrid() {
  return (
    <div className="mb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>TEMPLATES</div>
          <h3 className="text-2xl lg:text-3xl font-black">10業種のHPテンプレート</h3>
          <div className="text-sm text-[var(--color-pc-sub)] mt-2">クリックで実際のサイト見本（フル版）が開きます。御社用にカスタマイズして納品します。</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {HP_TEMPLATES.map((t, i) => (
          <a
            key={t.slug}
            href={`#/demo/${t.slug}`}
            className="group block text-left bg-[var(--color-pc-bg)] hover:shadow-xl transition-shadow p-2 rounded-lg"
          >
            <div className="aspect-[4/3] overflow-hidden rounded shadow-md ring-1 ring-black/5 group-hover:scale-[1.02] transition-transform relative">
              <MockupBrowser t={t} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-colors">
                <span className="opacity-0 group-hover:opacity-100 bg-white text-[var(--color-pc-ink)] px-3 py-1.5 text-xs font-bold rounded-full transition-opacity flex items-center gap-1">
                  サイトを見る <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
            <div className="px-1 pt-2.5 pb-1">
              <div className="text-[10px] tracking-widest text-[var(--color-pc-sub)]" style={{ fontFamily: 'Inter, sans-serif' }}>TEMPLATE {String(i + 1).padStart(2, '0')}</div>
              <div className="text-sm font-bold text-[var(--color-pc-ink)] group-hover:text-[var(--color-pc-pink)] transition-colors">{t.name}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   ④ HP Business (biggest)
   ============================================================ */
function SectionHP() {
  return (
    <section id="hp" className="py-24 lg:py-32 px-5 lg:px-12 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          en="04 — WEB BUSINESS"
          jp="HP制作・運用"
          sub="ヒアリングから設計・実装・公開・継続運用まで、ワンストップ内製。50社以上の制作実績、最短1週間納品。営業の現場で戦えるHPを、明朗会計でお届けします。"
        />

        {/* HP stats */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          <div className="bg-[var(--color-pc-bg)] p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>PRODUCTION</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>50</span>
              <span className="text-sm font-bold">社 +</span>
            </div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">制作実績</div>
          </div>
          <div className="bg-[var(--color-pc-bg)] p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-cyan)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>FASTEST</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>1</span>
              <span className="text-sm font-bold">週間〜</span>
            </div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">最短納品</div>
          </div>
          <div className="bg-[var(--color-pc-bg)] p-5 lg:p-6 text-center">
            <div className="text-[10px] tracking-widest text-[var(--color-pc-pink)] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>HALF PRICE</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>1/2</span>
            </div>
            <div className="text-[10px] text-[var(--color-pc-sub)] mt-1">業界相場の半額</div>
          </div>
        </div>

        {/* Price cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div className="bg-white border-2 border-[var(--color-pc-ink)] p-7 lg:p-9">
            <div className="text-xs tracking-[0.3em] text-[var(--color-pc-sub)] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>HP CREATION</div>
            <div className="text-sm text-[var(--color-pc-sub)] mb-1">HP制作（基本パッケージ）</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl lg:text-6xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>¥150,000</span>
              <span className="text-base">〜</span>
            </div>
            <div className="text-xs text-[var(--color-pc-sub)] mb-6">5ページ + 基本フォーム + 公開対応込み</div>
            <a href="#contact" className="block w-full bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white text-center py-3 text-sm font-bold rounded-full transition-colors">無料お見積もり →</a>
          </div>
          <div className="bg-[var(--color-pc-ink)] text-white p-7 lg:p-9">
            <div className="text-xs tracking-[0.3em] text-[var(--color-pc-pink)] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>HP MAINTENANCE</div>
            <div className="text-sm text-white/70 mb-1">HP継続管理（月額）</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl lg:text-6xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>¥30,000</span>
              <span className="text-base">〜 / 月</span>
            </div>
            <div className="text-xs text-white/70 mb-6">更新代行・サーバー監視・セキュリティ対応・分析レポート</div>
            <a href="#contact" className="block w-full bg-white hover:bg-[var(--color-pc-pink)] hover:text-white text-[var(--color-pc-ink)] text-center py-3 text-sm font-bold rounded-full transition-colors">運用について相談 →</a>
          </div>
        </div>

        {/* Templates */}
        <TemplatesGrid />

        {/* Options */}
        <div>
          <div className="mb-8">
            <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>ADD-ON</div>
            <h3 className="text-2xl lg:text-3xl font-black">追加オプション料金</h3>
          </div>
          <div className="border-t border-[var(--color-pc-line)]">
            {HP_OPTIONS.map((o) => (
              <div key={o.name} className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_auto] gap-4 items-center border-b border-[var(--color-pc-line)] py-4">
                <div className="text-sm lg:text-base">{o.name}</div>
                <div className="hidden lg:block text-xs text-[var(--color-pc-sub)] line-through" style={{ fontFamily: 'Inter, sans-serif' }}>{o.market}</div>
                <div className="text-sm lg:text-base font-bold text-[var(--color-pc-pink)]" style={{ fontFamily: 'Inter, sans-serif' }}>{o.price}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-[var(--color-pc-sub)] mt-4">
            ※ 業界相場のおよそ <span className="text-[var(--color-pc-pink)] font-bold">半額</span> で提供しています。要件に応じて個別お見積もりいたします。
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   ⑤ AI Consulting
   ============================================================ */
function SectionAI() {
  const items = [
    '業務自動化（メール・議事録・データ入力）',
    'AIチャットボット導入・カスタマイズ',
    '営業資料・提案書の自動生成',
    '既存業務のRAG化（社内文書AI検索）',
    'Claude / GPT API の業務組込み',
    '社内勉強会・運用定着支援',
  ]
  return (
    <section id="ai" className="py-24 lg:py-32 px-5 lg:px-12 bg-[var(--color-pc-bg)]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          en="05 — AI CONSULTING"
          jp="AI導入コンサル"
          sub="導入の検討から、ツール選定・実装・社内定着まで伴走。「使ってみたけど続かない」をなくす、現場目線のコンサルティング。"
        />
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          <div className="bg-white p-8 lg:p-10">
            <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>SCOPE OF SUPPORT</div>
            <h3 className="text-xl lg:text-2xl font-bold mb-6">提供内容（一例）</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {items.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-[var(--color-pc-pink)] mt-0.5 flex-shrink-0" /><span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <PriceCard unit="月額（伴走支援）" price="¥100,000" note="月次ミーティング + Slack 等での随時相談" />
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Why Polaris (Stats)
   ============================================================ */
function WhyPolaris() {
  return (
    <section className="py-20 lg:py-28 px-5 lg:px-12 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>WHY POLARIS</div>
          <h2 className="text-3xl lg:text-4xl font-black">なぜ、ポラリスが選ばれるのか</h2>
          <div className="w-12 h-[3px] bg-grad-brand mx-auto mt-5" />
          <p className="text-[var(--color-pc-sub)] text-sm lg:text-base mt-6 max-w-2xl mx-auto">
            Web × SNS × AI × 建設をワンストップで内製対応。<br />
            複数業者を間に挟まないから、速い・安い・責任が明確です。
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r) => (
            <div key={r.num} className="bg-[var(--color-pc-bg)] p-7 lg:p-8 hover:shadow-lg transition-shadow group">
              <div className="text-grad-brand text-3xl lg:text-4xl font-black mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{r.num}</div>
              <div className="text-lg lg:text-xl font-bold mb-3 group-hover:text-[var(--color-pc-pink)] transition-colors">{r.title}</div>
              <div className="text-sm text-[var(--color-pc-sub)] leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   News
   ============================================================ */
function News() {
  const cats: Record<string, string> = {
    NEWS:   'お知らせ',
    WORKS:  '実績',
    TOPICS: 'トピック',
  }
  return (
    <section className="py-20 lg:py-28 px-5 lg:px-12 bg-[var(--color-pc-bg)]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>INFORMATION</div>
            <h2 className="text-3xl lg:text-4xl font-black">お知らせ・実績</h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest border-b border-[var(--color-pc-ink)] pb-1 hover:text-[var(--color-pc-pink)] hover:border-[var(--color-pc-pink)] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            VIEW ALL <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <ul className="bg-white">
          {NEWS_ITEMS.map((n) => (
            <li key={n.title} className="border-b border-[var(--color-pc-line)] last:border-b-0">
              <a href="#" className="grid grid-cols-[100px_90px_1fr] lg:grid-cols-[140px_120px_1fr_auto] gap-4 items-center px-5 lg:px-7 py-5 hover:bg-[var(--color-pc-bg)] transition-colors group">
                <span className="text-xs lg:text-sm text-[var(--color-pc-sub)]" style={{ fontFamily: 'Inter, sans-serif' }}>{n.date}</span>
                <span className="text-[10px] tracking-widest font-bold border border-[var(--color-pc-ink)] text-[var(--color-pc-ink)] px-2 py-1 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {cats[n.cat]}
                </span>
                <span className="text-sm lg:text-base font-medium text-[var(--color-pc-ink)] group-hover:text-[var(--color-pc-pink)] transition-colors">{n.title}</span>
                <ChevronRight className="hidden lg:block w-4 h-4 text-[var(--color-pc-sub)]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ============================================================
   Contact (band + form)
   ============================================================ */
function ContactBand() {
  return (
    <section className="py-16 lg:py-20 px-5 lg:px-12 bg-[var(--color-pc-ink)] text-white">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="text-[var(--color-pc-pink)] text-xs tracking-[0.4em] font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>CONTACT US</div>
          <h2 className="text-3xl lg:text-5xl font-black leading-tight">
            まずは、お気軽に<br />ご相談ください。
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <a href={`tel:${COMPANY.tel}`} className="bg-white text-[var(--color-pc-ink)] hover:bg-[var(--color-pc-pink)] hover:text-white px-6 py-4 text-sm lg:text-base font-bold flex items-center gap-2 rounded-full transition-colors">
            <Phone className="w-4 h-4" />代表 {COMPANY.tel}
          </a>
          <a href={`tel:${COMPANY.telSales}`} className="bg-white text-[var(--color-pc-ink)] hover:bg-[var(--color-pc-cyan)] hover:text-white px-6 py-4 text-sm lg:text-base font-bold flex items-center gap-2 rounded-full transition-colors">
            <Phone className="w-4 h-4" />営業 {COMPANY.telSales}
          </a>
          <a href="#contact" className="bg-grad-brand hover:opacity-90 text-white px-7 py-4 text-sm lg:text-base font-bold flex items-center gap-2 rounded-full transition-opacity">
            お問い合わせフォーム <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section id="contact" className="py-24 lg:py-32 px-5 lg:px-12 bg-white">
      <div className="max-w-[900px] mx-auto">
        <SectionHeading en="CONTACT FORM" jp="お問い合わせ" sub="ご相談・お見積もり・採用・取材依頼など、お気軽にお送りください。担当者より24時間以内にご連絡いたします。" />
        {submitted ? (
          <div className="bg-[var(--color-pc-bg)] p-12 text-center">
            <div className="text-3xl font-black mb-3 text-[var(--color-pc-pink)]" style={{ fontFamily: 'Inter, sans-serif' }}>THANK YOU!</div>
            <div className="text-[var(--color-pc-ink)]">お問い合わせありがとうございます。</div>
            <div className="text-sm text-[var(--color-pc-sub)] mt-2">担当者より24時間以内にご連絡いたします。</div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">お名前 <span className="text-[var(--color-pc-pink)]">*</span></label>
                <input required className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors" placeholder="山田 太郎" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">会社名</label>
                <input className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors" placeholder="株式会社○○" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">電話番号 <span className="text-[var(--color-pc-pink)]">*</span></label>
                <input required type="tel" className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors" placeholder="090-0000-0000" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider">メール <span className="text-[var(--color-pc-pink)]">*</span></label>
                <input required type="email" className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors" placeholder="example@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 tracking-wider">ご相談内容</label>
              <select className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors">
                <option>SNS運用について</option>
                <option>アプリ開発について</option>
                <option>建設施工について</option>
                <option>HP制作・運用について</option>
                <option>AI導入コンサルについて</option>
                <option>採用について</option>
                <option>その他</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 tracking-wider">メッセージ</label>
              <textarea rows={6} className="w-full bg-[var(--color-pc-bg)] border border-transparent focus:border-[var(--color-pc-pink)] focus:bg-white px-4 py-3 text-sm focus:outline-none transition-colors resize-y" placeholder="お気軽にどうぞ。" />
            </div>
            <button type="submit" className="bg-[var(--color-pc-pink)] hover:bg-[var(--color-pc-pink-dark)] text-white py-4 text-sm font-bold tracking-widest rounded-full transition-colors flex items-center justify-center gap-2 mt-4">
              送信する <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  const cols = [
    {
      title: '事業内容',
      links: [
        { label: 'SNS事業', href: '#sns' },
        { label: 'アプリ開発', href: '#app' },
        { label: '建設事業', href: '#construction' },
        { label: 'HP制作・運用', href: '#hp' },
        { label: 'AI導入コンサル', href: '#ai' },
      ],
    },
    {
      title: '会社情報',
      links: [
        { label: '会社概要', href: '#company' },
        { label: 'お問い合わせ', href: '#contact' },
        { label: '採用情報（準備中）', href: '#' },
      ],
    },
    {
      title: 'サポート',
      links: [
        { label: 'プライバシーポリシー', href: '#' },
        { label: '特定商取引法に基づく表記', href: '#' },
        { label: 'サイトマップ', href: '#' },
      ],
    },
  ]
  return (
    <footer id="company" className="bg-white border-t border-[var(--color-pc-line)]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.3fr_2fr] gap-12 mb-12">
          <div>
            <Logo />
            <table className="mt-6 text-xs lg:text-sm text-[var(--color-pc-ink)]">
              <tbody>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">商号</th><td className="pb-2">{COMPANY.name}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">代表者</th><td className="pb-2">{COMPANY.director}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">設立</th><td className="pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{COMPANY.founded}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">法人番号</th><td className="pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{COMPANY.corpNumber}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">所在地</th><td className="pb-2">{COMPANY.zip}<br />{COMPANY.addr}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">電話</th><td className="pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{COMPANY.tel}<br />営業：{COMPANY.telSales}</td></tr>
                <tr><th className="text-left text-[var(--color-pc-sub)] font-medium align-top pr-4 pb-2 whitespace-nowrap">メール</th><td className="pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{COMPANY.email}</td></tr>
              </tbody>
            </table>
            <div className="flex gap-2 mt-5">
              {[
                { Icon: IconYouTube,   label: 'YouTube' },
                { Icon: IconTikTok,    label: 'TikTok' },
                { Icon: IconInstagram, label: 'Instagram' },
                { Icon: IconX,         label: 'X' },
                { Icon: IconLine,      label: 'LINE' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full border border-[var(--color-pc-line)] hover:bg-[var(--color-pc-pink)] hover:border-[var(--color-pc-pink)] hover:text-white text-[var(--color-pc-ink)] flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs tracking-[0.3em] text-[var(--color-pc-sub)] font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{c.title.toUpperCase()}</div>
                <ul className="space-y-2.5 text-sm">
                  {c.links.map((l) => (
                    <li key={l.label}><a href={l.href} className="text-[var(--color-pc-ink)] hover:text-[var(--color-pc-pink)] transition-colors">{l.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-[var(--color-pc-line)] pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[var(--color-pc-sub)]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />{COMPANY.zip} {COMPANY.addr}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif' }}>© 2026 {COMPANY.nameEn} All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   App
   ============================================================ */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash)
      // scroll to top when route changes (demo enter/exit)
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  // demo slug if hash is #/demo/<slug>
  const m = hash.match(/^#\/demo\/([\w-]+)/)
  return m ? m[1] : null
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const demoSlug = useHashRoute()
  const demoTemplate = demoSlug ? HP_TEMPLATES.find((t) => t.slug === demoSlug) : null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Demo route: render full virtual website
  if (demoTemplate) {
    if (demoTemplate.slug === 'restaurant') return <RestaurantPremiumDemo />
    if (demoTemplate.slug === 'salon') return <SalonPremiumDemo />
    if (demoTemplate.slug === 'clinic') return <ClinicPremiumDemo />
    if (demoTemplate.slug === 'workshop') return <BuilderPremiumDemo />
    if (demoTemplate.slug === 'workshop-modern') return <BuilderModernDemo />
    if (demoTemplate.slug === 'workshop-industrial') return <BuilderIndustrialDemo />
    if (demoTemplate.slug === 'workshop-hitech') return <BuilderHitechDemo />
    if (demoTemplate.slug === 'workshop-reform') return <BuilderReformDemo />
    if (demoTemplate.slug === 'workshop-heritage') return <BuilderHeritageDemo />
    if (demoTemplate.slug === 'law') return <LawPremiumDemo />
    if (demoTemplate.slug === 'school') return <SchoolPremiumDemo />
    if (demoTemplate.slug === 'ec') return <ShopPremiumDemo />
    if (demoTemplate.slug === 'corp') return <CorpPremiumDemo />
    if (demoTemplate.slug === 'recruit') return <RecruitPremiumDemo />
    if (demoTemplate.slug === 'event') return <EventPremiumDemo />
    return <DemoSite t={demoTemplate} />
  }

  return (
    <div className="bg-white text-[var(--color-pc-ink)]">
      <Header onMenu={() => setOpen(true)} scrolled={scrolled} />
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <HeroCarousel />
      <BusinessIcons />
      <SectionSNS />
      <SectionApp />
      <SectionConstruction />
      <SectionHP />
      <SectionAI />
      <WhyPolaris />
      <News />
      <ContactBand />
      <ContactForm />
      <Footer />
    </div>
  )
}
