import { getPaddingByAxis } from '../padding.ts'
import { isFit, isGrow } from '../sizing.ts'
import type { Axis, WIPNode } from '../types.ts'
import {
	clampSide,
	isAlongAxis,
	mapAxisToDimension,
	maxChidrenDimmension,
	sumChildrenDimension,
} from '../utils.ts'

export const hasNoGrowChildren = (children: WIPNode[], axis: Axis) => {
	if (children.some((child) => isGrow(child, axis))) {
		throw new Error('Nodes cannot grow inside fit-containers')
	}
}

export const computeFitDimension = (node: WIPNode, axis: Axis): WIPNode => {
	const dimension = mapAxisToDimension(axis)

	if (node.computed[axis] || !isFit(node, axis)) {
		node.children.map((child) => computeFitDimension(child, axis))
		return node
	}

	hasNoGrowChildren(node.children, axis)

	const padding = getPaddingByAxis(node, axis)

	if (node.children.length === 0) {
		node.dimensions[dimension] = padding
		node.computed[axis] = true
		return node
	}

	node.children.map((child) => computeFitDimension(child, axis))

	let side = padding

	if (isAlongAxis(node, axis)) {
		side += (node.children.length - 1) * node.gap + sumChildrenDimension(node.children, dimension)
	} else {
		side += maxChidrenDimmension(node.children, dimension)
	}

	node.dimensions[dimension] = clampSide(side, node, axis)
	node.computed[axis] = true

	return node
}

export const computeFitWidths = (node: WIPNode): WIPNode => {
	return computeFitDimension(node, 'x')
}

export const computeFitHeights = (node: WIPNode): WIPNode => {
	return computeFitDimension(node, 'y')
}
