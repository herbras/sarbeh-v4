import { Player } from "../types";
import type { Language } from "../types";
import { TRANSLATIONS } from "./translations";

const SAGE_QUOTES = {
  en: {
    start: [
      "The board is a blank canvas. Paint your destiny.",
      "Focus. The first stones set the rhythm of the war.",
      "A new duel begins. Let the elements guide you."
    ],
    winning: [
      "Your power flows like a raging river!",
      "An impressive formation. You dominate the field.",
      "The shadows retreat before your advance!",
      "Crushing! But do not let arrogance be your downfall."
    ],
    losing: [
      " The winds are against you, but the stone remains.",
      "Patience... a single move can turn the tide.",
      "Do not despair. The corner stones still await.",
      "Your position is fragile. Strengthen your defense."
    ],
    close: [
      "A tight battle! The spirits hold their breath.",
      "Perfect balance. Who will strike the decisive blow?",
      "Neck and neck. Every tile counts now.",
      "Tension rises... the board is nearly full."
    ],
    special: [
      "ELEMENTAL BURST! The earth trembles at your command!",
      "A devastating technique! The board is reshaped!",
      "By the ancient laws! What power!",
      "Chaos unleashed! The tiles obey your will!"
    ],
    capture: [
      "A swift capture.",
      "The rows align in your favor.",
      "Excellent maneuver.",
      "You claim their ground."
    ],
    generic: [
      "Hmm... interesting choice.",
      "I see patterns forming in the void.",
      "The spirits are watching.",
      "Calculated.",
      "Proceed with caution."
    ]
  },
  id: {
    start: [
      "Papan adalah kanvas kosong. Lukis takdirmu.",
      "Fokus. Batu pertama menentukan irama perang.",
      "Duel baru dimulai. Biarkan elemen menuntunmu."
    ],
    winning: [
      "Kekuatanmu mengalir deras seperti sungai!",
      "Formasi yang hebat. Kamu menguasai medan.",
      "Bayangan mundur menghadapi langkahmu!",
      "Hancurkan! Tapi jangan sampai kesombongan menjatuhkanmu."
    ],
    losing: [
      "Angin tak berpihak padamu, tapi batu tetap kokoh.",
      "Sabar... satu langkah bisa membalikkan keadaan.",
      "Jangan putus asa. Batu sudut masih menunggu.",
      "Posisi rapuh. Perkuat pertahananmu."
    ],
    close: [
      "Pertarungan sengit! Para roh menahan nafas.",
      "Keseimbangan sempurna. Siapa yang akan menyerang?",
      "Sangat ketat. Setiap ubin berharga sekarang.",
      "Ketegangan meningkat... papan hampir penuh."
    ],
    special: [
      "LEDAKAN ELEMEN! Bumi bergetar atas perintahmu!",
      "Teknik yang menghancurkan! Papan terbentuk ulang!",
      "Demi hukum kuno! Kekuatan apa ini!",
      "Kekacauan terjadi! Ubin mematuhi kehendakmu!"
    ],
    capture: [
      "Tangkapan yang cepat.",
      "Barisan berpihak padamu.",
      "Manuver yang bagus.",
      "Kamu merebut tanah mereka."
    ],
    generic: [
      "Hmm... pilihan menarik.",
      "Aku melihat pola terbentuk dalam kehampaan.",
      "Para roh sedang menonton.",
      "Terperinci.",
      "Lanjutkan dengan hati-hati."
    ]
  }
};

export const getSageCommentary = async (
  scoreBlack: number,
  scoreWhite: number,
  lastMovePlayer: Player,
  isSpecialUsed: boolean,
  language: Language
): Promise<string> => {
  // Simulate a tiny "thinking" delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const quotes = SAGE_QUOTES[language];

  if (isSpecialUsed) {
    return getRandom(quotes.special);
  }

  const diff = scoreBlack - scoreWhite;
  const total = scoreBlack + scoreWhite;

  if (total < 8) return getRandom(quotes.start);

  const absDiff = Math.abs(diff);

  // Close game
  if (absDiff < 6) return getRandom(quotes.close);

  // Winning/Losing logic
  const isBlackLeading = diff > 0;
  const isPlayerBlack = lastMovePlayer === Player.Black;

  // Winning comment
  if ((isPlayerBlack && isBlackLeading && absDiff > 10) || (!isPlayerBlack && !isBlackLeading && absDiff > 10)) {
      return getRandom(quotes.winning);
  }

  // Losing comment
  if ((isPlayerBlack && !isBlackLeading && absDiff > 10) || (!isPlayerBlack && isBlackLeading && absDiff > 10)) {
      return getRandom(quotes.losing);
  }

  return getRandom(Math.random() > 0.5 ? quotes.capture : quotes.generic);
};

export const getSageRules = async (language: Language): Promise<string> => {
   return TRANSLATIONS[language].rulesText;
};

function getRandom(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}
