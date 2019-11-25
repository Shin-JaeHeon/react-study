export function popItem<T>(array: Array<T>, i: number): Array<T> {
    return array.reduce((prev, now, index) => i !== index ? [...prev, now] : prev, []);
}

export const inputChanged = vm => event => vm[event.target.name] = event.target.value;