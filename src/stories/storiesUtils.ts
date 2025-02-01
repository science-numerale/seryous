import { defineMeta } from "@storybook/addon-svelte-csf"

type Params = typeof defineMeta extends (arg: infer A, ...args: any[]) => any ? A : never;

export const defaultStoryParams: Params = {
	tags: ["autodocs"],
}
