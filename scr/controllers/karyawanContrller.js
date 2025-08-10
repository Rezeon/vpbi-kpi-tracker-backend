const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { karyawanSchema } = require("./validator/Validator");
const { transporter } = require("../utils/nodeMailer");

const addKaryawan = asyncHandler(async (req, res) => {
  const { userId, nama, email, posisi, divisiId, tanggalMasuk } = req.body;
  const validateData = karyawanSchema
    .pick({
      userId: true,
      nama: true,
      email: true,
      posisi: true,
      divisiId: true,
      tanggalMasuk: true,
    })
    .parse({
      userId,
      nama,
      email,
      posisi,
      divisiId,
      tanggalMasuk,
    });

  const karyawan = await prisma.karyawan.create({
    data: validateData,
  });

  const info = await transporter.sendMail({
    from: process.env.GOOGLE_APP_ACCOUNT,
    to: karyawan.email,
    subject: "Selamat anda telah menjadi karyawan di KPI",
    text: "karyawan KPI",
    html: "<b>dengan ini andan telah menjadi karyawan di kpi</b>",
  });

  return res.status(201).json(karyawan);
});

const getAllKaryawan = asyncHandler(async (req, res) => {
  const karyawan = await prisma.karyawan.findMany();
  return res.status(200).json(karyawan);
});

const getbyId = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const karyawanId = await prisma.karyawan.findUnique({
    where: { id: id },
    include: {
      nama: true,
      email: true,
      posisi: true,
      divisiId: true,
      tanggalMasuk: true,
    },
  });

  return res.status(200).json(karyawanId);
});

const updateKaryawan = asyncHandler(async (req, res) => {
  const { id, nama, email, posisi, divisiId } = req.body;

  const validateData = karyawanSchema.partial().parse({
    nama,
    email,
    posisi,
    divisiId,
  });

  const updateKaryawan = await prisma.karyawan.update({
    where: { id: id },
    data: validateData,
  });

  return res.status(200).json(updateKaryawan);
});

const deleteKaryawan = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const deleteKaryawan = await prisma.karyawan.delete({ where: { id: id } });

  if (deleted.count === 0) {
    return res.status(400).json({ error: "Karyawan tidak ditemukan" });
  }

  return res.status(200).json(deleteKaryawan);
});

module.exports = { 
    addKaryawan,
    getAllKaryawan,
    getbyId,
    updateKaryawan,
    deleteKaryawan
}