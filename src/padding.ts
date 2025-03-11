import { Axis, WIPNode } from "./types";

export type Padding = {
	top: number
	bottom: number
	left: number
	right: number
};

type PaddingOptsObject = {
	top?: number
	bottom?: number
	left?: number
	right?: number
	vertical?: number
	horizontal?: number
}

export type PaddingOpts = PaddingOptsObject | number | number[]

const parsePaddingNumber = (value: number): Padding => {
	if (value < 0) {
		throw new Error(`Padding can't be negative: ${value}`)
	}
	return {
		top: value,
		bottom: value,
		left: value,
		right: value,
	}
}

const parsePaddingArray = (value: number[]): Padding => {
	if (value.some((item) => item < 0)) {
		throw new Error(`Padding can't be negative: [${value.join(',')}]`)
	}
	if (value.length === 2) {
		return {
			top: value[0],
			bottom: value[0],
			left: value[1],
			right: value[1],
		}
	}

	if (value.length === 4) {
		return {
			top: value[0],
			left: value[1],
			bottom: value[2],
			right: value[3],
		}
	}
	throw new Error(`Invalid padding opts length: ${value.length}`)
}

const validatePaddingObject = (value: PaddingOptsObject) => {
	if (Object.values(value).some((item) => item < 0)) {
		throw new Error(`Padding can't be negative`)
	}
	if (value.vertical && (value.top || value.bottom)) {
		throw new Error('Padding cannot have both vertical and top|bottom fields')
	}
	if (value.horizontal && (value.left || value.right)) {
		throw new Error('Padding cannot have both horizontal and left|right fields')
	}
}

const parsePaddingObject = (value: PaddingOptsObject): Padding => {
	validatePaddingObject(value)

	return {
		top: value.vertical || value.top || 0,
		bottom: value.vertical || value.bottom || 0,
		left: value.horizontal || value.left || 0,
		right: value.horizontal || value.right || 0,
	}
}

export const padding = (value: PaddingOpts): Padding => {
	if (typeof value === 'number') {
		return parsePaddingNumber(value)
	}

	if (Array.isArray(value)) {
		return parsePaddingArray(value)
	}

	if (typeof value === 'object') {
		return parsePaddingObject(value)
	}

	return {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	}
}

export const getPaddingByAxis = (node: WIPNode, axis: Axis) => {
	if (axis === 'x') {
		return node.padding.left + node.padding.right
	}
	if (axis === 'y') {
		return node.padding.top + node.padding.bottom
	}

	throw new Error(`Invalid padding axis: ${axis}`)
}
