export const userDTO = ({ name, email, password, address, role }) => {
  const newUser = {
    name,
    email,
    password,
    address,
    role,
  };

  return newUser;
};
