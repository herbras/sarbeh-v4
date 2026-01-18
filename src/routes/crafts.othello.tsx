import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { Link } from "react-router";
import { OGMeta } from "@/components/OGMeta";

// Lazy load OthelloGame to avoid SSR issues with Phaser
const OthelloGame = lazy(() =>
  import("@/components/crafts/Othello").then((mod) => ({ default: mod.OthelloGame }))
);

export default function CraftsOthello() {
  return (
    <>
      <OGMeta
        title="Elemental Othello - Interactive Craft"
        description="A retro 2D pixel-art Othello game with Elemental Burst mechanic and AI opponent. Built with Phaser 3 and React."
        path="/crafts/othello"
      />

      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <Link
              to="/work"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Work
            </Link>

            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 gradient-text">
              Elemental Othello
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Game strategi papan klasik terinspirasi dari Othello/Reversi dengan sentuhan unik "Elemental Burst".
              Tujuannya sederhana: miliki bidak terbanyak saat papan penuh. Lawan AI yang cerdas dan kuasai papan!
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["Phaser 3", "React", "TypeScript", "Minimax AI", "Pixel Art", "Web Audio"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Othello Game */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <Suspense
              fallback={
                <div className="w-full h-[600px] rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading Elemental Othello...</p>
                  </div>
                </div>
              }
            >
              <OthelloGame />
            </Suspense>
          </motion.div>

          {/* How to Play - Modern Card Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <h2 className="text-3xl font-semibold mb-8">Cara Bermain</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white/90">1</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-2">Letakkan Bidak</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Klik pada sel yang di-highlight untuk meletakkan bidakmu. Kamu harus mengapit bidak lawan agar langkahmu valid.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white/90">2</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-2">Balik Bidak Lawan</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Saat kamu mengapit bidak lawan (horizontal, vertikal, atau diagonal), bidak tersebut berubah menjadi warnamu.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white/90">3</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-2">Gunakan Elemental Burst</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Kemampuan spesial sekali pakai! Aktifkan untuk membalik area 3x3 menjadi warnamu, melewati aturan normal.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Highlights - Modern Card Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <h2 className="text-3xl font-semibold mb-8">Technical Highlights</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Phaser 3", desc: "Game engine with pixel-art rendering", color: "bg-blue-100 dark:bg-blue-900/30" },
                { title: "Minimax AI", desc: "Alpha-beta pruning for Hard mode", color: "bg-purple-100 dark:bg-purple-900/30" },
                { title: "Positional Matrix", desc: "Strategic weight for AI decisions", color: "bg-pink-100 dark:bg-pink-900/30" },
                { title: "Web Audio API", desc: "Retro synthesizer sound effects", color: "bg-orange-100 dark:bg-orange-900/30" },
                { title: "Bilingual", desc: "English and Indonesian support", color: "bg-green-100 dark:bg-green-900/30" },
                { title: "Responsive UI", desc: "Mobile bottom sheet controls", color: "bg-cyan-100 dark:bg-cyan-900/30" },
              ].map((item) => (
                <div key={item.title} className={`${item.color} rounded-xl p-4 border border-border/50`}>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export function meta() {
  return [
    { title: "Elemental Othello - sarbeh crafts" },
    { name: "description", content: "A retro pixel-art Othello game with Elemental Burst mechanic and AI opponent" },
  ];
}
