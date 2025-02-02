//export type MergeCommon<T, U> = {
//	[K in (keyof T & keyof U)]: T[K] | U[K]
//} // Merge two dict keeping only the common part

export type MergeCommon<T, U> = {
  [K in keyof T & keyof U as T[K] extends U[K] ? (U[K] extends T[K] ? K : never) : never]: T[K]
};
