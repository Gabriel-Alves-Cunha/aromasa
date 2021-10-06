export async function unwrap<T>(asyncFn: () => Promise<T>) {
	try {
		return await asyncFn();
	} catch (error: any) {
		throw new Error(error);
	}
}

export async function unwrapOr<T>(asyncFn: () => Promise<T>, default_: T) {
	try {
		return await asyncFn();
	} catch (error: any) {
		return default_;
	}
}

export async function unwrapOrErr<T>(
	asyncFn: () => Promise<T>,
	errorFn: (e: any) => void
) {
	try {
		return await asyncFn();
	} catch (error: any) {
		errorFn(error);
	}
}
