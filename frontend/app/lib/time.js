export function getTimeDifference(timestamp) {
  if (isNaN(timestamp)) {
    return "unknown";
  }

  const timeDiffMs = Math.abs(timestamp - new Date().getTime());

  const secondsDiff = Math.floor(timeDiffMs / 1000);
  const minsDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minsDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  if (daysDiff > 0) {
    return `${daysDiff}d`;
  } else if (hoursDiff > 0) {
    return `${hoursDiff}h`;
  } else {
    return `${minsDiff}m`;
  }
}
