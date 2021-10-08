export type Some<T> = {
	readonly isSome: boolean; // true for `Some`
	readonly value: NonNullable<T>;
};

export type None = {
	readonly isSome: boolean; // false for `Some`
	readonly value: null;
};

export type Option<T> = Some<T> | None;

export function unwrap<T>(self: Option<T>) {
	if (self.isSome) return self.value;
	throw new Error("Called `Option::unwrap()` on a `None` value!");
}

export function unwrapOr<T>(self: Option<T>, default_: T): T {
	if (self.isSome) return self.value as T;
	return default_;
}

export function isSome<T>(self: Option<T>): boolean {
	return self.isSome;
}

export function isNone<T>(self: Option<T>): boolean {
	return !self.isSome;
}

export function Some<T>(value: NonNullable<T>): Some<T> {
	const some: Some<T> = Object.freeze({ isSome: true, value });

	some.toString = () => `Some(${some.value})`;

	return some;
}
