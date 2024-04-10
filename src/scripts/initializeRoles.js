import mongoose from "mongoose";
import { config } from "dotenv";
import { RoleModel } from "../models/role.js";

// Cargar variables de entorno desde el archivo .env
config();

// Obtener la URL de MongoDB desde las variables de entorno
const mongoURI = process.env.URI_ATLAS;

// Conexión a la base de datos
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Datos iniciales de roles
const initialRoles = [{ role: "user" }, { role: "premium" }, { role: "admin" }];

// Función para inicializar roles
const initializeRoles = async () => {
  try {
    // Eliminar roles existentes
    await RoleModel.deleteMany();

    // Crear roles iniciales
    await RoleModel.insertMany(initialRoles);

    console.log("Roles inicializados correctamente.");
  } catch (error) {
    console.error("Error al inicializar roles:", error);
  } finally {
    // Cerrar conexión a la base de datos
    mongoose.disconnect();
  }
};

// Ejecutar la función de inicialización
initializeRoles();
