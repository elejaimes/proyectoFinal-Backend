import session from "express-session";
import MongoStore from "connect-mongo";
import { getClientPromise } from "../database/mongodb.js";

// Obtener la promesa del cliente de MongoDB
const clientPromise = getClientPromise();

const sessionMiddleware = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise, // Usar la promesa del cliente de MongoDB
    dbName: "backend_final",
    ttl: 2 * 24 * 60 * 60, // Tiempo de vida de la sesión en segundos (2 días)
  }),
});

export default sessionMiddleware;
