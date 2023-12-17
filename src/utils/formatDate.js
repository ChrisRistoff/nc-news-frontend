export const formatDate = (date) => {
  let newDate = new Date(date);

  const prefix = newDate.getHours() >= 12 ? "PM" : "AM";

  const dateString = newDate.toString().split(' ')

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  let hour = dateString[4].split(':')
  let weekDay = dateString[0]
  hour.pop()

  if (hour[0] > 12) {
    hour[0] = hour[0] - 12
  }

  hour = hour.join(':')

  let day = newDate.getDate();
  let month = newDate.getMonth() - 1;
  let year = newDate.getFullYear();

  const daySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    if (day % 10 === 1) return "st";
    if (day % 10 === 2) return "nd";
    if (day % 10 === 3) return "rd";
    return "th";
  }

  return `${hour} ${prefix} on ${weekDay} ${day}${daySuffix(day)} ${monthNames[month]} ${year}`;
}
