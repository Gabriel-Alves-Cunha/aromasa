export function assert<T>(
	condition: T,
	msg: string
): asserts condition is Exclude<T, undefined | null> {
	if (condition === null || condition === undefined) throw new Error(msg);
}
