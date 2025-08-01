type Timeout = ReturnType<typeof setTimeout>;
type PlainObject = Record<string, any>;

/* eslint-disable */
export const range = (start: number, end?: number, step: number = 1) => {
    let output = [];
    if (typeof end === "undefined") {
        end = start;
        start = 0;
    }
    for (let i = start; i < end; i += step) {
        output.push(i);
    }
    return output;
};
/* eslint-enable */

export function sampleOne<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function sample<T>(arr: Array<T>, len = 1): Array<T> {
    let output = [];

    for (let i = 0; i < len; i++) {
        output.push(sampleOne(arr));
    }

    return output;
}

export const random = (
    min: number,
    max: number,
    { rounded }: { rounded: boolean } = { rounded: true }
) => {
    const partialVal = Math.random() * (max - min);

    if (rounded) {
        return Math.floor(partialVal) + min;
    } else {
        return partialVal + min;
    }
};

export const sum = (values: Array<number>) =>
    values.reduce((sum, value) => sum + value, 0);

export const mean = (values: Array<number>) => sum(values) / values.length;

export const clamp = (value: number, min = 0, max = 1) => {
    // We might be passing in "inverted" values, eg:
    //    clamp(someVal, 10, 5);
    //
    // This is especially common with `clampedNormalize`.
    // In these cases, we'll flip the min/max so that the function works as expected.
    const actualMin = Math.min(min, max);
    const actualMax = Math.max(min, max);

    return Math.max(actualMin, Math.min(actualMax, value));
};

export const roundTo = (value: number, places = 0) =>
    Math.round(value * 10 ** places) / 10 ** places;

export const roundToNearest = (value: number, step: number) =>
    Math.round(value / step) * step;

