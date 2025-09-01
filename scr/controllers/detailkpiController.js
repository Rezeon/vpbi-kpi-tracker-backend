const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { detailPenilaianSchema } = require("./validator/Validator");

const addDetailKpi = asyncHandler(async (req, res) => {
  const validateData = detailPenilaianSchema
    .pick({
      penilaianId: true,
      matriksId: true,
      nilai: true,
    })
    .safeParse(req.body);

  if (!validateData.success) {
    return res.status(400).json({
      errors: validateData.error.errors.map((e) => e.message),
    });
  }

  const detailKpi = await prisma.detailPenilaian.create({
    data: validateData.data,
  });

  return res.status(200).json(detailKpi);
});

const getAllDetail = asyncHandler(async (req, res) => {
  const getAllDetail = await prisma.detailPenilaian.findMany();
  return res.status(200).json(getAllDetail);
});

const getDetailById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id || req.body.id);

  const detailKpi = await prisma.detailPenilaian.findUnique({
    where: { id: Number(id) },
    include: {
      penilaian: true,
      matriks: true,
    },
  });

  if (!detailKpi) {
    return res.status(404).json({ error: "detailKpi tidak ditemukan" });
  }

  return res.status(200).json(detailKpi);
});

const updateDetailKpi = asyncHandler(async (req, res) => {
  const id = Number(req.params.id || req.body.id);
  const { ...data } = req.body;

  const validateResult = detailPenilaianSchema.partial().safeParse(data);
  if (!validateResult.success) {
    return res.status(400).json({
      errors: validateResult.error.errors.map((e) => e.message),
    });
  }

  const updatedPenilaian = await prisma.detailPenilaian.update({
    where: { id: Number(id) },
    data: validateResult.data,
  });

  return res.status(200).json(updatedPenilaian);
});

const deleteDetailKpi = asyncHandler(async (req, res) => {
  const id = req.params.id || req.body.id;

  const existing = await prisma.detailPenilaian.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    return res.status(404).json({ error: "detailPenilaian tidak ditemukan" });
  }

  await prisma.detailPenilaian.delete({ where: { id: Number(id) } });
  return res.status(200).json({ message: "detailPenilaian berhasil dihapus" });
});

module.exports = {
  addDetailKpi,
  getAllDetail,
  getDetailById,
  updateDetailKpi,
  deleteDetailKpi,
};
