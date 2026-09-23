# AeroSchool Backend Server

Backend API untuk aplikasi AeroSchool, dibangun dengan **Express.js** dan **MongoDB** (Mongoose).

## Struktur Folder

```
server/
├── config/
│   └── db.js                # Koneksi MongoDB
├── controllers/
│   ├── authController.js
│   ├── officialController.js
│   ├── studentController.js
│   ├── openRegistrationController.js
│   ├── articleController.js
│   ├── testimonialController.js
│   ├── testimonialLinkController.js
│   ├── documentLinkController.js
│   └── uploadedDocumentController.js
├── middleware/
│   ├── auth.js              # JWT auth & role guard
│   └── errorHandler.js
├── models/
│   ├── OfficialAdmin.js
│   ├── Student.js
│   ├── OpenRegistration.js
│   ├── Article.js
│   ├── Testimonial.js
│   ├── TestimonialLink.js
│   ├── DocumentLink.js
│   └── UploadedDocument.js
├── routes/
│   ├── authRoutes.js
│   ├── officialRoutes.js
│   ├── studentRoutes.js
│   ├── openRegistrationRoutes.js
│   ├── articleRoutes.js
│   ├── testimonialRoutes.js
│   ├── testimonialLinkRoutes.js
│   ├── documentLinkRoutes.js
│   └── uploadedDocumentRoutes.js
├── uploads/                 # File upload directory (auto-created)
├── .env.example
├── package.json
└── index.js                 # Entry point
```

## Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Copy `.env.example` to `.env` and adjust values:
   ```bash
   cp .env.example .env
   ```

3. Jalankan server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| POST | /api/auth/login | Public | Login (superadmin & official) |
| GET | /api/auth/me | Auth | Info user yang login |
| GET | /api/officials | Superadmin | List official admin |
| POST | /api/officials | Superadmin | Tambah official |
| PUT | /api/officials/:id | Superadmin | Edit official |
| DELETE | /api/officials/:id | Superadmin | Hapus official |
| POST | /api/students | Public | Daftar siswa baru |
| GET | /api/students | Admin | List siswa |
| GET | /api/students/:id | Admin | Detail siswa |
| PUT | /api/students/:id | Admin | Edit siswa |
| DELETE | /api/students/:id | Superadmin | Hapus siswa |
| GET | /api/open-registrations/active | Public | Periode aktif |
| GET | /api/open-registrations | Superadmin | List periode |
| POST | /api/open-registrations | Superadmin | Tambah periode |
| DELETE | /api/open-registrations/:id | Superadmin | Hapus periode |
| GET | /api/articles | Public | List artikel |
| GET | /api/articles/:slug | Public | Detail artikel |
| POST | /api/articles | Superadmin | Tambah artikel |
| PUT | /api/articles/:id | Superadmin | Edit artikel |
| DELETE | /api/articles/:id | Superadmin | Hapus artikel |
| GET | /api/testimonials | Public | List testimoni |
| POST | /api/testimonials | Superadmin | Tambah testimoni |
| PUT | /api/testimonials/:id | Superadmin | Edit testimoni |
| DELETE | /api/testimonials/:id | Superadmin | Hapus testimoni |
| GET | /api/testimonial-links/active | Public | Link aktif |
| GET | /api/testimonial-links/token/:token | Public | Cek token |
| POST | /api/testimonial-links | Superadmin | Buat link |
| PUT | /api/testimonial-links/:id/deactivate | Superadmin | Nonaktifkan |
| GET | /api/document-links/token/:token | Public | Cek token dokumen |
| GET | /api/document-links | Admin | List link dokumen |
| POST | /api/document-links | Admin | Buat link dokumen |
| PUT | /api/document-links/:id/deactivate | Admin | Nonaktifkan |
| GET | /api/documents | Admin | List dokumen |
| POST | /api/documents | Admin | Upload dokumen (multipart) |
| DELETE | /api/documents/:id | Admin | Hapus dokumen |

## Authentication

Semua endpoint admin memerlukan JWT token. Setelah login, kirim token di header:

```
Authorization: Bearer <token>
```

## Default Accounts

- **Super Admin**: admin@gmail.com / admin123
- **Official Admin**: dibuat via API oleh superadmin
