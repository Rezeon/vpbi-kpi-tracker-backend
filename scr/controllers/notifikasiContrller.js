const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { transporter } = require("../utils/nodeMailer");

const createNotifikasi = asyncHandler(async (req, res) => {
  const { userId, judul, pesan, tipe } = req.body;

  if (!userId || !judul || !pesan || !tipe) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  let status = "terkirim";

  let karyawanData = null;
  if (tipe === "email") {
    karyawanData = await prisma.karyawan.findUnique({
      where: { id: Number(userId) },
      include: {
        user:true
      }
    });

    if (karyawanData) {
      try {
        await transporter.sendMail({
          from: process.env.GOOGLE_APP_ACCOUNT,
          to: karyawanData.user.email,
          subject: judul,
          html: `<b>${pesan}</b>`,
        });
      } catch (error) {
        console.error("Gagal kirim email:", error.message);
        status = "gagal";
      }
    } else {
      status = "gagal";
    }
  }

  
  const notifikasi = await prisma.notifikasi.create({
    data: {
      userId: Number(userId),
      judul,
      pesan,
      tipe,
      status,
    },
  });

  return res.status(201).json(notifikasi);
});

const getUserNotifikasi = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const notifikasi = await prisma.notifikasi.findMany({
    where: { userId: Number(userId) },
    orderBy: { createdAt: "desc" },
  });

  return res.status(200).json(notifikasi);
});

const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updated = await prisma.notifikasi.update({
    where: { id: Number(id) },
    data: { status: "terbaca" },
  });

  return res.status(200).json(updated);
});

module.exports = {
  createNotifikasi,
  getUserNotifikasi,
  markAsRead,
};
