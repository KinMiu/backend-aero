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
    const { studentId } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const doc = await UploadedDocument.create({
      studentId,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      filePath: req.file.path,
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
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const student = await Student.findById(result.link.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const doc = await UploadedDocument.create({
      studentId: student._id,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      filePath: req.file.path,
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
