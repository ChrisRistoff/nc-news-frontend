export const formatDate = (date) => {
  let newDate = new Date(date);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  let day = newDate.getDate();
  let month = newDate.getMonth() - 1;
  let year = newDate.getFullYear();

  return `${day} ${monthNames[month]}, ${year}`;
}
