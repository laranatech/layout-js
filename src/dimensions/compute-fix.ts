import { isFix } from '../sizing'
import type { Axis, WIPNode } from '../types'
import { mapAxisToDimension } from '../utils'

export const computeFixDimension = (node: WIPNode, axis: Axis): WIPNode => {
	const dimension = mapAxisToDimension(axis)
	if (!node.computed[axis] && isFix(node, axis)) {
		node.dimensions[dimension] = node.sizing[axis].value || 0
		node.computed[axis] = true
	}

	node.children.forEach((child) => computeFixDimension(child, axis))

	return node
}

export const computeFixWidths = (node: WIPNode): WIPNode => {
	return computeFixDimension(node, 'x')
}

export const computeFixHeights = (node: WIPNode): WIPNode => {
	return computeFixDimension(node, 'y')
}
