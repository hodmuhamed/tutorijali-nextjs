import { format } from 'date-fns';

const BOSNIAN_MONTHS = [
  'januara', 'februara', 'marta', 'aprila', 'maja', 'juna',
  'jula', 'avgusta', 'septembra', 'oktobra', 'novembra', 'decembra'
];

export function formatBosnianDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = BOSNIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${day}. ${month} ${year}`;
}

export function formatIsoDate(dateString: string): string {
  return format(new Date(dateString), 'yyyy-MM-dd');
}
