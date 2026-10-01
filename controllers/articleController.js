import Article from "../models/Article.js";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80);
}

export async function getArticles(req, res, next) {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    next(err);
  }
}

export async function getArticleBySlug(req, res, next) {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    next(err);
  }
}

export async function createArticle(req, res, next) {
  try {
    let slug = req.body.slug || slugify(req.body.title);
    const existing = await Article.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }
    const article = await Article.create({ ...req.body, slug });
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
}

export async function updateArticle(req, res, next) {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    next(err);
  }
}

export async function deleteArticle(req, res, next) {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted" });
  } catch (err) {
    next(err);
  }
}

export async function seedArticles(req, res, next) {
  try {
    const existing = await Article.countDocuments();
    if (existing > 0) {
      return res.json({ message: "Articles already seeded", count: existing });
    }
    const seedData = [
      {
        slug: "apa-itu-avsec-panduan-lengkap",
        title: "Apa Itu AVSEC? Panduan Lengkap Keamanan Penerbangan",
        date: "10 September 2026",
        category: "Edukasi",
        image: "/image copy 3.jpg",
        excerpt: "Mengenal lebih dekat profesi Aviation Security, peran pentingnya di bandara, dan bagaimana cara menjadi personel AVSEC bersertifikat resmi.",
        sections: [
          { type: "heading", text: "Apa Itu AVSEC?" },
          { type: "paragraph", text: "AVSEC (Aviation Security) adalah unit keamanan penerbangan yang bertugas melindungi penumpang, awak pesawat, pesawat, dan fasilitas bandara dari ancaman keamanan. Personel AVSEC merupakan garda terdepan dalam menjaga keamanan dan keselamatan di dunia penerbangan." },
          { type: "heading", text: "Tugas dan Tanggung Jawab" },
          { type: "list", items: ["Melakukan pemeriksaan keamanan terhadap penumpang dan bagasi", "Mengawasi area steril dan non-steril di bandara", "Mencegah dan menangani insiden keamanan", "Melakukan screening terhadap barang bawaan", "Bekerja sama dengan pihak berwenang terkait"] },
          { type: "heading", text: "Cara Menjadi Personel AVSEC" },
          { type: "paragraph", text: "Untuk menjadi personel AVSEC yang bersertifikat, Anda harus mengikuti diklat di lembaga pendidikan resmi yang terlisensi KEMENHUB. Setelah lulus, Anda akan mendapatkan lisensi resmi yang diakui di seluruh bandara di Indonesia." },
          { type: "quote", text: "AVSEC bukan sekadar pekerjaan, tapi pengabdian untuk keamanan bangsa di udara." },
        ],
      },
      {
        slug: "peluang-karier-avsec-di-indonesia",
        title: "Peluang Karier AVSEC di Indonesia yang Menjanjikan",
        date: "5 September 2026",
        category: "Karier",
        image: "/image copy 3.jpg",
        excerpt: " Industri penerbangan Indonesia terus berkembang, dan kebutuhan akan personel AVSEC bersertifikat semakin meningkat setiap tahunnya.",
        sections: [
          { type: "heading", text: "Peluang Karier yang Luas" },
          { type: "paragraph", text: "Indonesia memiliki ratusan bandara aktif yang masing-masing membutuhkan personel AVSEC. Dengan lisensi resmi, Anda dapat bekerja di bandara-bandara nasional maupun internasional di seluruh Indonesia." },
          { type: "heading", text: "Jenjang Karier AVSEC" },
          { type: "list", items: ["Awal/Guard AVSEC — posisi awal sebagai pengamanan penerbangan", "Skriner AVSEC — operator alat screening", "SVP/Supervisor AVSEC — supervisi operasional keamanan", "Instruktur AVSEC — mengajar dan melatih personel baru"] },
          { type: "heading", text: "Gaji dan Tunjangan" },
          { type: "paragraph", text: "Personel AVSEC mendapatkan penghasilan yang kompetitif dengan tunjangan transport, makan, dan kesehatan. Semakin tinggi jenjang lisensi, semakin baik pula compensation yang diterima." },
        ],
      },
      {
        slug: "tips-persiapan-diklat-avsec",
        title: "Tips Persiapan Diklat AVSEC untuk Pemula",
        date: "1 September 2026",
        category: "Tips",
        image: "/image copy 3.jpg",
        excerpt: "Persiapan matang sebelum mengikuti diklat AVSEC akan membantu Anda lulus dengan hasil terbaik. Berikut tipsnya.",
        sections: [
          { type: "heading", text: "Persiapan Fisik" },
          { type: "paragraph", text: "Pastikan kondisi fisik Anda dalam keadaan prima. Pemeriksaan kesehatan meliputi tes buta warna, pendengaran, dan kesehatan jasmani rohani. Mulai menjaga stamina sebelum diklat dimulai." },
          { type: "heading", text: "Persiapan Dokumen" },
          { type: "list", items: ["KTP dan ijazah asli", "SKCK yang masih berlaku", "Surat keterangan sehat dari dokter", "Surat keterangan bebas narkoba"] },
          { type: "heading", text: "Mental dan Motivasi" },
          { type: "paragraph", text: "Diklat AVSEC membutuhkan fokus dan disiplin. Siapkan mental untuk mengikuti pelatihan intensif selama satu bulan penuh. Ingat tujuan akhir Anda: lisensi resmi dan karier di dunia penerbangan." },
          { type: "quote", text: "Persiapan adalah kunci keberhasilan. Mulailah dari sekarang." },
        ],
      },
    ];
    await Article.insertMany(seedData);
    res.status(201).json({ message: "Articles seeded", count: seedData.length });
  } catch (err) {
    next(err);
  }
}
