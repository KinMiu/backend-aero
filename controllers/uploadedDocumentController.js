import UploadedDocument from "../models/UploadedDocument.js";
import Student from "../models/Student.js";
import DocumentLink from "../models/DocumentLink.js";

async function validateDocLink(token) {
  const link = await DocumentLink.findOne({ token });
  if (!link) return { error: "Link not found", status: 404 };
  if (!link.isActive || link.expiresAt <= new Date()) {
    return { error: "Link expired or inactive", status: 403 };
  }
  return { link };
}

async function validateTrackingStudent(token) {
  const student = await Student.findOne({ trackingToken: token });
  if (!student) return { error: "Student not found", status: 404 };
  return { student };
}

function validateFilePayload(filePath, fileType) {
  if (typeof filePath !== "string" || filePath.length > 8 * 1024 * 1024) return false;
  if (!/^data:(image\/(png|jpeg|jpg|webp)|application\/pdf);base64,/.test(filePath)) return false;
  return ["application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp"].includes(fileType);
}

export async function getDocuments(req, res, next) {
  try {
    const { studentId } = req.query;
    const filter = studentId ? { studentId } : {};
    const docs = await UploadedDocument.find(filter).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    next(err);
  }
}

export async function createDocument(req, res, next) {
  try {
    const { studentId, fileName, fileType, filePath, documentLabel } = req.body;
    if (!studentId) return res.status(400).json({ message: "studentId wajib diisi" });
    if (!filePath) return res.status(400).json({ message: "File data wajib diisi" });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const doc = await UploadedDocument.create({
      studentId,
      fileName: fileName || "document",
      fileType: fileType || "image/webp",
      filePath,
      documentLabel: documentLabel || "",
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

export async function deleteDocument(req, res, next) {
  try {
    const doc = await UploadedDocument.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted" });
  } catch (err) {
    next(err);
  }
}

// Public: get documents by tracking token
export async function getDocumentsByTrackToken(req, res, next) {
  try {
    const student = await Student.findOne({ trackingToken: req.params.token });
    if (!student) return res.status(404).json({ message: "Student not found" });
    const docs = await UploadedDocument.find({ studentId: student._id }).sort({ createdAt: -1 });
    res.json({ student, docs });
  } catch (err) {
    next(err);
  }
}

export async function createTrackingDocument(req, res, next) {
  try {
    const result = await validateTrackingStudent(req.params.token);
    if (result.error) return res.status(result.status).json({ message: result.error });

    const { fileName, fileType, filePath, documentLabel } = req.body;
    if (!validateFilePayload(filePath, fileType)) {
      return res.status(400).json({ message: "Format atau ukuran file tidak valid" });
    }

    const doc = await UploadedDocument.create({
      studentId: result.student._id,
      fileName: fileName || "document",
      fileType,
      filePath,
      documentLabel: documentLabel || "",
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

export async function deleteTrackingDocument(req, res, next) {
  try {
    const result = await validateTrackingStudent(req.params.token);
    if (result.error) return res.status(result.status).json({ message: result.error });

    const doc = await UploadedDocument.findOneAndDelete({ _id: req.params.docId, studentId: result.student._id });
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted" });
  } catch (err) {
    next(err);
  }
}

export async function getPublicDocuments(req, res, next) {
  try {
    const result = await validateDocLink(req.params.token);
    if (result.error) return res.status(result.status).json({ message: result.error });

    const student = await Student.findById(result.link.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const docs = await UploadedDocument.find({ studentId: student._id }).sort({ createdAt: -1 });
    res.json({ student, docs });
  } catch (err) {
    next(err);
  }
}

export async function createPublicDocument(req, res, next) {
  try {
    const result = await validateDocLink(req.params.token);
    if (result.error) return res.status(result.status).json({ message: result.error });

    const { fileName, fileType, filePath, documentLabel } = req.body;
    if (!filePath) return res.status(400).json({ message: "File data wajib diisi" });

    const student = await Student.findById(result.link.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const doc = await UploadedDocument.create({
      studentId: student._id,
      fileName: fileName || "document",
      fileType: fileType || "image/webp",
      filePath,
      documentLabel: documentLabel || "",
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

export async function deletePublicDocument(req, res, next) {
  try {
    const result = await validateDocLink(req.params.token);
    if (result.error) return res.status(result.status).json({ message: result.error });

    const doc = await UploadedDocument.findByIdAndDelete(req.params.docId);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted" });
  } catch (err) {
    next(err);
  }
}
