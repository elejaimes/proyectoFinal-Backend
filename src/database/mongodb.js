import { connect } from "mongoose";

export const connectToDatabase = async () => {
  try {
    await connect(process.env.URI_ATLAS);
    console.log(`Database connection is ready.`);
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error.message);
    throw error;
  }
};
