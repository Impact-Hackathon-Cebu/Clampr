const { Router } = require("express");
const UnclampingPayment = require("../models/unclampingPayment");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "/licenses/"),
  filename: (req, file, cb) => cb(null, `${file.filename}-${Date.now()}`)
});

const upload = multer({ storage });

const router = Router();

const payments = io => {
  router.post("/pay", upload.single("license"), (req, res, next) => {
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const plateNumber = req.body.plateNumber;
    const paymentId = req.body.paymentId;
    const status = req.body.status;
    const { filename } = req.file;

    const model = new UnclampingPayment({
      licenseFile: filename,
      plateNumber,
      latitude,
      longitude,
      paymentId,
      status
    });

    // Broadcast to /eta/pending


    return res.status(201);
  });

  return router;
};

module.exports = payments;
