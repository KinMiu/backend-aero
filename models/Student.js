import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    pilihanKelas: { type: String, required: true },
    nama: { type: String, required: true },
    noKtp: { type: String, default: "" },
    tempatLahir: { type: String, default: "" },
    tanggalLahir: { type: String, default: "" },
    alamat: { type: String, default: "" },
    kodePos: { type: String, default: "" },
    email: { type: String, default: "" },
    noHp: { type: String, default: "" },
    tinggiBadan: { type: String, default: "" },
    beratBadan: { type: String, default: "" },
    namaSD: { type: String, default: "" },
    tahunLulusSD: { type: String, default: "" },
    namaSMP: { type: String, default: "" },
    tahunLulusSMP: { type: String, default: "" },
    namaSMA: { type: String, default: "" },
    tahunLulusSMA: { type: String, default: "" },
    perguruanTinggiDiploma: { type: String, default: "" },
    tahunLulusDiploma: { type: String, default: "" },
    perguruanTinggiS1: { type: String, default: "" },
    namaAyah: { type: String, default: "" },
    tempatTanggalLahirAyah: { type: String, default: "" },
    namaIbu: { type: String, default: "" },
    tempatTanggalLahirIbu: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
