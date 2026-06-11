export function generateOrderNumber(date = new Date()) {
  const day = date.toISOString().slice(0, 10).replace(/-/g, "");
  const time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`.padStart(6, "0");
  return `PDN-${day}-${time}`;
}
