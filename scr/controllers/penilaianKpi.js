const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { penilaianKpiSchema } = require("./validator/Validator");
const { transporter } = require("../utils/nodeMailer");

const addPenilaianKpi = asyncHandler(async (req, res) => {
  const validateResult = penilaianKpiSchema.safeParse(req.body);
  if (!validateResult.success) {
    return res.status(400).json({
      errors: validateResult.error.errors.map((e) => e.message) || [
        "Data tidak valid",
      ],
    });
  }
  const penilaianKpi = await prisma.penilaianKPI.create({
    data: validateResult.data,
  });

  const karyawanData = await prisma.karyawan.findUnique({
    where: { id: Number(req.body.karyawanId) },
  });

  if (karyawanData) {
    try {
      await transporter.sendMail({
        from: process.env.GOOGLE_APP_ACCOUNT,
        to: karyawanData.email,
        subject: "Matrik anda sudah dinilai",
        html: `<b>Terimakasih atas kerja sama anda ${karyawanData.nama} dengan total Skor ${req.body.totalSkor}</b>`,
      });
    } catch (error) {
      console.error("Gagal kirim email:", error.message);
    }
  }

  return res.status(201).json(penilaianKpi);
});

const getAllPenilaianKpi = asyncHandler(async (req, res) => {
  const penilaianKpi = await prisma.penilaianKPI.findMany({
    include: {
      karyawan: {
        include: {
          divisi: {
            include: {
              karyawan: {
                include: {
                  penilaian: true,
                },
              },
            },
          },
        },
      },
      dibuatOleh: true,
      detail: true,
    },
  });
  return res.status(200).json(penilaianKpi);
});

const getPenilaianKpiById = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const penilaianKpi = await prisma.penilaianKPI.findUnique({
    where: { id: Number(id) },
    include: {
      karyawan: true,
      dibuatOleh: true,
      detail: true,
    },
  });

  if (!penilaianKpi) {
    return res.status(404).json({ error: "PenilaianKPI tidak ditemukan" });
  }

  return res.status(200).json(penilaianKpi);
});

const updatePenilaianKpi = asyncHandler(async (req, res) => {
  const id = req.params.id || req.body.id;
  const { ...data } = req.body;

  const validateResult = penilaianKpiSchema.partial().safeParse(data);
  if (!validateResult.success) {
    return res.status(400).json({
      errors: validateResult.error.errors.map((e) => e.message),
    });
  }

  const currentPenilaian = await prisma.penilaianKPI.findUnique({
    where: { id: Number(id) },
    select: { bulan: true, tahun: true, karyawanId: true },
  });

  if (!currentPenilaian) {
    return res.status(404).json({ error: "Penilaian tidak ditemukan" });
  }
  const employeScore = await prisma.karyawan.findUnique({
    where: { id: currentPenilaian.karyawanId },
    select: {
      matriks: {
        where: {
          bulan: currentPenilaian.bulan,
          tahun: currentPenilaian.tahun,
        },
        select: {
          detail: {
            select: { nilai: true },
          },
        },
      },
    },
  });

  const nilaiList = employeScore.matriks.flatMap((m) =>
    m.detail.map((d) => d.nilai)
  );
  const totalPenilaian = nilaiList.reduce((acc, val) => acc + val, 0);

  const updated = await prisma.penilaianKPI.update({
    where: { id: Number(id) },
    data: {
      totalSkor: totalPenilaian,
      ...validateResult.data,
    },
  });

  return res.status(200).json(updated);
});

const deletePenilaianKpi = asyncHandler(async (req, res) => {
  const id = req.params.id || req.body.id;

  try {
    await prisma.penilaianKPI.delete({ where: { id: Number(id) } });
    return res.status(200).json({ message: "penilaian berhasil dihapus" });
  } catch {
    return res.status(404).json({ error: "penilaian tidak ditemukan" });
  }
});

module.exports = {
  addPenilaianKpi,
  getAllPenilaianKpi,
  getPenilaianKpiById,
  updatePenilaianKpi,
  deletePenilaianKpi,
};
