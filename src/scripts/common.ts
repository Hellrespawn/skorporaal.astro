/**
 * Converts a date to string.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 */
export function dateTimeToString(date: Date): string {
  return date.toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

/**
 * Converts a date to string.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 */
export function dateToString(date: Date): string {
  return date.toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: undefined,
  });
}
