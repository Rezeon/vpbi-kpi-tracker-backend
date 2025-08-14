const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { divisiSchema, karyawanSchema } = require("./validator/Validator");

const addDivisi = asyncHandler(async (req, res) => {
  const validatedData = divisiSchema.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      errors: validatedData.error.errors.map((e) => e.message),
    });
  }
  const divisi = await prisma.divisi.create({
    data: validatedData.data,
  });
  return res.status(200).json(divisi);
});

const getAllDivisi = asyncHandler(async (req, res) => {
  const divisi = await prisma.divisi.findMany();

  return res.status(200).json(divisi);
});

const getDivisiById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id || req.body.id);

  const divisiId = await prisma.divisi.findUnique({
    where: { id: Number(id) },
    include: {
      karyawan: true,
    },
  });

  if (!divisiId) {
    return res.status(200).json({ error: "divisi tidak ditemukan" });
  }

  return res.status(200).json(divisiId);
});

const updateDivisi = asyncHandler(async (req, res) => {
  const { id, ...data } = req.body;

  const validatedData = divisiSchema.partial().safeParse(data);

  if (!validatedData.success) {
    return res.status(400).json({
      errors: validatedData.error.errors.map((e) => e.message),
    });
  }

  const updateDivisi = await prisma.divisi.update({
    where: { id: Number(id) },
    data: validatedData.data,
  });

  return res.status(200).json(updateDivisi);
});

const deleteDivisi = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const existingDivisi = await prisma.divisi.findUnique({
    where: { id: Number(id) },
  });

  if (!existingDivisi) {
    return res.status(404).json({ error: "divisi tidak ditemukan" });
  }

  await prisma.divisi.delete({ where: { id: Number(id) } });
  return res.status(200).json({ message: "divisi berhasil dihapus" });
});

module.exports = {
  addDivisi,
  getAllDivisi,
  getDivisiById,
  updateDivisi,
  deleteDivisi,
};
