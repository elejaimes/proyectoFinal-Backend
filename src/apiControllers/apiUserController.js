import passport from "passport";
import {
  cartService,
  roleService,
  userService,
} from "../service/indexService.js";
import { logger } from "../config/winston/logger.js";

// Obtener todos los usuarios (solo por admin)
export const getUsers = async (req, res) => {
  try {
    const { limit = 10, since = 0, filterState } = req.query;

    const { users, totalUsers } = await userService.getUsers(
      filterState,
      limit,
      since
    );

    res.status(200).json({
      status: "Ok",
      totalUsers,
      users,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Crear un usuario (solo por admin)
export const postUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const newUser = {
      name,
      email,
      password,
      address,
      role,
    };

    const user = await userService.postUser(newUser);

    res.status(201).json({
      status: "Ok",
      message: "Usuario creado exitosamente",
      user,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por su ID (solo por admin)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.status(200).json({
      status: "Ok",
      user,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario (solo por admin)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, ...rest } = req.body;

    const newState = state === "true";

    const user = await userService.updateUser(id, { ...rest, state: newState });

    res.status(200).json({
      status: "Ok",
      message: "Usuario modificado exitosamente",
      user,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario (solo por admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await userService.deleteUser(id);

    res.status(200).json({
      status: "Ok",
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Registro de usuarios

// Registro de usuarios
export const postUser_register = async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    try {
      if (err) {
        throw new Error(err);
      }
      if (!user) {
        throw new Error(info.message);
      }

      const cart = await cartService.createUserCart(user._id);
      await cartService.associateUserCart(user._id, cart._id);

      req.logIn(user, async (err) => {
        if (err) {
          throw new Error(err);
        }

        res.status(201).json({
          status: "Ok",
          message: "Registro completado exitosamente",
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })(req, res, next);
};

// login de usuarios

// Inicio de sesión de usuarios
export const postUsers_login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        throw new Error("Hubo un problema durante el inicio de sesión.");
      }
      if (!user) {
        throw new Error(info.message);
      }

      let cart = await cartService.findCartByUserId(user._id);

      if (!cart) {
        cart = await cartService.createCart(user._id);
      }

      req.logIn(user, async (err) => {
        if (err) {
          throw new Error("Hubo un problema durante el inicio de sesión.");
        }

        req.session.user = user;
        res.status(200).json({
          status: "Ok",
          message: "Inicio de sesión exitoso",
        });
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  })(req, res, next);
};

// Cerrar sesión de usuarios
export const logoutUser = (req, res) => {
  req.logout((error) => {
    if (error) {
      console.error("Error al cerrar sesión: ", error);
    }
    res.status(200).json({
      status: "Ok",
      message: "Logout exitoso",
    });
  });
};

// Actualizar datos del usuario logeado
export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    await userService.updateUserAndPassword(id, req.body);

    res.status(200).json({
      status: "Ok",
      message: "Perfil modificado exitosamente",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
