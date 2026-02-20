/**
 * Get today's date as YYYY-MM-DD string
 */
export function getToday(): string {
  return formatDate(new Date());
}

/**
 * Format a Date object to YYYY-MM-DD string
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse YYYY-MM-DD string to Date object
 */
export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format date for display: "Thu, 19 Feb 2026"
 */
export function formatDateDisplay(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format date for short display: "19 Feb"
 */
export function formatDateShort(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Check if a date string is today
 */
export function isToday(dateStr: string): boolean {
  return dateStr === getToday();
}

/**
 * Get date string for N days ago
 */
export function daysAgo(n: number): string {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return formatDate(date);
}

/**
 * Get array of date strings for the last N days
 */
export function getLastNDays(n: number): string[] {
  const dates: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    dates.push(daysAgo(i));
  }
  return dates;
}

/**
 * Get month and year string: "February 2026"
 */
export function getMonthYear(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
