import { validationResult } from "express-validator";

export const formNormal = (req, res) => {
  return res.render("formNormal", { title: "Formulario Normal" });
};
export const formNormal_post = (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    req.flash("errorMessages", errors.array());
    return res.redirect("/formulario/normal");
  }
  const { name, lastName, email, password, address, city, state, text } =
    req.body;

  req.flash("successMessages", "Formulario enviado exitosamente");
  res.redirect("/formulario/normal");
};

export const formUpload = (req, res) => {
  return res.render("formUpload", { title: "Formulario Upload" });
};

export const formUpload_post = async (req, res) => {
  try {
    // Validaciones y procesamiento del archivo
    if (!req.file) {
      throw new Error("Debes seleccionar una imagen.");
    }

    const tipoImagen = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    if (!tipoImagen.includes(req.file.mimetype)) {
      throw new Error("Solo se admiten imágenes JPG, JPEG, PNG o GIF");
    }

    // Multer ya guardó el archivo en la carpeta ../uploads/images
    req.flash("successMessages", "Imagen subida exitosamente");
    return res.redirect("/formulario/upload");
  } catch (error) {
    console.error(error);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/formulario/upload");
  }
};
