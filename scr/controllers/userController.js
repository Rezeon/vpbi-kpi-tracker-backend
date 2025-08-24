const asyncHandler = require("express-async-handler");
const prisma = require("../config/prisma");
const { userSchema } = require("./validator/Validator");
const { transporter } = require("../utils/nodeMailer");
//-> (req) <-! secara global sudah menyimpan clerkid, username , email kecuali role

// contoh untuk controller project magang crud kalo kurang tau bisa tanya rheyno
const createUser = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { username, email, clerkId } = req.user;

  if (!role) {
    return res.status(400).json({ error: "Role wajib diisi" });
  }

  const roleCek = await prisma.user.findUnique({
    where: { clerkId: clerkId },
  });
  if (roleCek && (roleCek.role === "admin" || roleCek.role === "user" || roleCek.role === "leader" )) {
    return res.status(400).json({
      message: `Anda sudah terdaftar dengan role ${roleCek.role}`,
    });
  }

  //jika ingin mengambil validasi tertentu dari userValidator(dicek dulu ada apa saja)
  //const validateDataa = userSchema.pick({
  //  role: true, # ambil bagian yang ingin di validate
  //  username: true,
  //}).parse({
  //  role, # dan parse data yang ingin di validate
  //  username
  //})

  const validatedData = userSchema
    .pick({
      role: true,
      username: true,
      email: true,
      clerkId: true,
    })
    .parse({
      role,
      username,
      email,
      clerkId,
    });

  const user = await prisma.user.create({
    data: validatedData,
  });

  //contoh untuk mengirim email
  const info = await transporter.sendMail({
    from: process.env.GOOGLE_APP_ACCOUNT,
    to: user.email,
    subject: "Selamat Anda Sudah bergabung dengan KPI",
    text: "dengan ini anda sudah bergabung dengan anggota kami Mohon selesaikan tugas dengan tepat waktu",
    html: "<b>Semangatt</b>",
  });
  console.log("Message sent:", info.messageId);

  return res.status(201).json(user);
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const id = String(req.params.id || req.body.id);
  const userById = await prisma.user.findUnique({
    where: { clerkId: id },
    include: {
      username: true,
      email: true,
      clerkId: true,
      role: true,
    },
  });

  return res.status(200).json(userById);
});

const updateUser = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { username, email, clerkId } = req.user;

  if (!clerkId) {
    return res.status(401).json({ error: "Unauthorized - no clerkId" });
  }

  const validatedData = userSchema.partial().parse({
    role,
    username,
    email,
  });

  const updatedUser = await prisma.user.update({
    where: { clerkId: clerkId },
    data: validatedData,
  });

  return res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { clerkId } = req.user;
  const deleteUser = await prisma.user.delete({ where: { clerkId: clerkId } });

  if (deleted.count === 0) {
    return res.status(404).json({ error: "User tidak ditemukan" });
  }

  return res.status(200).json(deleteUser);
});

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
