export const userDTO = ({ name, email, password, address, rol }) => {
  const newUser = {
    name,
    email,
    password,
    address,
    rol,
  };

  return newUser;
};
