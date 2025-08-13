const { clerkMiddleware } = require("@clerk/express");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(helmet());

const user = require("./routes/userRoute");
const karyawan = require("./routes/karyawanRoute");
const divisi = require("./routes/divisiRoute");
const matriksKPI = require("./routes/matrikKpiRoute");
const detailKpi = require("./routes/detailRoute");
const laporanBKPI = require("./routes/laporanRoute");
const penilaianKPI = require("./routes/penilaianRoute");
const notifikasi = require("./routes/notifikasiRoute");
const bukti = require("./routes/buktiKpi");

app.use("/user/api", user);
app.use("/karyawan/api", karyawan);
app.use("/divisi/api", divisi);
app.use("/detailPenilaian/api", detailKpi);
app.use("/matriksKpi/api", matriksKPI);
app.use("/laporanKpi/api", laporanBKPI);
app.use("/penilaianKpi/api", penilaianKPI);
app.use("/notifikasi/api", notifikasi);
app.use("/buktiKpi/api", bukti);

module.exports = app;
