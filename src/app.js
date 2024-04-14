import express from "express";
import "dotenv/config";
import { getClientPromise } from "./database/mongodb.js";
// import session from "express-session";
import csrf from "csurf";
import { logger } from "./config/winston/logger.js";
import connectFlash from "connect-flash";
import sessionMiddleware from "./middlewares/sessions.js";
import { authentication } from "./middlewares/passport.js";
// import { attachUser } from "./middlewares/auth.js";
import { create } from "express-handlebars";
import {
  formatPrices,
  getSession,
  shortenDescription,
} from "./helpers/handlebars.js";
import { indexWeb } from "./web/index.js";
import {
  handle500Error,
  handleBadRequestError,
  handleForbiddenError,
  handleNotFoundError,
  handleUnauthorizedError,
} from "./middlewares/error.js";

// Conectar a Database
(async () => {
  try {
    await getClientPromise();
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    process.exit(1);
  }
})();

// Configuración del modulo de trabajo express
export const app = express();

//Configuración de sesiones, se comenta porque ahora tenemos un middleware para almacenar la sessión en mongo
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     name: "secret-name",
//     cookie: {
//       expires: new Date(Date.now() + 3600000), // 3600000 milisegundos es 1 hora
//     },
//   })
// );
app.use(sessionMiddleware);

// Configuración de passport

app.use(authentication);
// app.use(attachUser);

// Configuración de middleware para manejar archivos estáticos
app.use("/public", express.static("./public"));

//Configuración para formularios
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Configuración de CSRF
app.use(csrf());

// Configuración de connect-flash
export const flash = connectFlash();
app.use(flash);

// Configuración del motor de vistas handlebars
const hbs = create({
  extname: ".hbs",
  defaultLayout: "frontend",
  helpers: {
    shortenDescription,
    formatPrices,
    getSession,
  },
  partialsDir: ["./public/views/components"],
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./public/views");

// // Configuración de los middleware de manejo de errores
app.use(handleBadRequestError);
app.use(handleUnauthorizedError);
app.use(handleForbiddenError);
app.use(handleNotFoundError);
app.use(handle500Error);

// //variables locales
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.errorMessages = req.flash("errorMessages");
  res.locals.successMessages = req.flash("successMessages");
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  } else {
    res.locals.user = null; // Opcional: si no está autenticado, establece user en null
  }
  next();
});

// Configuración de las rutas
app.use("/", indexWeb);

// Middleware para manejar errores no capturados
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Configuración del puerto
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on PORT: ${
      process.env.PORT
    } - ${new Date().toLocaleString()}`
  );
});
