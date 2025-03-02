import type { SizingOption } from './types.ts'

export type SizingOptions = {
	value?: number,
	min?: number,
	max?: number,
}

export const GROW = (options?: SizingOptions): SizingOption => {
	return {
		...options,
		type: 'GROW',
	}
}

export const FIT = (options?: SizingOptions): SizingOption => {
	const result: SizingOption = {
		...options,
		type: 'FIT',
	}

	delete result.value

	return result
}

export const FIX = (options?: SizingOptions): SizingOption => {
	return {
		...options,
		type: 'FIX',
	}
}
