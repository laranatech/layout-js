import { fit, fix, grow } from './sizing.ts'
import type { InputSizingOption, SizingOption } from './types.ts'

const validateSizingType = (value: InputSizingOption) => {
	if (value === null || value === undefined || typeof value === 'string' || Array.isArray(value)) {
		throw new Error(`Sizing value must be valid positive number: ${value}`)
	}
}

export const parseSizing = (value: InputSizingOption): SizingOption => {
	validateSizingType(value)
	if (typeof value === 'number') {
		if (Number.isNaN(value) || value < 0 || value === Infinity) {
			throw new Error(`Sizing value must be valid positive number: ${value}`)
		}

		return { type: 'FIX', value }
	}

	if (typeof value !== 'object') {
		throw new Error('Invalid value')
	}

	if (!['FIT', 'FIX', 'GROW'].includes(value.type)) {
		throw new Error(`Invalid sizing type: ${value.type}`)
	}

	return {
		'FIT': fit,
		'FIX': fix,
		'GROW': grow,
	}[value.type](value)
}
