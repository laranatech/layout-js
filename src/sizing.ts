import type { Axis, SizingOption, SizingType, WIPNode } from './types'

export type SizingOptions = {
	value?: number,
	min?: number,
	max?: number,
} | number

export const validatePositiveSizing = (options?: SizingOptions) => {
	if (options === undefined) {
		return
	}
	if (typeof options === 'number') {
		if (options < 0) {
			throw new Error(`Value must be positive: ${options}`)
		}
	}
	for(const [key, value] of Object.entries(options)) {
		if (key === 'type') {
			continue
		}
		if (value && typeof value ==='number' && value < 0) {
			throw new Error(`${key} must be positive: ${value}`)
		}
	}
}

export const grow = (options?: SizingOptions): SizingOption => {
	validatePositiveSizing(options)
	if (typeof options === 'number') {
		return { type: 'GROW', value: options }
	}
	return {
		...options,
		value: options && options.value ? options.value : 1,
		type: 'GROW',
	}
}

export const fit = (options?: SizingOptions): SizingOption => {
	validatePositiveSizing(options)
	if (typeof options === 'number' || options?.value) {
		throw new Error('fit component cannot have value')
	}

	return { ...options, type: 'FIT' }
}

export const fix = (options: SizingOptions): SizingOption => {
	if (options === undefined || options === null) {
		throw new Error('fix sizing options cannot be undefined')
	}
	validatePositiveSizing(options)
	if (typeof options === 'number') {
		return { type: 'FIX', value: options }
	}
	if (!options.value) {
		throw new Error('fix sizing options value cannot be undefined')
	}
	return { ...options, type: 'FIX' }
}

export const getSizing = (node: WIPNode, axis: Axis): SizingType => {
	return node.sizing[axis].type
}

export const isFix = (node: WIPNode, axis: Axis): boolean => {
	return getSizing(node, axis) === 'FIX'
}

export const isFixX = (node: WIPNode): boolean => {
	return getSizing(node, 'x') === 'FIX'
}

export const isFixY = (node: WIPNode): boolean => {
	return getSizing(node, 'y') === 'FIX'
}

export const isFit = (node: WIPNode, axis: Axis): boolean => {
	return getSizing(node, axis) === 'FIT'
}

export const isFitX = (node: WIPNode): boolean => {
	return getSizing(node, 'x') === 'FIT'
}

export const isFitY = (node: WIPNode): boolean => {
	return getSizing(node, 'y') === 'FIT'
}

export const isGrow = (node: WIPNode, axis: Axis): boolean => {
	return getSizing(node, axis) === 'GROW'
}

export const isGrowX = (node: WIPNode): boolean => {
	return getSizing(node, 'x') === 'GROW'
}

export const isGrowY = (node: WIPNode): boolean => {
	return getSizing(node, 'y') === 'GROW'
}
