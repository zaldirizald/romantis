/**
 * ============================================================
 *  QUESTIONS — SEMUA PERTANYAAN "VITA TEST™" ADA DI FILE INI.
 * ============================================================
 *  Format:
 *
 *  {
 *    question: "teks pertanyaan",
 *    options: ["A", "B", "C", "D"],
 *    answer: 0,   // index jawaban "benar" (mulai dari 0)
 *    reactions: {
 *      correct: ["reaction jika benar"],
 *      wrong: ["reaction jika salah"],
 *    },
 *    safeIndex: 2, // opsional: index jawaban "aman/diplomatis"
 *  }
 * ============================================================
 */

export type Question = {
  question: string;
  options: string[];
  answer: number;
  safeIndex?: number;
  reactions: {
    correct: string[];
    wrong: string[];
  };
};

export const questions: Question[] = [
  {
    question: "Kalau kita lagi bingung mau makan apa, siapa yang paling sering bilang 'terserah'?",
    options: ["Vita", "Zaldi", "Dua-duanya", "Nggak ada yang mau ngaku"],
    answer: 0,
    reactions: {
      correct: ["Nah.", "Masih inget ternyata."],
      wrong: ["Yakin?", "Kayaknya kita perlu ngobrol lagi.", "Hmm... dicatat."],
    },
  },
  {
    question: "Kalau Zaldi bilang 'iya gapapa', kemungkinan sebenarnya...",
    options: [
      "Beneran gapapa",
      "Jelas nggak gapapa",
      "Tunggu beberapa menit",
      "Jangan ditanya",
    ],
    answer: 1,
    safeIndex: 0,
    reactions: {
      correct: ["Oke, aman.", "Kamu paham."],
      wrong: ["Yakin?", "Hmm... dicatat.", "Kayaknya kita perlu ngobrol lagi."],
    },
  },
  {
    question: "Kalau kita nyasar, siapa yang paling mungkin bilang 'aku tahu jalan' padahal belum tentu?",
    options: ["Vita", "Zaldi", "Dua-duanya", "Langsung buka Maps"],
    answer: 1,
    safeIndex: 2,
    reactions: {
      correct: ["Nah.", "Jujur sekali."],
      wrong: ["Yakin?", "Hmm... dicatat."],
    },
  },
  {
    question: "Kalau disuruh pilih tempat makan, kemungkinan kita...",
    options: [
      "Langsung tahu",
      "Muter-muter dulu",
      "Tanya 'terserah kamu'",
      "Ujung-ujungnya makan di tempat biasa",
    ],
    answer: 3,
    safeIndex: 1,
    reactions: {
      correct: ["Klasik.", "Terlalu akurat."],
      wrong: ["Optimis sekali.", "Hmm... dicatat."],
    },
  },
  {
    question: "Kalau tiba-tiba punya uang Rp10 juta, kemungkinan pertama yang dilakukan...",
    options: [
      "Tabungan dulu",
      "Beli sesuatu yang diingin lama",
      "Traktir yang satu makan enak",
      "Mikir semalaman, ujungnya nggak jadi dipakai",
    ],
    answer: 3,
    reactions: {
      correct: ["Terlalu realistis.", "Sekali baca langsung paham."],
      wrong: ["Yakin?", "Jawaban yang cukup berani.", "Hmm... dicatat."],
    },
  },
  {
    question: "Kalau ada lomba paling lama pilih makanan, siapa yang menang?",
    options: ["Vita", "Zaldi", "Seri, sama-sama lama", "Menu-nya yang salah"],
    answer: 0,
    safeIndex: 2,
    reactions: {
      correct: ["Juara bertahan.", "Nggak terbantahkan."],
      wrong: ["Kamu belum lihat aku di depan menu.", "Hmm... dicatat."],
    },
  },
  {
    question: "Kalau salah satu bilang 'bebas mau ke mana', sebenarnya...",
    options: [
      "Beneran bebas",
      "Ada tempat yang sudah kepikiran",
      "Nggak kepikiran sama sekali",
      "Nunggu yang satu usul",
    ],
    answer: 1,
    safeIndex: 3,
    reactions: {
      correct: ["Kamu tahu codes-nya.", "Nah."],
      wrong: ["Optimis sekali.", "Hmm... dicatat."],
    },
  },
  {
    question: "Siapa yang lebih sering tiba-tiba pengen sesuatu?",
    options: ["Vita", "Zaldi", "Bergantian", "Nggak ada yang mau ngaku"],
    answer: 1,
    reactions: {
      correct: ["Aku nggak bisa bantah.", "Nah."],
      wrong: ["Yakin?", "Jawaban yang cukup berani.", "Hmm... dicatat."],
    },
  },
  {
    question: "Kalau lagi libur tapi nggak ke mana-mana, kita paling sering...",
    options: [
      "Nonton bareng",
      "Rebahan sambil ngobrol",
      "Masak sesuatu",
      "Bilang 'besok kita ke mana ya' sambil nggak ke mana-mana",
    ],
    answer: 3,
    reactions: {
      correct: ["Terlalu akurat.", "Klasik."],
      wrong: ["Manis sekali.", "Hmm... dicatat."],
    },
  },
  {
    question: "Kalau aku tiba-tiba kirim pesan 'kamu lagi ngapain', biasanya alasannya...",
    options: [
      "Emang mau nanya",
      "Lagi mikirin kamu",
      "Laper",
      "Bosan",
    ],
    answer: 1,
    safeIndex: 2,
    reactions: {
      correct: ["Jangan bilang ke siapa-siapa.", "Nah."],
      wrong: ["Hmm... dicatat.", "Laper mungkin."],
    },
  },
];
