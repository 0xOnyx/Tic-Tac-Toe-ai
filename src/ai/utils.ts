export class Ref<T> {
    constructor(public value: T) {}
}

export function max(a: number, b: number): number {
    return a > b ? a : b;
}

export function min(a: number, b: number): number {
    return a < b ? a : b;
}