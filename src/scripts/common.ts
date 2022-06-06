import _slugify from "slugify";

/**
 * Slugify string.
 *
 * TODO? Limit length of slugified strings?
 *
 * @return slugified string
 */
export function slugify(string: string): string {
  return _slugify(string, { lower: true, strict: true });
}

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
