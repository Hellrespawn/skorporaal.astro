export type DateFormat = "short" | "long";

interface HasDate {
  date?: Date;
  updated?: Date;
}

export abstract class DateFormatter {
  static getFormatter(format: DateFormat): DateFormatter {
    switch (format) {
      case "short":
        return new ShortDateFormatter();
      case "long":
        return new LongDateFormatter();
      default:
        throw new Error(`Unrecognized DateFormat: '${format}'`);
    }
  }

  abstract formatDate(item: HasDate): string;
  abstract formatDateTime(item: HasDate): string;

  /**
   * Converts a date to string.
   *
   * Reference:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
   */
  protected abstract dateTimeToString(date: Date): string;

  /**
   * Converts a date to string.
   *
   * Reference:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
   */
  protected abstract dateToString(date: Date): string;
}

class ShortDateFormatter extends DateFormatter {
  formatDate(item: HasDate): string {
    if (item.updated) {
      return `${this.dateToString(item.updated)}*`;
    }

    if (item.date) {
      return this.dateToString(item.date);
    }

    return "A long time ago...";
  }

  formatDateTime(item: HasDate): string {
    if (item.updated) {
      return `${this.dateTimeToString(item.updated)}*`;
    }

    if (item.date) {
      return this.dateTimeToString(item.date);
    }

    return "A long time ago...";
  }

  protected dateTimeToString(date: Date): string {
    return date.toLocaleString("en-GB", {
      dateStyle: "long",
      timeStyle: "short",
    });
  }

  protected dateToString(date: Date): string {
    return date.toLocaleString("en-GB", {
      dateStyle: "long",
      timeStyle: undefined,
    });
  }
}

class LongDateFormatter extends DateFormatter {
  formatDate(item: HasDate): string {
    const dateSegment = item.date
      ? this.dateToString(item.date)
      : "A long time ago...";

    const updatedSegment = item.updated
      ? `[Updated on ${this.dateToString(item.updated)}]`
      : "";

    return [dateSegment, updatedSegment].join(" ");
  }

  formatDateTime(item: HasDate): string {
    const dateSegment = item.date
      ? this.dateTimeToString(item.date)
      : "A long time ago...";

    const updatedSegment = item.updated
      ? `[Updated on ${this.dateTimeToString(item.updated)}]`
      : "";

    return [dateSegment, updatedSegment].join(" ");
  }

  protected dateTimeToString(date: Date): string {
    return date.toLocaleString("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
    });
  }

  protected dateToString(date: Date): string {
    return date.toLocaleString("en-GB", {
      dateStyle: "full",
      timeStyle: undefined,
    });
  }
}
