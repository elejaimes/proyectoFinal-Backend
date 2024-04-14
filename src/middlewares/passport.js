import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as GithubStrategy } from "passport-github2";
import {
  authService,
  roleService,
  userService,
} from "../service/indexService.js";

// Estrategia local para el registro

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        // Verificar si el correo electrónico ya está registrado
        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
          return done(null, false, {
            message: "El email ya se encuentra en uso",
          });
        }
        //obtener el rol predetermiando de la base de datos
        const defaultRole = await roleService.findDefaultUserRole();
        if (!defaultRole) {
          return done(new Error("No se encontró el rol predeterminado"));
        }
        // Crear el nuevo usuario con el rol predeterminado
        const newUser = await userService.postUser({
          name: req.body.name,
          email,
          password,
          address: req.body.address,
          role: defaultRole._id,
        });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//Estratégia local para el login

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        //Buscar el usuario por email
        const user = await authService.findUserByEmail(email);
        if (!user) {
          return done(null, false, {
            message: "Usuario o contraseña incorrectos no encontrado",
          });
        }
        // Verificar la constraseña
        const isValidPassword = authService.validPass(password, user.password);
        if (!isValidPassword) {
          return done(null, false, {
            message: "Usuario o contraseña incorrectos no encontrado",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Estrategia de autenticación de GitHub
// passport.use(
//   "github",
//   new GithubStrategy(
//     {
//       clientID: process.env.GH_CLIENT_ID,
//       clientSecret: process.env.GH_CLIENT_SECRET,
//       callbackURL: process.env.GH_CALLBACK_URL,
//     },
//     async function verify(accessToken, refreshToken, profile, done) {
//       console.log(profile);

//       const user = await UserModel.findOne({ email: profile.username });
//       if (user) {
//         return done(null, {
//           ...user.infoPublica(),
//           rol: "user",
//         });
//       }

//       try {
//         const registeredUser = await UserModel.create({
//           email: profile.username,
//           password: "(sin especificar)",
//           firstName: profile.displayName,
//           lastName: "(sin especificar)",
//         });
//         done(null, {
//           ...registeredUser.infoPublica(),
//           rol: "user",
//         });
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// serializeUser: Convierte el objeto de usuario en una identificación única para almacenar en la sesión
passport.serializeUser((user, done) => {
  const userId = user._id;
  done(null, userId);
});

// deserializeUser: Toma la identificación única y la convierte de nuevo en un objeto de usuario
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const initializePassport = passport.initialize();
const sessionPassport = passport.session();

export function authentication(req, res, next) {
  initializePassport(req, res, (error) => {
    if (error) {
      return next(error);
    }
    sessionPassport(req, res, next);
  });
}
