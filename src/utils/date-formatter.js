export function formatToISO(dateString) {
  const dateParts = dateString.split(" ");
  const date = dateParts[0];
  const time = dateParts[1];

  const [year, month, day] = date.split("-");
  const [hours, minutes, seconds] = time.split(":");

  const isoDate = new Date(
    Date.UTC(year, month - 1, day, hours, minutes, seconds)
  ).toISOString();

  return isoDate;
}
