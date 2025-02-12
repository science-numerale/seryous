let _storage: Record<string, any> = $state(JSON.parse(localStorage.getItem("seryous") || JSON.stringify({})))

$effect.root(() => {
	$effect(() => {
		_storage
		localStorage.setItem("seryous", JSON.stringify(_storage))
	})
})

export type ToolStorage = Record<string, any>
export { _storage }

//export function getStorage<T>(name: string, def: T): T {
//	_storage[name] = Object.assign(
//		{},
//		$state.snapshot(def),
//		$state.snapshot(_storage[name] || {}),
//	);
//
//	return _storage[name]
//}
