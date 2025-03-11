import type { Axis, Dimension, WIPNode } from './types.ts'

export const clamp = (number: number, min: number, max: number): number => {
	return Math.max(min, Math.min(number, max))
}

export const clampSide = (side: number, node: WIPNode, axis: Axis): number => {
	return clamp(side, node.sizing[axis].min || 0, node.sizing[axis].max || side)
}

export const hasOpenedChildren = (node: WIPNode): boolean => {
	return node.children.some((child) => !child.computed.x || !child.computed.y)
}

export const mapAxisToDimension = (axis: Axis): Dimension => {
	const dimension = {
		'x': 'width' as Dimension,
		'y': 'height' as Dimension,
	}[axis]

	if (!dimension) {
		throw new Error(`Invalid axis: ${axis}`)
	}

	return dimension
}

export const mapDimensionToAxis = (dimension: Dimension): Axis => {
	const axis = {
		'width': 'x' as Axis,
		'height': 'y' as Axis,
	}[dimension]

	if (!axis) {
		throw new Error(`Invalid dimension: ${dimension}`)
	}

	return axis
}

export const isAlongAxis = (node: WIPNode, axis: Axis): boolean => {
	return axis === 'x' && node.direction === 'ROW' || axis === 'y' && node.direction === 'COLUMN'
}
