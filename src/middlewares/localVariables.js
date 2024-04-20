import { authDAO } from "../dao/indexDAO.js";

export const localVariables = async (req, res, next) => {
  try {
    // res.locals.csrfToken = req.csrfToken();
    res.locals.errorMessages = req.flash("errorMessages");
    res.locals.successMessages = req.flash("successMessages");

    if (req.isAuthenticated()) {
      const user = await authDAO.findUserByEmail(req.user.email);
      res.locals.user = user;
    } else {
      res.locals.user = null;
    }

    next();
  } catch (error) {
    next(error);
  }
};
