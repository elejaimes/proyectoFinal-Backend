import { logger } from "../config/winston/logger.js";

// Middleware para manejar el error 404 (Bad Request)
export function handleBadRequestError(err, req, res, next) {
  if (err.status === 400) {
    logger.error(err.stack); // Registrar el error con Winston
    res
      .status(err.status)
      .json({ error: err.message || "Error al procesar la solicitud" });
  } else {
    next(err);
  }
}

// Middleware para manejar el error de autenticación (Unauthorized)
export function handleUnauthorizedError(err, req, res, next) {
  if (err.status === 401) {
    logger.error(err.stack); // Registrar el error con Winston
    res.status(err.status).json({ error: err.message || "No autorizado" });
  } else {
    next(err);
  }
}

// Middleware para manejar el error de autorización (Forbidden)
export function handleForbiddenError(err, req, res, next) {
  if (err.status === 403) {
    logger.error(err.stack); // Registrar el error con Winston
    res.status(err.status).json({ error: err.message || "Prohibido" });
  } else {
    next(err);
  }
}

// Middleware para manejar el error 404 (Not Found)
export function handleNotFoundError(err, req, res, next) {
  if (err.status === 404) {
    logger.error(err.stack); // Registrar el error con Winston
    res
      .status(err.status)
      .json({ error: err.message || "Página o producto no encontrado" });
  } else {
    next(err);
  }
}

// Middleware para manejar cualquier otro error interno del servidor
export function handle500Error(err, req, res, next) {
  logger.error(err.stack); // Registrar el error con Winston
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Error interno del servidor" });
}
