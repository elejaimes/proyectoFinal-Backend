import mongoose, { connect } from "mongoose";

export const getClientPromise = async () => {
  try {
    await connect(process.env.URI_ATLAS);
    console.log(`Database connection is ready.`);
    return mongoose.connection.getClient(); // Devuelve el cliente de MongoDB
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error.message);
    throw error;
  }
};
