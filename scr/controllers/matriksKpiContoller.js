const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { matriksKpiSchema } = require("./validator/Validator");

const addMatriksKpi = asyncHandler(async (req, res) => {
  const validateResult = matriksKpiSchema.safeParse(req.body);

  if (!validateResult.success) {
    return res.status(400).json({
      errors: validateResult.error.errors.map((e) => e.message),
    });
  }

  const matriks = await prisma.matriksKPI.create({
    data: validateResult.data,
  });

  return res.status(201).json(matriks);
});

const getAllMatriksKpi = asyncHandler(async (req, res) => {
  const matriksList = await prisma.matriksKPI.findMany();
  return res.status(200).json(matriksList);
});

const getMatriksKpiById = asyncHandler(async (req, res) => {
    const id = Number(req.params.id || req.body.id);

  const matriks = await prisma.matriksKPI.findUnique({
    where: { id: Number(id) },
    include: {
      detail: true,
    },
  });

  if (!matriks) {
    return res.status(404).json({ error: "MatriksKPI tidak ditemukan" });
  }

  return res.status(200).json(matriks);
});

const updateMatriksKpi = asyncHandler(async (req, res) => {
  const { id, ...data } = req.body;

  const validateResult = matriksKpiSchema.partial().safeParse(data);
  if (!validateResult.success) {
    return res.status(400).json({
      errors: validateResult.error.errors.map((e) => e.message),
    });
  }

  const updated = await prisma.matriksKPI.update({
    where: { id: Number(id) },
    data: validateResult.data,
  });

  return res.status(200).json(updated);
});

const deleteMatriksKpi = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const existing = await prisma.matriksKPI.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    return res.status(404).json({ error: "MatriksKPI tidak ditemukan" });
  }

  await prisma.matriksKPI.delete({ where: { id: Number(id) } });
  return res.status(200).json({ message: "MatriksKPI berhasil dihapus" });
});

module.exports = {
  addMatriksKpi,
  getAllMatriksKpi,
  getMatriksKpiById,
  updateMatriksKpi,
  deleteMatriksKpi,
};
