const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { buktiKpiSchema } = require("./validator/Validator");
const { transporter } = require("../utils/nodeMailer");

const addBuktiKpi = asyncHandler(async (req, res) => {
  const validateData = buktiKpiSchema.safeParse(req.body);
  console.log(req.body);
  if (!validateData.success) {
    const errors = validateData.error?.errors?.map((e) => e.message) || [];
    return res.status(400).json({ errors });
  }

  const bukti = await prisma.buktiKPI.create({
    data: validateData.data,
  });

  return res.status(201).json(bukti);
});

const getAllBuktiKpi = asyncHandler(async (req, res) => {
  const buktiList = await prisma.buktiKPI.findMany({
    include: { karyawan: true, matriks: true },
  });
  return res.status(200).json(buktiList);
});

const getBuktiKpiById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const bukti = await prisma.buktiKPI.findUnique({
    where: { id },
    include: { karyawan: true, matriks: true },
  });

  if (!bukti) {
    return res.status(404).json({ error: "BuktiKPI tidak ditemukan" });
  }

  return res.status(200).json(bukti);
});

const updateBuktiKpi = asyncHandler(async (req, res) => {
  const id = Number(req.params.id || req.body.id);

  const validateData = buktiKpiSchema.partial().safeParse(req.body);
  console.log(req.body);

  if (!validateData.success) {
    return res.status(400).json({
      errors: validateData.error.errors.map((e) => e.message),
    });
  }

  const existingBukti = await prisma.buktiKPI.findUnique({
    where: { id },
    include: { karyawan: true },
  });

  if (!existingBukti) {
    return res.status(404).json({ error: "Bukti KPI tidak ditemukan" });
  }

  const updated = await prisma.buktiKPI.update({
    where: { id },
    data: validateData.data,
  });

  if (existingBukti.karyawan) {
    try {
      await transporter.sendMail({
        from: process.env.GOOGLE_APP_ACCOUNT,
        to: existingBukti.karyawan.email,
        subject: "Matrik anda",
        html: `<b>Terimakasih atas kerja sama anda. Status bukti KPI anda sudah berubah menjadi ${req.body.status}</b>`,
      });
    } catch (error) {
      console.error("Gagal kirim email:", error.message);
    }
  }

  return res.status(200).json(updated);
});


const deleteBuktiKpi = asyncHandler(async (req, res) => {
  const id = Number(req.params.id || req.body.id);

  const existing = await prisma.buktiKPI.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "BuktiKPI tidak ditemukan" });
  }

  await prisma.buktiKPI.delete({ where: { id } });
  return res.status(200).json({ message: "BuktiKPI berhasil dihapus" });
});

module.exports = {
  addBuktiKpi,
  getAllBuktiKpi,
  getBuktiKpiById,
  updateBuktiKpi,
  deleteBuktiKpi,
};
