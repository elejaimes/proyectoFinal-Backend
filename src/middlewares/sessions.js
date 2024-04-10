import session from "express-session";
import connectMongo from "connect-mongo";

const store = connectMongo.create({
  mongoUrl: process.env.URI_LOCAL,
  ttl: 60 * 60 * 24, // 1d,
});

export const sessions = session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
});
