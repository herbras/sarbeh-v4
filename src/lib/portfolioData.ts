// Portfolio data imported from old portfolio
import QlmOne from "@/assets/Canvas.png";
import Amikom from "@/assets/amikom.jpeg";
import arbainJpg from "@/assets/arbain.jpg";
import compressJpg from "@/assets/compressor.jpg";
import eklinikJpg from "@/assets/eklinik.jpg";
import jadwalKRLJpg from "@/assets/jadwalKRL.jpg";
import kajianJpg from "@/assets/kajian.jpg";
import murunahJpg from "@/assets/murunah.jpg";
import presensiJpg from "@/assets/presensi.jpg";
import shortenerJpg from "@/assets/shortener.jpg";
import yayasanNaikKelasJpg from "@/assets/yayasanNaikKelas.jpg";
import DekaInsight from "@/assets/DekaInsight.jpg";
import FounderPlus from "@/assets/fonderPlus.png";
import Karya2019 from "@/assets/2019.jpg";
import Referensi from "@/assets/Referensi.jpg";
import maylearning from "@/assets/maylearning.jpg";
import Pesan from "@/assets/pesan.png";
import Taaruf from "@/assets/taaruf.jpg";
import Wedding from "@/assets/weddingStuff.jpg";

export type PortfolioCategory = "web3" | "ai" | "islamic" | "web" | "tools" | "game";

export interface Portfolio {
  title: string;
  description: string;
  productUrl: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  isPrivate: boolean;
  category: PortfolioCategory;
}

const imageZikr =
  "https://images.unsplash.com/photo-1630356630814-89ac02c9df80?q=80&w=294&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Web3 & Blockchain images
const imageSolanaIncinerator =
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=60";
const imageTokenAnalyzer =
  "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&auto=format&fit=crop&q=60";
const imageLXPGraph =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60";

// Business & Automation images
const imageTWAApp =
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=60";
const imageSEOAutomation =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60";
const imageFBAdsAutomation =
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&q=60";
const imageWhatsAppCRM =
  "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&auto=format&fit=crop&q=60";

