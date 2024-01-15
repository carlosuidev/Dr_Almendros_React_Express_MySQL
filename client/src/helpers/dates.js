export const formatEuDate = (date) => {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
};

export const formatDateInput = (date) => {
  const [d, m, y] = date.split("/");
  return `${y}-${m}-${d}`; 
}