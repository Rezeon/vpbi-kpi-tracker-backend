const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { laporanKpiSchema } = require("./validator/Validator");
const { transporter } = require("../utils/nodeMailer");

const addLaporanKpi = asyncHandler(async (req, res) => {
  const validateData = laporanKpiSchema.safeParse(req.body);
  console.log(req.body)
  if (!validateData.success) {
    return res.status(400).json({
      errors: validateData.error.errors.map((e) => e.message),
    });
  }

  const dataToSave = {
    ...validateData.data,
    userId: req.user.role === "user" ? req.user.id : validateData.data.userId
  };

  const laporanKPI = await prisma.laporanKPI.create({
    data: dataToSave,
  });
  const karyawan = await prisma.karyawan.findUnique({
    where: { id: Number(req.body.karyawanId) },
  });
  try {
    await transporter.sendMail({
      from: process.env.GOOGLE_APP_ACCOUNT,
      to: karyawan.email,
      subject: `Anda telah mendapatkan laporan baru`,
      html: `<p>Bulan ${laporanKPI.bulan} anda mendapatkan nilai rata-rata</p><b>${laporanKPI.rataRata}</b><span/><p>${laporanKPI.ringkasan}</p><span/><p>matrik ini mempunyai bobot <b>${matriks.bobot}</b></p>`,
    });
  } catch (error) {
    console.error("Gagal kirim email:", error.message);
  }

  return res.status(201).json(laporanKPI);
});


const getAllLaporan = asyncHandler(async (req, res) => {
  const laporan = await prisma.laporanKPI.findMany();
  return res.status(200).json(laporan);
});

const getLaporanById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id || req.body.id);

  const laporanKPI = await prisma.laporanKPI.findUnique({
    where: { id },
    include: { karyawan: true },
  });

  if (!laporanKPI) {
    return res.status(404).json({ error: "laporanKPI tidak ditemukan" });
  }

  return res.status(200).json(laporanKPI);
});

const updateLaporanKpi = asyncHandler(async (req, res) => {
  const { id, ...data } = req.body;

  const validateResult = laporanKpiSchema.partial().safeParse(data);
  if (!validateResult.success) {
    return res.status(400).json({
      errors: validateResult.error.errors.map((e) => e.message),
    });
  }

  if (req.user.role === "user") {
    const laporan = await prisma.laporanKPI.findUnique({ where: { id: Number(id) } });
    if (!laporan || laporan.userId !== req.user.id) {
      return res.status(403).json({ error: "Tidak punya akses untuk mengedit laporan ini" });
    }
  }

  const updated = await prisma.laporanKPI.update({
    where: { id: Number(id) },
    data: validateResult.data,
  });

  return res.status(200).json(updated);
});

const deleteLaporanKpi = asyncHandler(async (req, res) => {
  const id = Number(req.params.id || req.body.id);

  try {
    await prisma.laporanKPI.delete({ where: { id } });
    return res.status(200).json({ message: "laporanKPI berhasil dihapus" });
  } catch {
    return res.status(404).json({ error: "laporanKPI tidak ditemukan" });
  }
});

module.exports = {
  addLaporanKpi,
  getAllLaporan,
  getLaporanById,
  updateLaporanKpi,
  deleteLaporanKpi,
};