export const portfolios: Portfolio[] = [
  // === BUSINESS AUTOMATION & SAAS ===
  {
    title: "SEO Executive Dashboard",
    description:
      "Internal automation app yang mengintegrasikan Google Search Console + Microsoft Clarity untuk menghasilkan executive report dengan sleek design. Dilengkapi business analytics untuk tracking performance SEO dan user behavior insights secara real-time.",
    productUrl: "#",
    tags: ["GSC API", "Clarity API", "Analytics", "Executive Report", "Python", "React"],
    imageSrc: imageSEOAutomation,
    imageAlt: "SEO Executive Dashboard with GSC and Clarity integration",
    isPrivate: true,
    category: "ai",
  },
  {
    title: "FB Ads Sales Automation",
    description:
      "Sistem otomasi penjualan autonomous yang belajar dari Facebook Ads performance. Menggunakan AI untuk mengoptimalkan sales flow secara otomatis, dari lead generation hingga conversion tracking dengan machine learning predictions.",
    productUrl: "#",
    tags: ["Facebook Ads API", "AI/ML", "Sales Automation", "Python", "Autonomous Agent"],
    imageSrc: imageFBAdsAutomation,
    imageAlt: "FB Ads Sales Automation Dashboard",
    isPrivate: true,
    category: "ai",
  },
  {
    title: "WhatsApp CRM Extension",
    description:
      "Chrome extension CRM untuk WhatsApp yang digunakan tim sales. Minimum Lovable Product dengan fitur tracking conversation, lead management, dan quick replies. Designed for simplicity dengan penggunaan yang minimal learning curve.",
    productUrl: "#",
    tags: ["Chrome Extension", "WhatsApp", "CRM", "JavaScript", "Sales Tools"],
    imageSrc: imageWhatsAppCRM,
    imageAlt: "WhatsApp CRM Chrome Extension",
    isPrivate: true,
    category: "tools",
  },
  {
    title: "Sarbeh Mobile App (TWA)",
    description:
      "Android app menggunakan Trusted Web Activity (TWA) dan Expo untuk nurturing users yang locked ke web platform. Memberikan native-like experience dengan push notifications dan offline support untuk engagement yang lebih baik.",
    productUrl: "#",
    tags: ["TWA", "Expo", "Android", "React Native", "PWA", "Push Notifications"],
    imageSrc: imageTWAApp,
    imageAlt: "Sarbeh Mobile App TWA",
    isPrivate: true,
    category: "tools",
  },
  // === WEB3 & BLOCKCHAIN ===
  {
    title: "Solana Token Incinerator",
    description:
      "CLI tool untuk burn/close unused token accounts di Solana blockchain dan reclaim locked SOL. Membantu mengoptimalkan wallet dengan menghapus token accounts yang tidak terpakai dan mengembalikan rent SOL yang terkunci di setiap asset. Digunakan secara programmatic untuk manajemen wallet pribadi.",
    productUrl: "#",
    tags: ["Solana", "Web3", "Rust", "TypeScript", "Blockchain", "CLI"],
    imageSrc: imageSolanaIncinerator,
    imageAlt: "Solana Token Incinerator CLI Tool",
    isPrivate: true,
    category: "web3",
  },
  {
    title: "Web3 Token Risk Analyzer",
    description:
      "AI-powered tool untuk menganalisis risiko token crypto. Fitur: Liquidity lock detection, Top holders concentration analysis, Contract verification status, Social media sentiment analysis, Honeypot detection. Output berupa Risk Score (1-10) dengan rekomendasi keamanan.",
    productUrl: "#",
    tags: ["AI", "Web3", "Solana", "DeFi", "Risk Analysis", "Python", "LLM"],
    imageSrc: imageTokenAnalyzer,
    imageAlt: "Web3 Token Risk Analyzer Dashboard",
    isPrivate: true,
    category: "web3",
  },
  // === AI & EDUCATION ===
  {
    title: "Sleek Graph LXP",
    description:
      "Learning Experience Platform (LXP) berbasis knowledge graph mengikuti prinsip Obsidian Zettelkasten. Platform ini dikembangkan di PT Cahaya Petunjuk Inovasi untuk menjadi pengungkit AI recommendation system. Memungkinkan pembelajaran terstruktur dengan koneksi antar konsep yang visual dan AI-driven suggestions.",
    productUrl: "#",
    tags: ["Knowledge Graph", "AI", "Zettelkasten", "LXP", "Education", "React", "Neo4j"],
    imageSrc: imageLXPGraph,
    imageAlt: "Sleek Graph Learning Experience Platform",
    isPrivate: true,
    category: "ai",
  },
  // === ORIGINAL PORTFOLIOS ===
  {
    title: "Private Company",
    description:
      "Proyek optimisasi website untuk Klien, melibatkan integrasi API Instagram dan YouTube ke WordPress, optimisasi SEO, dan peningkatan kecepatan halaman. Fokus utama adalah meningkatkan visibilitas online dan pengalaman pengguna melalui konten dinamis dari media sosial dan performa website yang lebih baik.",
    productUrl: "#",
    tags: [
      "WordPress",
      "API Integration",
      "Instagram API",
      "YouTube API",
      "SEO Optimization",
      "Page Speed Optimization",
      "PHP",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1686061594183-8c864f508b00?w=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U0VPfGVufDB8fDB8fHww",
    imageAlt:
      "Screenshot halaman utama website NusantaraKreatif menampilkan integrasi feed Instagram dan YouTube serta desain yang dioptimalkan",
    isPrivate: true,
    category: "web",
  },
  {
    title: "Zikir & Doa",
    description:
      "Aplikasi mobile dan web yang menyediakan panduan zikir, doa, dan konseling spiritual berbasis AI. Fitur utama meliputi zikir pagi dan sore, penjelasan asma wa sifat Allah, panduan adab berdoa, kumpulan doa, dan konseling AI yang menggunakan teknologi RAG (Retrieval-Augmented Generation) untuk memberikan nasihat berdasarkan sumber-sumber Islam terpercaya.",
    productUrl: "https://zikir-doa.example.com/",
    tags: [
      "Astro.js",
      "Hono.js",
      "Ionic",
      "OpenAI API",
      "RAG",
      "SQLite",
      "Auth",
    ],
    imageSrc: imageZikr,
    imageAlt:
      "Tampilan antarmuka Aplikasi Zikir & Doa menampilkan menu utama dengan opsi Zikir, Asma wa Sifat, Adab Doa, dan Konseling Doa AI",
    isPrivate: true,
    category: "islamic",
  },
  {
    title: "Kajian",
    description:
      "Platform digital inovatif untuk menghubungkan umat Islam dengan kajian-kajian Islam di berbagai masjid. Fitur utama meliputi pencarian kajian, informasi detail (judul, tempat, jadwal, peta), dan kategorisasi berdasarkan jenis dan bidang ilmu. Dikembangkan menggunakan teknologi modern untuk performa optimal dan pengalaman pengguna yang mulus.",
    productUrl: "https://kajian.sarbeh.com/",
    tags: ["Appscript", "HTMX", "AJAX", "AlpineJS", "AstroJS"],
    imageSrc: kajianJpg,
    imageAlt:
      "Tampilan antarmuka Platform Kajian menampilkan daftar kajian Islam dengan detail lokasi dan waktu",
    isPrivate: false,
    category: "islamic",
  },
  {
    title: "Dekainsight",
    description:
      "Responsive CMS with upgraded CKEditor, API-connected image uploads, and 'Related Blog' feature. Optimized PHP code and database relations for enhanced performance and security",
    productUrl: "#",
    tags: ["CI", "PHP", "MYSQL", "CKEditor", "CSS", "Bootstrap"],
    imageSrc: DekaInsight,
    imageAlt: "DekaInsight Screenshot web",
    isPrivate: true,
    category: "web",
  },
  {
    title: "FounderPlus",
    description:
      "Mengembangkan academy.founderplus.id dan event.founderplus.id beserta internal apps. React-based web app dengan responsive design dan i18n support. Optimisasi performa mengurangi bundle size 75% dan meningkatkan load times secara signifikan.",
    productUrl: "https://founderplus.id/?utm_source=ibrahim&utm_medium=portfolio&utm_campaign=sarbeh",
    tags: ["ReactJS", "TailwindCSS", "i18n", "DateFns", "TanstackQuery"],
    imageSrc: FounderPlus,
    imageAlt: "Landing Page FounderPlus",
    isPrivate: false,
    category: "web",
  },
  {
    title: "Nasihat Syaikh Ashim",
    description:
      "Nasihat bijak dari Prof. Dr. Alqaryooti untuk memperkuat hubungan Anda. Yuk, baca dan renungkan bersama!",
    productUrl: "https://nasihatpernikahan.sarbeh.com/",
    tags: ["HonoJS", "AlpineJS", "Python", "TailwindCSS", "HTMX", "SQLITE"],
    imageSrc: Pesan,
    imageAlt: "Pesan Pernikanan Image",
    isPrivate: false,
    category: "islamic",
  },
  {
    title: "Firda & Sarbeh Wedding",
    description:
      "Undangan Digital Pernikahan Ibrahim dan Firda, dilengkapi dengan komentar serta generator undangan WA",
    productUrl: "https://firda.sarbeh.com/",
    tags: ["AstroJS", "Alpinejs", "TailwindCSS", "sqlite"],
    imageSrc: Wedding,
    imageAlt: "MayLearnings Image",
    isPrivate: false,
    category: "web",
  },
  {
    title: "May Learnings Dashboard",
    description: "Dashboard Analisis Twitter Campaign Milik mas Narawastu",
    productUrl: "https://maylearnings.sarbeh.com/",
    tags: ["Hono", "Python", "Alpinejs", "ChartJS", "HTMX"],
    imageSrc: maylearning,
    imageAlt: "MayLearnings Image",
    isPrivate: false,
    category: "tools",
  },
  {
    title: "AI Chat Taaruf",
    description:
      "Perantara Taaruf dengan Text Embed ke CV dan Jawaban-jawaban yang sering ditanyakan ketika Taaruf.",
    productUrl: "https://taaruf.sarbeh.com/",
    tags: ["Worker", "Llama 3 8b", "HonoJS", "HTMX"],
    imageSrc: Taaruf,
    imageAlt: "AI Chat Taaruf",
    isPrivate: false,
    category: "ai",
  },
  {
    title: "Referensi Kutub",
    description: "Referensi Kutub Mahzab Syafii dan Hanbali",
    productUrl: "https://dub.sh/referes",
    tags: ["Cloudflare Worker", "D1 Sqlite", "HonoJS", "HTMX"],
    imageSrc: Referensi,
    imageAlt: "Screenshot Referensi Kutub Mahzab Syafii dan Hanbali",
    isPrivate: false,
    category: "islamic",
  },
  {
    title: "Arbain",
    description: "Hadits Arbain Nawawi dengan terjemahan dan penjelasan",
    productUrl: "https://dub.sh/arbainIbrahim",
    tags: ["NuxtJS", "TailwindCss", "Cloudflare Page", "VueJS"],
    imageSrc: arbainJpg,
    imageAlt: "Deskripsi gambar Arbain",
    isPrivate: false,
    category: "islamic",
  },
  {
    title: "Eklinik",
    description: "Sistem Manajemen Klinik dengan fitur lengkap untuk pengelolaan pasien dan jadwal dokter",
    productUrl: "#",
    tags: ["ReactJS", "Postgre", "NextJS", "TailwindCSS"],
    imageSrc: eklinikJpg,
    imageAlt: "Deskripsi gambar Eklinik",
    isPrivate: true,
    category: "web",
  },
  {
    title: "Murunah",
    description: "Landing page untuk Murunah Kreatif Indonesia dengan desain modern dan responsif",
    productUrl: "https://www.murunah.sarbeh.com/",
    tags: ["AlpineJS", "AstroJS", "TailwindCSS"],
    imageSrc: murunahJpg,
    imageAlt: "Deskripsi gambar Murunah",
    isPrivate: false,
    category: "web",
  },
  {
    title: "Presensi",
    description: "Sistem presensi digital dengan QR code dan laporan kehadiran",
    productUrl: "https://presensi.sarbeh.com/",
    tags: ["AlpineJS", "SvelteJS", "AstroJS", "TailwindCSS"],
    imageSrc: presensiJpg,
    imageAlt: "Deskripsi gambar Presensi",
    isPrivate: false,
    category: "tools",
  },
  {
    title: "Shortener",
    description: "URL shortener dengan statistik klik dan custom alias",
    productUrl: "https://qlink.sarbeh.com/",
    tags: ["MYSQL", "SvelteJS", "AstroJS", "TailwindCSS"],
    imageSrc: shortenerJpg,
    imageAlt: "Deskripsi gambar Shortener",
    isPrivate: false,
    category: "tools",
  },
  {
    title: "Yayasan Naik Kelas",
    description: "Platform edukasi dengan video pembelajaran dan kuis interaktif",
    productUrl: "https://class.sarbeh.com/",
    tags: ["SvelteJS", "AstroJS", "TailwindCSS", "Appscript"],
    imageSrc: yayasanNaikKelasJpg,
    imageAlt: "Deskripsi gambar Yayasan Naik Kelas",
    isPrivate: false,
    category: "ai",
  },
  {
    title: "Compress",
    description: "Kompresi gambar online dengan WebWorker untuk performa optimal",
    productUrl: "https://ultraimage.sarbeh.com/",
    tags: ["WebWorker", "Sveltejs", "AstroJS", "TailwindCSS"],
    imageSrc: compressJpg,
    imageAlt: "Deskripsi gambar Compress",
    isPrivate: false,
    category: "tools",
  },
  {
    title: "Jadwal KRL",
    description: "Aplikasi jadwal kereta KRL Jabodetabek dengan pencarian rute",
    productUrl: "https://krl.sarbeh.com/?departure=YK&arrival=LPN",
    tags: ["SvelteKit", "TailwindCSS"],
    imageSrc: jadwalKRLJpg,
    imageAlt: "Deskripsi gambar Jadwal KRL",
    isPrivate: false,
    category: "tools",
  },
  {
    title: "Qlm One",
    description: "Kumpulan Link dengan Canvas Generator Ucapan Hari Raya",
    productUrl: "https://kartu.sarbeh.com/",
    tags: ["Svelte", "UnoCss", "Canvas", "AstroJS"],
    imageSrc: QlmOne,
    imageAlt: "Deskripsi gambar Arbain",
    isPrivate: false,
    category: "islamic",
  },
  {
    title: "Sistem Perpajakan AMIKOM",
    description:
      "Membuat UI Frontend Sistem Perpajakan Universitas AMIKOM 2023",
    productUrl: "#",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
    imageSrc: Amikom,
    imageAlt: "Deskripsi gambar AMIKOM",
    isPrivate: true,
    category: "web",
  },
  {
    title: "2019 Craft",
    description:
      "Karya online 2019 saya di github hasil belajar CSS dan javascript",
    productUrl: "https://2019.sarbeh.com/",
    tags: ["Html", "CSS", "Javascript"],
    imageSrc: Karya2019,
    imageAlt: "Karya online 2019 ",
    isPrivate: false,
    category: "web",
  },
  {
    title: "Pokemon Go Clone",
    description:
      "Interactive Pokemon catching game using Geolocation Web API, Leaflet for mapping, and React. Catch Pokemon near your real location with Haversine distance calculations and PokeAPI integration.",
    productUrl: "/crafts/pokemon",
    tags: ["React", "Leaflet", "Geolocation API", "PokeAPI", "TypeScript", "Framer Motion"],
    imageSrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    imageAlt: "Pokemon Go Clone interactive game",
    isPrivate: false,
    category: "game",
  },
  {
    title: "Elemental Othello",
    description:
      "A retro 2D pixel-art Othello game with unique Elemental Burst mechanic. Features Minimax AI with alpha-beta pruning, Web Audio synthesizer, and bilingual support (EN/ID).",
    productUrl: "/crafts/othello",
    tags: ["Phaser 3", "React", "TypeScript", "Minimax AI", "Pixel Art", "Web Audio"],
    imageSrc: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&auto=format&fit=crop&q=60",
    imageAlt: "Elemental Othello pixel art board game",
    isPrivate: false,
    category: "game",
  },
  {
    title: "Tizzy - Fizzy Timer",
    description:
      "Personal productivity timer terintegrasi dengan Fizzy untuk tracking progress kerja tim. Fitur: Focus Mode dengan countdown/stopwatch, Weekly Report dengan chart dan export ke PNG/Excel/WhatsApp, filter per team member, dan integrasi boards/cards Fizzy. Dibangun sebagai PWA lalu dikonversi ke Android APK (TWA).",
    productUrl: "#",
    tags: ["TanStack Start", "React", "Convex", "TWA", "PWA", "Recharts", "IndexedDB"],
    imageSrc: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&auto=format&fit=crop&q=60",
    imageAlt: "Tizzy Fizzy Timer productivity app",
    isPrivate: true,
    category: "tools",
  },
];
