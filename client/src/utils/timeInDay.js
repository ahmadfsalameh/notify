export default () => {
  const date = new Date();
  const hrs = date.getHours();

  if (hrs < 12) return "morning";
  else if (hrs >= 12 && hrs <= 17) return "afternoon";
  else if (hrs >= 17 && hrs <= 24) return "evening";
};
