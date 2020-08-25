export const dateFormatter = (unix) => {
  if (!unix) return null;
  return new Date(unix * 1000).toString().split(" ").slice(0, 5).join(" ");
};

export const priceFormatter = (type, iat) => {
  if (type === "Car") {
    const durationInMinutes = Math.ceil((Date.now() / 1000 - iat) / 60);
    if (durationInMinutes >= 1) return 5000 + 3000 * (durationInMinutes - 1);
    else return 5000;
  }
  if (type === "Motorcycle") {
    const durationInMinutes = Math.ceil((Date.now() / 1000 - iat) / 60);
    if (durationInMinutes >= 1) return 3000 + 1000 * (durationInMinutes - 1);
    else return 3000;
  }
};