export function keys<T extends object>(
  obj: T,
): (T extends T ? keyof T : never)[] {
  return Object.keys(obj) as (T extends T ? keyof T : never)[];
}

type DeeplyOptional<T> = {
  [P in keyof T]?: T[P] extends object ? DeeplyOptional<T[P]> : T[P];
};

export function deepMerge<T extends object>(
  target: T,
  source: DeeplyOptional<T>,
) {
  for (const key in source) {
    if (typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (target[key] === undefined) {
        (target as Record<string, object>)[key] = {};
      }
      deepMerge(target[key] as object, source[key] as object);
    } else {
      (target as Record<string, string>)[key] = source[key] as string;
    }
  }
  return target;
}
