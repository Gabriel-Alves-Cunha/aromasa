// Awesome utility type from ts-toolbelt that makes type hints more readable :)
export type Compute<A extends any> = A extends Function
	? A
	: { [K in keyof A]: A[K] } & {};
