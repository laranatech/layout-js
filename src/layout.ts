import { FIT } from './sizing.ts'
import type {
	Dimmensions,
	Direction,
	HorizontalAlign,
	Input,
	InputNode,
	Output,
	OutputNode,
	Padding,
	Position,
	Sizing,
	VerticalAlign,
} from './types.ts'


type Node = {
	id: string
	children: Node[]
	parent: Node | null
	sizing: Sizing
	padding: Padding
	gap: number
	text: string
	direction: Direction
	verticalAlign: VerticalAlign
	horizontalAlign: HorizontalAlign
	position: {
		absolute: Position
		relative: Position
	}
	dimmensions: Dimmensions
	computed: {
		x: boolean
		y: boolean
	}
	offset: {
		x: number
		y: number
	}
}

const prepareNode = (inputRoot: InputNode, parent: Node | null): Node => {
	const node: Node = {
		...inputRoot,
		children: [],
		padding: inputRoot.padding || 0,
		gap: inputRoot.gap || 0,
		direction: inputRoot.direction || 'ROW',
		text: inputRoot.text || '',
		verticalAlign: inputRoot.verticalAlign || 'TOP',
		horizontalAlign: inputRoot.horizontalAlign || 'LEFT',
		parent,
		sizing: {
			x: inputRoot.sizing?.x || FIT(),
			y: inputRoot.sizing?.y || FIT(),
		},
		dimmensions: {
			width: 0,
			height: 0,
		},
		position: {
			absolute: { x: 0, y: 0 },
			relative: { x: 0, y: 0 },
		},
		offset: {
			x: 0,
			y: 0,
		},
		computed: {
			x: false,
			y: false,
		},
	}

	node.children = inputRoot.children.map((child) => prepareNode(child, node))

	return node
}

const prepareOutputNode = (node: Node, parent: OutputNode | null): OutputNode => {
	// if (!node.computed) {
	// 	throw new Error(`Node is not computed: ${node.id}`)
	// }

	const outputNode: OutputNode = {
		id: node.id,
		position: node.position,
		dimmensions: node.dimmensions,
		parent,
		children: [],
	}

	outputNode.children = node.children.map((child) => prepareOutputNode(child, outputNode))

	return outputNode
}

const computeFixHeights = (root: Node, resolution: Dimmensions): Node => {
	if (root.sizing.y.type === 'FIX') {
		root.dimmensions.height = root.sizing.y.value || 0
		root.computed.y = true
		return root
	}
	return root
}

const computeFitWidths = (root: Node, resolution: Dimmensions): Node => {
	return root
}

const computeGrowWidths = (root: Node, resolution: Dimmensions): Node => {
	if (root.parent === null && root.sizing.x.type === 'GROW') {
		root.dimmensions.width = resolution.width
		root.computed.x = true
		return root
	}
	if (root.sizing.x.type !== 'GROW') {
		// root.
		return root
	}
	if (!root.parent) {

	}
	return root
}

const computeText = (root: Node, resolution: Dimmensions): Node => {
	return root
}

const computeFixWidths = (root: Node, resolution: Dimmensions): Node => {
	if (root.sizing.x.type === 'FIX') {
		root.dimmensions.width = root.sizing.x.value || 0
		root.computed.x = true
		return root
	}
	return root
}

const computeFitHeights = (root: Node, resolution: Dimmensions): Node => {
	return root
}

const computeGrowHeights = (root: Node, resolution: Dimmensions): Node => {
	if (root.parent === null && root.sizing.y.type === 'GROW') {
		root.dimmensions.height = resolution.height
		root.computed.y = true
		return root
	}
	return root
}

const positionNodes = (root: Node, resolution: Dimmensions): Node => {
	return root
}

const computeLayout = (root: Node, resolution: Dimmensions): Node => {
	let node = root
	node = computeFixWidths(node, resolution)
	root = computeFitWidths(root, resolution)
	node = computeGrowWidths(node, resolution)
	// root = computeText(root, input.resolution)
	node = computeFixHeights(node, resolution)
	root = computeFitHeights(root, resolution)
	node = computeGrowHeights(node, resolution)
	// root = positionNodes(root, input.resolution)
	return node
}

export const layout = (input: Input): Output => {
	let root = prepareNode(input.root, null)
	root = computeLayout(root, input.resolution)

	const result: Output = {
		root: prepareOutputNode(root, null),
		resolution: input.resolution,
	}

	return result
}
