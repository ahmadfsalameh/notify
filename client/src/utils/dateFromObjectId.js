export default (id) => {
  const timestamp = id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  return `${date.toDateString()} ${date.toLocaleTimeString()}`;
};
