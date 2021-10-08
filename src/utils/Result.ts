export type Ok<T> = {
	readonly isOk: boolean; // true for `Ok`
	readonly value: NonNullable<T>;
};

export type Err<E> = {
	readonly isOk: boolean; // false for `Err`
	readonly value: NonNullable<E>;
};

export type Result<T, E> = Ok<T> | Err<E>;

export function unwrap<T, E>(self: Result<T, E>): T {
	if (self.isOk) return self.value as T;
	throw new Error(JSON.stringify(self.value as E, null, 2));
}

export function unwrapOr<T, E>(self: Result<T, E>, default_: T): T {
	if (self.isOk) return self.value as T;
	return default_;
}

export function isErr<T, E>(self: Result<T, E>): boolean {
	return !self.isOk;
}

export function isOk<T, E>(self: Result<T, E>): boolean {
	return self.isOk;
}

export function Ok<T>(value: NonNullable<T>): Ok<T> {
	const ok: Ok<T> = Object.freeze({ isOk: true, value });

	ok.toString = () => `Ok(${ok.value})`;

	return ok;
}

export function Err<E>(value: NonNullable<E>): Err<E> {
	const err: Err<E> = Object.freeze({ isOk: false, value });

	err.toString = () => `Error(${JSON.stringify(err.value as E, null, 2)})`;

	return err;
}
