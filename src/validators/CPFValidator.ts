export const CPFValidator = (cpf: string) => {
  if (!cpf) return false;

  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") return false;

  if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false;

  for (let j = 0; j < 2; j++) {
    let sum = 0;
    for (let i = 0; i < 9 + j; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 + j - i);
    }
    const mod = sum % 11;
    const digit = mod < 2 ? 0 : 11 - mod;
    if (digit !== parseInt(cpf.charAt(9 + j))) return false;
  }

  return true;
};
