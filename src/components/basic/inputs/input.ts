import type { FormEventHandler } from "svelte/elements"

export interface InputProps<Val> {
	value?: Val,
	disabled?: boolean,
	//onInput: FormEventHandler<any>
}
