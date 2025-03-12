import { padding } from './padding'
import { parseSizing } from './parse-sizing'
import { fit } from './sizing'
import type { Alignment, InputNode, WIPNode } from './types'

const parseAlignment = (value: Alignment | undefined) => {
	return value || 'START'
}

export const prepareWIPNode = (inputRoot: InputNode, parent: WIPNode | null): WIPNode => {
	const gap = inputRoot.gap || 0

	if (gap < 0) {
		throw new Error(`Gap cannot be negative: ${gap}`)
	}

	const node: WIPNode = {
		...inputRoot,
		children: [],
		padding: padding(inputRoot.padding),
		gap,
		direction: inputRoot.direction || 'ROW',
		text: inputRoot.text || '',
		fontSize: inputRoot.fontSize || 0,
		parent,
		textOverflow: inputRoot.textOverflow || 'WRAP',
		alignment: {
			x: parseAlignment(inputRoot.verticalAlign),
			y: parseAlignment(inputRoot.horizontalAlign),
		},
		sizing: {
			x: inputRoot.width ? parseSizing(inputRoot.width) : fit(),
			y: inputRoot.height ? parseSizing(inputRoot.height) : fit(),
		},
		dimensions: {
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

	node.children = inputRoot.children.map((child) => prepareWIPNode(child, node))

	return node
}
