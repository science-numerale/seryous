export function keys<T extends Record<string, any>>(
	obj: T,
): (T extends T ? keyof T : never)[] {
	return Object.keys(obj) as (T extends T ? keyof T : never)[];
}

type RecursiveOptional<T> = {
	[P in keyof T]?: T[P] extends object ? RecursiveOptional<T[P]> : T[P];
};

export function assignDefault<T>(target: T, ...sources: RecursiveOptional<T>[]): T {
	for (let source of sources) {
		for (let key in source) {
			if (source.hasOwnProperty(key)) {
				if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
					if (typeof target[key] !== 'object' || target[key] === null || Array.isArray(target[key])) {
						target[key] = {} as typeof target[typeof key];
					}
					assignDefault(target[key], source[key]);
				} else {
					target[key] = source[key] as typeof target[typeof key];
				}
			}
		}
	}
	return target;
}