export const debounce =
    (callback: any, wait: number, timeoutId: Timeout | null = null) =>
    (...args: Array<any>) => {
        if (typeof timeoutId === "number") {
            window.clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };

export const throttle = (func: Function, limit: number) => {
    let lastFunc: Timeout;
    let lastRan: number;
    return function (...args: any) {
        if (!lastRan) {
            func.apply(null, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(
                function () {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(null, args);
                        lastRan = Date.now();
                    }
                },
                limit - (Date.now() - lastRan)
            );
        }
    };
};

// This version of `throttle` returns a `cancel` function I can call if I want to cancel the throttle.
// NOTE: I don't *need* to use this to avoid memory leaks. Even if a component unmounts mid-throttle, it will only trigger 1 more time, and won't set a new `setTimeout`. So it should be used only when I really want to prevent the throttle from running 1 more time.
export const throttleV2 = (func: Function, limit: number) => {
    let timeoutId: Timeout;
    let lastRan: number;
    const wrappedFunc = function (...args: any) {
        if (!lastRan) {
            func.apply(null, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(
                function () {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(null, args);
                        lastRan = Date.now();
                    }
                },
                limit - (Date.now() - lastRan)
            );
        }
    };

    function cancel() {
        clearTimeout(timeoutId);
    }

    return [wrappedFunc, cancel];
};

export const slugify = (str = "") => {
    let slug = str
        .toLowerCase()
        .replace(/\s/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "");

    // Replace all numbers with their word counterpart
    slug = replaceDigits(slug);

    return slug;
};
export const isEmpty = (obj: Object) => Object.keys(obj).length === 0;

export const getInterpolatedValue = (y1: number, y2: number, ratio: number) => {
    // We're assuming that `ratio` is a value between 0 and 1.
    // If this were a graph, it'd be our `x`, and we're trying to solve for `y`.
    // First, find the slope of our line.
    const slope = y2 - y1;

    return slope * ratio + y1;
};

export const camelToDashCase = (val: string) =>
    val.replace(/[A-Z0-9]/g, (letter: string) => `-${letter.toLowerCase()}`);

export const dashToCamelCase = (val: string) => {
    return val.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const pick = (obj: PlainObject, keys: Array<string>) => {
    let o: PlainObject = {};
    let i = 0;
    let key;

    keys = Array.isArray(keys) ? keys : [keys];

    while ((key = keys[i++])) {
        if (typeof obj[key] !== "undefined") {
            o[key] = obj[key];
        }
    }
    return o;
};

export const omit = function (obj: PlainObject, key: string) {
    let newObj: PlainObject = {};

    for (var name in obj) {
        if (name !== key) {
            newObj[name] = obj[name];
        }
    }

    return newObj;
};

export const convertArrayToMap = (arr: Array<any>) =>
    arr.reduce(
        (acc, item) => ({
            ...acc,
            [item.id]: item,
        }),
        {}
    );

// Either removes or adds an item to an array
// EXAMPLE: toggleInArray([1, 2], 3) -> [1, 2, 3]
// EXAMPLE: toggleInArray([1, 2], 2) -> [1]
export const toggleInArray = (arr: Array<any>, item: any) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

// Combines 2 arrays, removing duplicates.
// EXAMPLE: mergeUnique([1, 2], [2, 3]) -> [1, 2, 3]
export const mergeUnique = (arr1: Array<any>, arr2: Array<any>) =>
    arr1.concat(arr2.filter((item) => arr1.indexOf(item) === -1));

export const findRight = (arr: Array<any>, predicate: (val: any) => boolean) =>
    arr.slice().reverse().find(predicate);

export function requestAnimationFramePromise() {
    return new Promise((resolve) => window.requestAnimationFrame(resolve));
}

export const capitalize = (value: string) =>
    value[0].toUpperCase() + value.slice(1);

export const capitalizeSentence = (value: string) => {
    return value
        .split(" ")
        .map((word) => {
            return word[0].toUpperCase() + word.slice(1);
        })
        .join(" ");
};

export const deleteCookie = (key: string) => {
    document.cookie = `${encodeURIComponent(
        key
    )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const convertHexToRGBA = (hex: string, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const hyphenate = (value: string) =>
    value.replace(/([A-Z])/g, "-$1").toLowerCase();

export const delay = (duration: number) =>
    new Promise((resolve) => setTimeout(resolve, duration));

export const getTimeOfDay = () => {
    const now = new Date();
    const hourOfDay = now.getHours();

    if (hourOfDay <= 4) {
        return "night";
    } else if (hourOfDay <= 11) {
        return "morning";
    } else if (hourOfDay <= 17) {
        return "afternoon";
    } else if (hourOfDay <= 21) {
        return "evening";
    } else {
        return "night";
    }
};

export const generateId = (len = 4, { includeDigits = false } = {}) => {
    // prettier-ignore
    let characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    if (includeDigits) {
        characters.push("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    }

    return sample(characters, len).join("");
};

export const normalize = (
    number: number,
    currentScaleMin: number,
    currentScaleMax: number,
    newScaleMin = 0,
    newScaleMax = 1
) => {
    // FIrst, normalize the value between 0 and 1.
    const standardNormalization =
        (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

    // Next, transpose that value to our desired scale.
    return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const clampedNormalize = (
    number: number,
    currentScaleMin: number,
    currentScaleMax: number,
    newScaleMin = 0,
    newScaleMax = 1
) => {
    return clamp(
        normalize(
            number,
            currentScaleMin,
            currentScaleMax,
            newScaleMin,
            newScaleMax
        ),
        newScaleMin,
        newScaleMax
    );
};

// TODO: Use a single `Point` type!
type Point = [number, number];
type PointObj = { x: number; y: number };

export const getDistanceBetweenPoints = (p1: PointObj, p2: PointObj) => {
    const deltaX = Math.abs(p2.x - p1.x);
    const deltaY = Math.abs(p2.y - p1.y);

    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};

export const convertDegreesToRadians = (angle: number) =>
    (angle * Math.PI) / 180;

export const convertRadiansToDegrees = (angle: number) =>
    (angle * 180) / Math.PI;

export const convertCartesianToPolar = (point: Point, centerPoint = [0, 0]) => {
    const pointRelativeToCenter: Point = [
        point[0] - centerPoint[0],
        point[1] - centerPoint[1],
    ];

    const [x, y] = pointRelativeToCenter;

    // When going from cartesian to polar, it struggles with negative numbers.
    // We need to take quadrants into account!
    const quadrant = getQuadrantForPoint(pointRelativeToCenter);

    let radiansOffset = 0;
    if (quadrant === 2 || quadrant === 3) {
        radiansOffset += Math.PI;
    } else if (quadrant === 4) {
        radiansOffset += 2 * Math.PI;
    }

    const radius = Math.sqrt(x ** 2 + y ** 2);
    let theta = Math.atan(y / x) + radiansOffset;

    return [theta, radius];
};

export const convertPolarToCartesian = ([θ, radius]: Point): [
    number,
    number,
] => {
    const x = radius * Math.cos(θ);
    const y = radius * Math.sin(θ);

    return [x, y];
};

export const getQuadrantForPoint = ([x, y]: Point) => {
    if (x >= 0 && y >= 0) {
        return 1;
    } else if (x < 0 && y >= 0) {
        return 2;
    } else if (x < 0 && y < 0) {
        return 3;
    } else if (x >= 0 && y < 0) {
        return 4;
    } else {
        throw new Error(`Invalid coordinates: ${x} and ${y}`);
    }
};

/**
 * input:  "js,cat cat,  bee, dog"
 * output: ['js', 'cat cat', 'bee', 'dog']
 */
export const splitCommaSeparatedArray = (value: string) => {
    return value.replace(/,\s+/g, ",").split(",");
};

export function hash(value: string) {
    var hash = 0,
        i,
        chr;
    if (value.length === 0) return hash;
    for (i = 0; i < value.length; i++) {
        chr = value.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

/**
 * Given 3-4 points for a cubic bezier curve, figure out the X/Y values for
 * `t`, a number from 0-1 representing progress.
 */
export const getValuesForBezierCurve = (
    {
        startPoint,
        endPoint,
        controlPoint1,
        controlPoint2,
    }: {
        startPoint: Point;
        endPoint: Point;
        controlPoint1: Point;
        controlPoint2: Point;
    },
    t: number
): Point => {
    let x, y;
    if (controlPoint2) {
        // Cubic Bezier curve
        x =
            (1 - t) ** 3 * startPoint[0] +
            3 * (1 - t) ** 2 * t * controlPoint1[0] +
            3 * (1 - t) * t ** 2 * controlPoint2[0] +
            t ** 3 * endPoint[0];

        y =
            (1 - t) ** 3 * startPoint[1] +
            3 * (1 - t) ** 2 * t * controlPoint1[1] +
            3 * (1 - t) * t ** 2 * controlPoint2[1] +
            t ** 3 * endPoint[1];
    } else {
        // Quadratic Bezier curve
        x =
            (1 - t) * (1 - t) * startPoint[0] +
            2 * (1 - t) * t * controlPoint1[0] +
            t * t * endPoint[0];
        y =
            (1 - t) * (1 - t) * startPoint[1] +
            2 * (1 - t) * t * controlPoint1[1] +
            t * t * endPoint[1];
    }

    return [x, y];
};

export const getYValueForBezier = function (
    xTarget: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) {
    var xTolerance = 0.0001;
    var myBezier = function (t: number) {
        return getValuesForBezierCurve(
            {
                startPoint: [0, 0],
                controlPoint1: [x1, y1],
                controlPoint2: [x2, y2],
                endPoint: [1, 1],
            },
            t
        );
    };

    // Binary search to find an approximation for `X`

    //establish bounds
    var lower = 0;
    var upper = 1;
    var percent = (upper + lower) / 2;

    var x = myBezier(percent)[0];

    while (Math.abs(xTarget - x) > xTolerance) {
        if (xTarget > x) lower = percent;
        else upper = percent;

        percent = (upper + lower) / 2;
        x = myBezier(percent)[0];
    }

    return myBezier(percent)[1];
};

export function moveCursorWithinInput(
    input: HTMLInputElement,
    position: number
) {
    // Super old browsers (like, IE?) don't support this.
    if (!input.setSelectionRange) {
        return;
    }

    input.focus();
    input.setSelectionRange(position, position);
}

export async function copyToClipboard(content: string) {
    try {
        await navigator.clipboard.writeText(content);
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
}

/**
 * This method will call the callback for every value in the
 * object, and return a new object with transformed values.
 * This is useful if, eg., you need to capitalize every value in
 * a dictionary-style object with string values.
 */
export const transformValues = (
    obj: PlainObject,
    callback: (key: string, value: any) => any
) => {
    if (typeof obj !== "object") {
        return obj;
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
        return {
            ...acc,
            [key]: callback(key, value),
        };
    }, {});
};

// This method is like `transformValues`, except we can change both the value *and* keys.
export const transformObject = (
    obj: PlainObject,
    callback: (key: string, value: any) => [string, any]
) => {
    if (typeof obj !== "object") {
        return obj;
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
        const [newKey, newValue] = callback(key, value);
        return {
            ...acc,
            [newKey]: newValue,
        };
    }, {});
};

// In a string, turn digits (1) into spelled words (one)
export const replaceDigits = (value: string) => {
    return value
        .replace(/1/g, "one")
        .replace(/2/g, "two")
        .replace(/3/g, "three")
        .replace(/4/g, "four")
        .replace(/5/g, "five")
        .replace(/6/g, "six")
        .replace(/7/g, "seven")
        .replace(/8/g, "eight")
        .replace(/9/g, "nine")
        .replace(/0/g, "zero");
};

// Sometimes, we want to lock a value within a range, having it wrap around. The specific use case in mind was radians: having an angle always be between 0rad and 2rad. A value of 2.5rad would wrap around to 0.5rad.
export const wrapCircularValue = (value: number, min: number, max: number) => {
    // Our default calculation fails if `min` is less than 0.
    let offset = 0;
    if (min < 0) {
        offset = Math.abs(min);
        min = 0;
        max += offset;
        value += offset;
    }

    const range = max - min;
    const newValue = value % range;

    let returnValue = newValue < 0 ? newValue + range : newValue;

    return returnValue - offset;
};

export const mix = (v1: number, v2: number, ratio: number = 0.5): number =>
    v1 * (1 - ratio) + v2 * ratio;

export function mixAngles(
    angle1: number,
    angle2: number,
    ratio: number
): number {
    // Normalize angles to [0, 2 * Math.PI)
    angle1 = angle1 % (2 * Math.PI);
    if (angle1 < 0) angle1 += 2 * Math.PI;

    angle2 = angle2 % (2 * Math.PI);
    if (angle2 < 0) angle2 += 2 * Math.PI;

    // Calculate the difference
    let delta = angle2 - angle1;

    // Ensure the smallest possible delta (handle wrap-around)
    if (delta > Math.PI) {
        delta -= 2 * Math.PI;
    } else if (delta < -Math.PI) {
        delta += 2 * Math.PI;
    }

    // Interpolate
    let mixedAngle = angle1 + delta * ratio;

    return mixedAngle;
}

// This function removes basic HTML tags from strings:
// "hello <span>world</span>" -> "hello world"
//
// NOTE: It's very basic; I don't think it can handle HTML with attributes, or self-closing tags.
export function stripHtmlTags(inputString: string) {
    const htmlTagPattern = /<\/?[^>]+>/gi;
    return inputString.replace(htmlTagPattern, "");
}
