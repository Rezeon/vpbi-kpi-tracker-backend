const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { karyawanSchema } = require("./validator/Validator");
const { transporter } = require("../utils/nodeMailer");

const addKaryawan = asyncHandler(async (req, res) => {
  const validateResult = karyawanSchema
    .pick({
      userId: true,
      nama: true,
      email: true,
      posisi: true,
      divisiId: true,
      tanggalMasuk: true,
    })
    .safeParse(req.body);

  if (!validateResult.success) {
    return res.status(400).json({
      errors: validateResult.error.errors.map((e) => e.message),
    });
  }

  const karyawan = await prisma.karyawan.create({
    data: validateResult.data,
  });

  try {
    await transporter.sendMail({
      from: process.env.GOOGLE_APP_ACCOUNT,
      to: karyawan.email,
      subject: "Selamat anda telah menjadi karyawan di KPI",
      html: "<b>Dengan ini anda telah menjadi karyawan di KPI</b>",
    });
  } catch (error) {
    console.error("Gagal kirim email:", error.message);
  }

  return res.status(201).json(karyawan);
});

const getAllKaryawan = asyncHandler(async (req, res) => {
  const karyawan = await prisma.karyawan.findMany({
    include: {
      user: true,
      divisi: true,
      penilaian: {
        include: {
          detail: true, 
        },
      },
      laporan: true,
    },
  });

  return res.status(200).json(karyawan);
});

const getbyId = asyncHandler(async (req, res) => {
  const { id } = req.params.id;

  const karyawanId = await prisma.karyawan.findUnique({
    where: { id: Number(id) },
    include: {
      divisi: true,
      penilaian: true,
      laporan: true,
    },
  });

  if (!karyawanId) {
    return res.status(404).json({ error: "Karyawan tidak ditemukan" });
  }

  return res.status(200).json(karyawanId);
});

const updateKaryawan = asyncHandler(async (req, res) => {
  const { id, ...data } = req.body;

  const validateResult = karyawanSchema.partial().safeParse(data);
  if (!validateResult.success) {
    return res.status(400).json({
      errors: validateResult.error.errors.map((e) => e.message),
    });
  }

  const updated = await prisma.karyawan.update({
    where: { id: Number(id) },
    data: validateResult.data,
  });

  return res.status(200).json(updated);
});

const deleteKaryawan = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const existing = await prisma.karyawan.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    return res.status(404).json({ error: "Karyawan tidak ditemukan" });
  }

  await prisma.karyawan.delete({ where: { id: Number(id) } });
  return res.status(200).json({ message: "Karyawan berhasil dihapus" });
});

module.exports = {
  addKaryawan,
  getAllKaryawan,
  getbyId,
  updateKaryawan,
  deleteKaryawan,
};
