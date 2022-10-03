// 2. Counter Function

export function counter(initialValue: number = 0) {

    let counter = initialValue;

    return [
        () => counter,
        () => ++counter,
    ]
}