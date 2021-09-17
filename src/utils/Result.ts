export type Ok<T> = {
	readonly tag: "Ok";
	readonly value: T;
};

export type Err<E> = {
	readonly tag: "Error";
	readonly error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export function unwrap<T, E>(self: Result<T, E>): T {
	if (self.tag === "Error")
		throw new Error(JSON.stringify(self.error, null, 3));

	return self.value;
}

export function unwrapOr<T, E>(self: Result<T, E>, default_: T): T {
	if (self.tag === "Ok") return self.value;
	return default_;
}

export function isErr<T, E>(self: Result<T, E>): boolean {
	return self.tag === "Error";
}

export function isOk<T, E>(self: Result<T, E>): boolean {
	return self.tag === "Ok";
}

export function Ok<T>(val: T): Ok<T> {
	const ok: Ok<T> = Object.freeze({ tag: "Ok", value: val });

	ok.toString = function () {
		return `Ok(${this.value})`;
	};

	return ok;
}

export function Err<E>(val: E): Err<E> {
	const err: Err<E> = Object.freeze({ tag: "Error", error: val });

	err.toString = function () {
		return `Error(${JSON.stringify(this.error, null, 3)})`;
	};

	return err;
}
