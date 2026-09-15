// Import helpers for parsing and formatting ISO dates.
import { parseISO, format } from 'date-fns';

// Render a readable date with its original machine-readable value.
export default function Date({ dateString }) {
  // Convert the ISO date string into a Date object.
  const date = parseISO(dateString);
  // Render the original date for machines and formatted text for readers.
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}