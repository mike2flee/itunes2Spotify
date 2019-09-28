export const filter = x => {
  let newX = x.split(/[!@#$%^&*,']/, 1);
  return newX;
};
