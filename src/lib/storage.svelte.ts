let _storage: Record<string, any> = $state(JSON.parse(localStorage.getItem("seryous") || JSON.stringify({})))

$effect.root(() => {
	$effect(() => {
		_storage
		localStorage.setItem("seryous", JSON.stringify(_storage))
	})
})

export type ToolStorage = Record<string, any>
export { _storage }

//export default function getEntry<T>(key: string, def: T) {
//	let stated = $state(storage[key] || def)
//
//	$effect.root(() => {
//		$effect(() => {
//			storage[key] = stated
//		})
//	})
//
//	return stated
//}
