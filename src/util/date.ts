export type DateFormat = "short" | "long";

export interface HasDate {
    date?: Date | undefined;
    updated?: Date | undefined;
}

export abstract class DateFormatter {
    protected abstract dateOptions: DateOptions;
    protected abstract dateTimeOptions: DateOptions;

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

    formatDate(item: HasDate): string {
        return this.format(item, this.dateOptions);
    }

    formatDateTime(item: HasDate): string {
        return this.format(item, this.dateTimeOptions);
    }

    protected abstract format(item: HasDate, dateOptions: DateOptions): string;
}

interface DateOptions {
    lang: string;
    options: Intl.DateTimeFormatOptions;
}

class ShortDateFormatter extends DateFormatter {
    protected dateOptions: DateOptions = {
        lang: "en-GB",
        options: {
            dateStyle: "long",
            timeStyle: undefined,
        },
    };

    protected dateTimeOptions: DateOptions = {
        lang: "en-GB",
        options: {
            dateStyle: "long",
            timeStyle: "short",
        },
    };

    protected format(
        item: HasDate,
        dateOptions: {
            lang: string;
            options: Intl.DateTimeFormatOptions;
        }
    ): string {
        const { lang, options } = dateOptions;

        if (item.updated) {
            return `${item.updated.toLocaleString(lang, options)}*`;
        }

        if (item.date) {
            return item.date.toLocaleString(lang, options);
        }

        return "A long time ago...";
    }
}

class LongDateFormatter extends DateFormatter {
    protected dateOptions: DateOptions = {
        lang: "en-GB",
        options: {
            dateStyle: "full",
            timeStyle: undefined,
        },
    };

    protected dateTimeOptions: DateOptions = {
        lang: "en-GB",
        options: {
            dateStyle: "full",
            timeStyle: "short",
        },
    };

    protected format(
        item: HasDate,
        dateOptions: {
            lang: string;
            options: Intl.DateTimeFormatOptions;
        }
    ): string {
        const { lang, options } = dateOptions;

        const dateSegment = item.date
            ? item.date.toLocaleString(lang, options)
            : "A long time ago...";

        const updatedSegment = item.updated
            ? `[Updated on ${item.updated.toLocaleString(lang, options)}]`
            : "";

        return [dateSegment, updatedSegment].join(" ");
    }
}
