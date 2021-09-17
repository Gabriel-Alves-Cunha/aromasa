export type Some<T> = {
	readonly tag: "Some";
	readonly value: NonNullable<T>;
};

export enum None {}

export type Option<T> = Some<T> | None;

export function unwrap<T>(self: Option<T>) {
	if (typeof self === "object") return self.value;
	throw new Error("Called `Option::unwrap()` on a `None` value!");
}

export function unwrapOr<T>(self: Option<T>, default_: T): T {
	if (typeof self === "object") return self.value;
	return default_;
}

export function isSome<T>(self: Option<T>): boolean {
	return typeof self === "object";
}

export function isNone<T>(self: Option<T>): boolean {
	return typeof self !== "object";
}

export function Some<T>(val: NonNullable<T>): Some<T> {
	const some: Some<T> = Object.freeze({ tag: "Some", value: val });

	some.toString = function () {
		return `Some(${this.value})`;
	};

	return some;
}
