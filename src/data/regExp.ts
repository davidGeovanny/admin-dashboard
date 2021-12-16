export const regularExpressions = {
  user    : /^[a-zA-Z0-9_-]/, // Letras, numeros, guion y guion_bajo
  name    : /^[a-zA-ZÀ-ÿ\s]/, // Letras y espacios, pueden llevar acentos.
  password: /^./, 
  email   : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/,
  phone   : /^\d/ 
};