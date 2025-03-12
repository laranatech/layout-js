import type {
	WIPNode,
	Axis,
} from './types'
import { isAlongAxis, mapAxisToDimension, sumChildrenDimensions } from './utils'

const computeInitialOffset = (node: WIPNode, axis: Axis, total: number): number => {
	const dimension = mapAxisToDimension(axis)
	const alignment = node.alignment[axis]

	const side = node.dimensions[dimension]
	const totalGap = (node.children.length - 1) * node.gap

	const padding = axis === 'x' ? node.padding.left : node.padding.top

	if (alignment === 'CENTER') {
		return side - ((total / 2) + totalGap)
	}

	if (alignment === 'END') {
		return side - (total + totalGap)
	}

	return padding
}

const computeGap = (node: WIPNode, axis: Axis, total: number): number => {
	if (node.alignment[axis] !== 'STRETCH') {
		return node.gap
	}

	const dimension = mapAxisToDimension(axis)
	const siblingsLength = node.children.length

	const gap = node.dimensions[dimension] - (total + node.gap * (siblingsLength - 1))

	return gap > node.gap ? gap : node.gap
}

const computeChildrenPositons = (node: WIPNode): WIPNode => {
	const totalDimensions = sumChildrenDimensions(node.children)

	const gap = {
		x: computeGap(node, 'x', totalDimensions.width),
		y: computeGap(node, 'y', totalDimensions.height),
	}

	const offset = {
		x: computeInitialOffset(node, 'x', totalDimensions.width),
		y: computeInitialOffset(node, 'y', totalDimensions.height),
	}

	const isAlongX = isAlongAxis(node, 'x')

	const computePosition = (node: WIPNode, axis: Axis, currOffset: number): WIPNode => {
		const dimension = mapAxisToDimension(axis)

		const parentPositon = node.parent ? node.parent.position.absolute[axis] : 0

		node.position.relative[axis] = currOffset
		node.position.absolute[axis] = currOffset + parentPositon

		if (isAlongAxis(node.parent!, axis)) {
			offset[axis] += node.dimensions[dimension] + gap[axis]
		}

		return node
	}

	node.children.forEach((child) => {
		computePosition(child, 'x', isAlongX ? offset.x : 0)
		computePosition(child, 'y', isAlongX ? 0 : offset.y)
	})

	return node
}

export const computePositions = (node: WIPNode): WIPNode => {
	computeChildrenPositons(node)

	node.children.forEach(computePositions)

	return node
}
