/**
 * ============================================================
 *  STORY — SEMUA KONTEN WEBSITE ADA DI FILE INI.
 * ============================================================
 *  Ganti nama, pesan, teks proposal, dan final message
 *  di sini. Pertanyaan ada di src/data/questions.ts
 * ============================================================
 */

export const story = {
  // ----- IDENTITAS -----
  sender: "Zaldi",
  senderFullName: "Muhammad Rizaldi Dwinanto",
  recipient: "Vita",
  recipientFullName: "Vita Putri Anggraini",

  // ----- LOADING -----
  loading: {
    text: "Menyiapkan sesuatu...",
  },

  // ----- CHAPTER 1 : OPENING -----
  opening: {
    lines: [
      "Hi, Vita.",
      "Aku bikin sesuatu buat kamu.",
      "Tapi sebelum itu...",
      "ada beberapa hal yang harus kamu jawab.",
    ],
    button: "Mulai",
    hint: "tenang, nggak susah kok.",
  },

  // ----- CHAPTER 2 : GAME INTRO -----
  gameIntro: {
    lead: "Selamat datang di...",
    title: "Vita Test™",
    sub: "Tes ini tidak menentukan apa-apa.",
    pause: "Mungkin.",
    button: "Yaudah mulai",
  },

  // ----- CHAPTER 4 : QUICK CHOICE -----
  quickChoice: {
    intro: ["Round cepat.", "Jangan mikir lama-lama."],
    rounds: [
      {
        prompt: "Kalau tiba-tiba kita punya waktu kosong...",
        a: { emoji: "🍜", label: "Makan" },
        b: { emoji: "🎬", label: "Nonton" },
      },
      {
        prompt: "Hari libur ideal itu...",
        a: { emoji: "🚶", label: "Jalan-jalan" },
        b: { emoji: "🛏️", label: "Rebahan" },
      },
      {
        prompt: "Kamu lebih suka...",
        a: { emoji: "☀️", label: "Siang" },
        b: { emoji: "🌙", label: "Malam" },
      },
      {
        prompt: "Kenangan paling baik disimpan sebagai...",
        a: { emoji: "📷", label: "Foto" },
        b: { emoji: "🎥", label: "Video" },
      },
    ],
    wait: "Sebentar.",
    processing: "Jawaban kamu sedang diproses...",
    loadingLines: ["membaca pola...", "mencocokkan data...", "hampir selesai..."],
    resultTitle: "Hasil analisis:",
    result: "Kamu ternyata tetap susah ditebak.",
    button: "lanjut",
  },

  // ----- CHAPTER 5 : JAHIL -----
  joke: {
    lead: "Tes berikutnya lebih penting.",
    button: "Siap",
    punch: ["Sebenernya nggak penting.", "HAHA."],
    button2: "lanjut",
  },

  // ----- CHAPTER 6 : SUSPICIOUS MOMENT -----
  suspicious: {
    lines: ["Sebentar.", "Kayaknya dari tadi kamu cuma main."],
    reason: "Padahal ada alasan kenapa aku bikin semua ini.",
    reasonButton: "Alasannya apa?",
    notYet: "Belum.",
    almost: "Sedikit lagi.",
    button: "lanjut",
  },

  // ----- CHAPTER 7 : FINAL QUESTION INTRO -----
  finalQuestion: {
    label: "FINAL QUESTION",
    lines: ["Okay.", "Ini pertanyaan terakhir."],
    sub: ["Dan kali ini...", "nggak ada jawaban benar atau salah."],
    button: "Aku siap.",
  },

  // ----- CHAPTER 8 : PROPOSAL -----
  proposal: {
    name: "Vita Putri Anggraini.",
    lead: "Aku punya satu pertanyaan.",
    big: ["Will u marry me?"],
    // Foto terbaik kalian — ganti file di /public/images/proposal.jpg
    image: "/images/proposal.jpeg",
    yesButton: "❤️ MAU",
    noButton: "😭 NGGAK MAU",
    // Reaction tiap kali tombol NGGAK MAU kabur.
    teases: [
      "eh?",
      "kok ngejar?",
      "hehe...",
      "nggak bisa 😌",
      "coba tombol satunya.",
      "Kayaknya tombol ini nggak mau diajak kerja sama.",
    ],
  },

  // ----- REACTION SETELAH MAU -----
  yesReaction: {
    emoji: "🥹",
    lines: ["aku tahu kamu bakal pilih ini.", "Terima kasih."],
    button: "lanjut",
  },

  // ----- FINAL REVEAL -----
  finalReveal: {
    salutation: "Vita,",
    lines: [
      "Aku mungkin belum tahu seperti apa semua cerita kita ke depan.",
      "Tapi aku tahu satu hal.",
      "Aku pengen kamu ada di cerita itu.",
    ],
  },
} as const;
