const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { email, message } = req.body;
  console.log("Odebrany body:", req.body);

  if (!email || !message) {
    return res.status(400).json({ error: "Brak wymaganych danych." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Foodiary Kontakt" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "Wiadomość z formularza kontaktowego",
      html: `
        <p><strong>Od:</strong> ${email}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Błąd przy wysyłce maila:", err);
    res.status(500).json({ error: "Nie udało się wysłać wiadomości." });
  }
});

module.exports = router;
