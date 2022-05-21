const emailre = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordre = /^(?=.*\d)(?=.*[-+/><!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const emailVal = (email: string) => {
  return emailre.test(email);
};

export const passwordVal = (password: string) => {
  return passwordre.test(password);
};
