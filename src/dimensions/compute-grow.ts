import { getPaddingByAxis } from '../padding.ts'
import { isFit, isGrow } from '../sizing.ts'
import type { Axis, WIPNode } from '../types.ts'
import { clampSide, isAlongAxis, mapAxisToDimension } from '../utils.ts'

const growCrossAxis = (node: WIPNode, axis: Axis): number => {
	if (!node.parent || !node.parent.computed[axis]) {
		return 0
	}
	const dimension = mapAxisToDimension(axis)
	return node.parent.dimensions[dimension] - getPaddingByAxis(node.parent, axis)
}

const growChildrenCrossAxis = (node: WIPNode, axis: Axis): WIPNode => {
	const dimension = mapAxisToDimension(axis)

	node.children.forEach((child) => {
		if (!isGrow(child, axis)) {
			return
		}
		const side = growCrossAxis(child, axis)
		child.dimensions[dimension] = clampSide(side, child, axis)
		child.computed[axis] = true
	})

	return node
}

const growChildrenAlongAxis = (node: WIPNode, axis: Axis): WIPNode => {
	const dimension = mapAxisToDimension(axis)

	let totalGrow = 0
	let takenDimension = 0

	const growingChildren = node.children.filter((child) => {
		if(child.computed[dimension]) {
			takenDimension += child.dimensions[dimension]
			return false
		}
		if (!isGrow(child, axis)) {
			throw new Error(`Not growing items must be computed at this point: ${child.id}`)
		}
		totalGrow += child.sizing[axis].value || 1
		return true
	})

	if (growingChildren.length === 0) {
		return node
	}

	const padding = getPaddingByAxis(node, axis)

	const totalDimension = node.computed[dimension] - padding - node.gap * (node.children.length - 1)
	let availableDimension = totalDimension - takenDimension
	let takenClampedDimension = 0

	growingChildren.forEach((child) => {
		if (!child.sizing[axis].min && !child.sizing[axis].max) {
			return
		}

		let side = 0
		const growValue = child.sizing[axis].value || 1

		side = (growValue / totalGrow) * availableDimension

		child.dimensions[dimension] = clampSide(side, child, axis)
		takenClampedDimension += child.dimensions[dimension]
		child.computed[axis] = true
	})

	availableDimension -= takenClampedDimension

	growingChildren.forEach((child) => {
		if (child.computed[axis]) {
			return
		}

		let side = 0

		const growValue = child.sizing[axis].value || 1

		side = (growValue / totalGrow) * availableDimension

		child.dimensions[dimension] = clampSide(side, child, axis)
	})

	return node
}

export const computeGrowDimension = (node: WIPNode, axis: Axis): WIPNode => {
	if (node.parent === null) {
		node.children.forEach((child) => computeGrowDimension(child, axis))
		return node
	}

	if (isFit(node.parent, axis) && isGrow(node, axis)) {
		throw new Error('Nodes cannot grow inside fit-containers')
	}

	if (!isAlongAxis(node, axis)) {
		growChildrenCrossAxis(node, axis)
	} else {
		growChildrenAlongAxis(node, axis)
	}

	node.children.forEach((child) => computeGrowDimension(child, axis))

	return node
}

export const computeGrowHeights = (node: WIPNode): WIPNode => {
	return computeGrowDimension(node, 'y')
}

export const computeGrowWidths = (node: WIPNode): WIPNode => {
	return computeGrowDimension(node, 'x')
}
