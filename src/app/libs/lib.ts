export function popItem<T>(array: Array<T>, i: number): Array<T> {
    return array.reduce((prev, now, index) => i !== index ? [...prev, now] : prev, []);
}