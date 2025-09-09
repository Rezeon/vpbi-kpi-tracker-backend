# VPBI-KPI-TRACKER Backend

Backend project untuk sistem penilaian kinerja karyawan per-divisi dengan role **Admin**, **Leader**, dan **User**. Backend ini mengatur autentikasi, otorisasi, pengolahan data karyawan, KPI, serta laporan yang terintegrasi dengan database menggunakan **Prisma ORM**.

## Overview

Backend dibangun menggunakan stack berikut:

* **Express.js** (server utama)
* **Prisma ORM** (akses database)
* **Clerk** (autentikasi & otorisasi)
* **Zod** (validasi data)
* **Nodemailer** (pengiriman email notifikasi)
* **Serverless HTTP** (deploy ke Vercel)
* **Middleware keamanan**:

  * Helmet
  * CORS
  * Rate limiting
  * Morgan (logging)

## Struktur Proyek

```
├── lib
│   └── auth.js
├── prisma
│   ├── migrations/
│   └── schema.prisma
├── src
│   ├── config/
│   ├── controllers/
│   │   ├── buktiKpiController.js
│   │   ├── detailkpiController.js
│   │   ├── divisiController.js
│   │   ├── karyawanController.js
│   │   ├── laporanKpiController.js
│   │   ├── matriksKpiController.js
│   │   ├── notifikasiController.js
│   │   ├── penilaianKpiController.js
│   │   └── userController.js
│   ├── middleware/
│   ├── routes/
│   └── utils/
├── app.js
├── index.js
├── vercel.json
├── package.json
└── .gitignore
```

## Installation

### Prerequisites

* Node.js 18+
* Database PostgreSQL (atau kompatibel)

### Setup

1. Clone repository:

   ```bash
   git clone <repository-url>
   cd vpbi-kpi-tracker-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Konfigurasi environment di file `.env`:

   ```env
   DATABASE_URL="Your db"
   CLERK_PUBLISHABLE_KEY="your key"
   CLERK_SECRET_KEY=your key
   GOOGLE_APP_PASSWORD=pass google
   GOOGLE_APP_ACCOUNT=akun google
   PORT=3030
   ```

4. Migrasi database:

   ```bash
   npx prisma migrate dev
   ```

5. Jalankan server:

   ```bash
   npm run dev
   ```

## Scripts

* `npm run dev` → Jalankan server dengan nodemon
* `npm start` → Jalankan server production
* `npm run postinstall` → Generate Prisma Client

## API Endpoints (ringkasan)

**Users**

* `GET /user/api/all` — list users
* `GET /user/api/:id` — detail user
* `POST /user/api/register` — create user
* `PUT /user/update/:id`— update user
* `DELETE /user/delete/:id` — delete user

**Divisions**

* `GET /divisi/api/all`
* `POST /divisi/api/add`
* `PUT/divisi/api/update/:id`
* `DELETE /divisi/api/delete/:id`

**KPI / Scores**

* `GET /matriksKpi/api/all` — list KPI entries
* `GET /matriksKpi/api/:id`
* `POST /matriksKpi/api/add` — create matriks
* `PUT /matriksKpi/api/update/:id` — update
* `DELETE /matriksKpi/api/:delete/id` — hapus matriks

**Detail / Scores**

* `GET /detailPenilaian/api/all` — list KPI entries
* `GET /detailPenilaian/api/:id`
* `POST /detailPenilaian/api/add` — create penilaian
* `PUT /detailPenilaian/api/update/:id` — update
* `DELETE /detailPenilaian/api/:delete/id` — hapus penilaian

**Karyawan / User**

* `GET /karyawan/api/all` — list Karyawan entries
* `GET /karyawan/api/:id`
* `POST /karyawan/api/add` — create Karyawan
* `PUT /karyawan/api/update/:id` — update
* `DELETE /karyawan/api/delete/:id` — hapus Karyawan

**Penilaian / Score**

* `GET /penilaianKpi/api/all` — list Penilaian entries
* `GET /penilaianKpi/api/:id`
* `POST /penilaianKpi/api/add` — create Penilaian
* `PUT /penilaianKpi/api/update/:id` — update
* `DELETE /penilaianKpi/api/delete/:id` — hapus Penilaian

**Notifikasi **

* `GET /notifikasi/api/:userId` — list Notifikasi entries
* `POST /notifikasi/api/createNotifikasi` — create Notifikasi
* `PUT /notifikasi/api/markAsRead/:id` — update

## Deployment

Backend dapat di-deploy ke **Vercel** menggunakan `serverless-http`.

Tambahkan konfigurasi di `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    { "src": "index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.js" }
  ]
}
```

## License

MIT License — Team C
