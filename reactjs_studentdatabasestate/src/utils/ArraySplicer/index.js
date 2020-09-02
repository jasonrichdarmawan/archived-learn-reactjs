export const ArraySplicer = (array, lengthCol) => {
  let res = [];
  let temporary = array.slice();
  for (let i = temporary.length / lengthCol; i > 0; i--) {
    res.push(temporary.splice(0, lengthCol));
  }
  return res;
};
