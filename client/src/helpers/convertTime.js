export function convertMinutesTo24hFormat(minutesFromMidnight) {
  const hours = Math.floor(minutesFromMidnight / 60);
  const minutes = minutesFromMidnight % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

export const convertToDate = (minutes) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  now.setMinutes(minutes);
  return now;
};
