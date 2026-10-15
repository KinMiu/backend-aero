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
    trackingToken: { type: String, default: "" },
    paymentStatus: {
      type: String,
      enum: ["belum_bayar", "proses", "berhasil"],
      default: "belum_bayar",
    },
    paymentProof: { type: String, default: "" },
    reRegistrationStatus: {
      type: String,
      enum: ["belum_bayar", "proses", "berhasil"],
      default: "belum_bayar",
    },
    reRegistrationProof: { type: String, default: "" },
    interviewStatus: {
      type: String,
      enum: ["belum", "terjadwal", "lulus", "tidak_lulus"],
      default: "belum",
    },
    interviewDate: { type: String, default: "" },
    interviewTime: { type: String, default: "" },
    interviewZoomLink: { type: String, default: "" },
    finalStatus: {
      type: String,
      enum: ["belum", "siap_diklat"],
      default: "belum",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        ret.registeredAt = ret.createdAt;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

studentSchema.virtual("registeredAt").get(function () {
  return this.createdAt;
});

export default mongoose.model("Student", studentSchema);
