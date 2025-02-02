export function rndId() {
	let id = Math.random().toString()
	return (v: string) => v + id
}
