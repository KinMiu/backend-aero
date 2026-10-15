import Student from "../models/Student.js";
import crypto from "crypto";

export async function getStudents(req, res, next) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    next(err);
  }
}

export async function getStudent(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    next(err);
  }
}

export async function createStudent(req, res, next) {
  try {
    const data = req.body;
    data.trackingToken = crypto.randomBytes(16).toString("hex");
    const student = await Student.create(data);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
}

export async function updateStudent(req, res, next) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    next(err);
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    next(err);
  }
}

// Public: get student by tracking token
export async function getStudentByToken(req, res, next) {
  try {
    const student = await Student.findOne({ trackingToken: req.params.token });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    next(err);
  }
}

// Public: submit payment proof
export async function submitPayment(req, res, next) {
  try {
    const student = await Student.findOne({ trackingToken: req.params.token });
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (student.paymentStatus === "berhasil") {
      return res.status(400).json({ message: "Pembayaran sudah dikonfirmasi" });
    }
    const { paymentProof } = req.body;
    student.paymentProof = paymentProof || "";
    student.paymentStatus = "proses";
    await student.save();
    res.json(student);
  } catch (err) {
    next(err);
  }
}

// Public: submit re-registration payment proof
export async function submitReRegistrationPayment(req, res, next) {
  try {
    const student = await Student.findOne({ trackingToken: req.params.token });
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (student.finalStatus !== "siap_diklat") {
      return res.status(400).json({ message: "Daftar ulang hanya tersedia untuk peserta yang lulus" });
    }
    const { paymentProof } = req.body;
    student.reRegistrationProof = paymentProof || "";
    student.reRegistrationStatus = "proses";
    await student.save();
    res.json(student);
  } catch (err) {
    next(err);
  }
}

// Public: reset re-registration payment proof (allow user to delete and re-upload)
export async function resetReRegistrationPayment(req, res, next) {
  try {
    const student = await Student.findOne({ trackingToken: req.params.token });
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (student.reRegistrationStatus === "berhasil") {
      return res.status(400).json({ message: "Daftar ulang sudah dikonfirmasi, tidak dapat diubah" });
    }
    student.reRegistrationProof = "";
    student.reRegistrationStatus = "belum_bayar";
    await student.save();
    res.json(student);
  } catch (err) {
    next(err);
  }
}

// Admin: confirm re-registration payment success
export async function confirmReRegistrationPayment(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (student.reRegistrationStatus !== "proses") {
      return res.status(400).json({ message: "Bukti daftar ulang belum dalam proses" });
    }
    student.reRegistrationStatus = "berhasil";
    await student.save();
    res.json(student);
  } catch (err) {
    next(err);
  }
}

// Admin: confirm payment success
export async function confirmPayment(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (student.paymentStatus !== "proses") {
      return res.status(400).json({ message: "Pembayaran belum dalam proses" });
    }
    student.paymentStatus = "berhasil";
    await student.save();
    res.json(student);
  } catch (err) {
    next(err);
  }
}

// Admin: schedule interview
export async function scheduleInterview(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (student.paymentStatus !== "berhasil") {
      return res.status(400).json({ message: "Pembayaran belum dikonfirmasi" });
    }
    const { interviewDate, interviewTime, interviewZoomLink } = req.body;
    if (!interviewDate || !interviewTime || !interviewZoomLink) {
      return res.status(400).json({ message: "Tanggal, jam, dan link Zoom wawancara wajib diisi" });
    }
    try {
      const linkUrl = new URL(interviewZoomLink);
      if (linkUrl.protocol !== "http:" && linkUrl.protocol !== "https:") {
        return res.status(400).json({ message: "Link wawancara harus berupa URL HTTP/HTTPS yang valid" });
      }
    } catch {
      return res.status(400).json({ message: "Link wawancara tidak valid" });
    }
    student.interviewDate = interviewDate;
    student.interviewTime = interviewTime;
    student.interviewZoomLink = interviewZoomLink.trim();
    student.interviewStatus = "terjadwal";
    await student.save();
    res.json(student);
  } catch (err) {
    next(err);
  }
}

// Admin: set interview result (lulus / tidak_lulus)
export async function setInterviewResult(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (student.interviewStatus !== "terjadwal") {
      return res.status(400).json({ message: "Wawancara belum dijadwalkan" });
    }
    const { result } = req.body;
    if (result !== "lulus" && result !== "tidak_lulus") {
      return res.status(400).json({ message: "Hasil wawancara tidak valid" });
    }
    student.interviewStatus = result;
    if (result === "lulus") {
      student.finalStatus = "siap_diklat";
    }
    await student.save();
    res.json(student);
  } catch (err) {
    next(err);
  }
}
