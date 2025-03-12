import type { Axis, Dimension, Dimensions, WIPNode } from './types'

export const clamp = (number: number, min: number, max: number): number => {
	return Math.max(min, Math.min(number, max))
}

export const clampSide = (side: number, node: WIPNode, axis: Axis): number => {
	return clamp(side, node.sizing[axis].min || 0, node.sizing[axis].max || side)
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

export const sumChildrenDimension = (nodes: WIPNode[], dimension: Dimension): number => {
	return nodes.reduce(
		(acc: number, node: WIPNode) => acc + node.dimensions[dimension],
		0
	)
}

export const sumChildrenDimensions = (nodes: WIPNode[]): Dimensions => {
	return nodes.reduce((acc: Dimensions, node: WIPNode) => {
		return {
			width: acc.width + node.dimensions.width,
			height: acc.height + node.dimensions.height,
		}
	}, { width: 0, height: 0 } as Dimensions)
}

export const maxChidrenDimmension = (nodes: WIPNode[], dimension: Dimension) => {
	return nodes.reduce(
		(acc: number, node: WIPNode) => acc < node.dimensions[dimension] ? node.dimensions[dimension] : acc,
		0
	)
}
