import nodemailer from "nodemailer";
import { logger } from "../winston/logger.js";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Ignora la verificación del certificado SSL solo para modo desarrollo
  },
});

transporter.verify(function (error, success) {
  if (error) {
    logger.error(
      `===> ⚠️ Nodemailer error during verification: ${error.message}`
    );
  } else {
    logger.info(`===> ✉️ Nodemailer ready for sending emails ✉️`);
  }
});
