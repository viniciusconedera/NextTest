export function formatDate(date: Date) {
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeZone: 'America/Montreal'
  });
}