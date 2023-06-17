export const emailIsValid = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};
