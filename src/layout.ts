import type {
	Dimensions,
	Input,
	Output,
	OutputNode,
	WIPNode,
} from './types.ts'
import { prepareWIPNode } from './prepare-wip-node.ts'
import { computeDimensions } from './dimensions/index.ts'
import { computePositions } from './positions.ts'

export const prepareOutputNode = (node: WIPNode, parent: OutputNode | null): OutputNode => {
	const outputNode: OutputNode = {
		id: node.id,
		x: node.position.absolute.x,
		y: node.position.absolute.x,
		width: node.dimensions.width,
		height: node.dimensions.height,
		parent,
		children: [],
	}

	outputNode.children = node.children.map((child) => prepareOutputNode(child, outputNode))

	return outputNode
}

const computeLayout = (root: WIPNode, resolution: Dimensions): WIPNode => {
	let node = computeDimensions(root, resolution)
	node = computePositions(node)
	return node
}

export const layout = (input: Input): Output => {
	let root = prepareWIPNode(input.root, null)
	root = computeLayout(root, input.resolution)
	root = computePositions(root)

	const result: Output = {
		root: prepareOutputNode(root, null),
		resolution: input.resolution,
	}

	return result
}
