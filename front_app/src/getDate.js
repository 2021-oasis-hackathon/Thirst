const getDate = () => {
  let today = new Date();
  return `${today.toISOString().split('T')[0]} ${String(
    today.getHours(),
  ).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}
  `;
};
export default getDate;
