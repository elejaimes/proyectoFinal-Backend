import { transporter } from "../nodemailer.js";
import { logger } from "../../winston/logger.js";

export const singupEmailAdmin = async (body) => {
  try {
    const email = await transporter.sendMail({
      from: `"Nodemailer ⚡" <${process.env.SMTP_USER}>`,
      to: `${process.env.NODEMAILER_EMAIL_ADMIN}`,
      subject: "Nuevo registro en DB ✔",
      html: `
				<h1>Nuevo registro en DB 🔥</h1>
				<hr/>
				<h3>Informacion del Usuario:</h3>
				<ul>
					<li>
						<p><strong>Nombre:</strong> ${body.name}</p>
					</li>
					<li>
						<strong>Role:</strong> ${body.role}</p>
					</li>
					<li>
						<strong>Email:</strong> ${body.email}</p>
					</li>
					<li>
						<strong>Alta de usuario:</strong> ${body.createdAt}</p>
					</li>
				</ul>
				<hr/>
				`,
    });

    return email;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const singupEmailUser = async (body) => {
  try {
    const email = await transporter.sendMail({
      from: `"Nodemailer ⚡" <${process.env.SMTP_USER}>`,
      to: `${body.email}`,
      subject: "Registro exitoso ✔",
      html: `
				<h1>Gracias por registrarte 🚀</h1>
				<hr/>
				<h3>Informacion del Usuario:</h3>
				<ul>
					<li>
						<p><strong>Nombre:</strong> ${body.name}</p>
					</li>
					<li>
						<strong>Email:</strong> ${body.email}</p>
					</li>
					<li>
						<strong>Alta de usuario:</strong> ${body.createdAt}</p>
					</li>
				</ul>
				<hr/>
				`,
    });

    return email;
  } catch (error) {
    throw new Error(error.message);
  }
};
