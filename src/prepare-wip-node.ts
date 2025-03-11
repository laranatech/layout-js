import { padding } from './padding.ts'
import { parseSizing } from './parse-sizing.ts'
import { fit } from './sizing.ts'
import type { InputNode, WIPNode } from './types.ts'

export const prepareWIPNode = (inputRoot: InputNode, parent: WIPNode | null): WIPNode => {
	const node: WIPNode = {
		...inputRoot,
		children: [],
		padding: inputRoot.padding || padding(0),
		gap: inputRoot.gap || 0,
		direction: inputRoot.direction || 'ROW',
		text: inputRoot.text || '',
		parent,
		textOverflow: inputRoot.textOverflow || 'WRAP',
		alignment: {
			x: inputRoot.verticalAlign || 'START',
			y: inputRoot.horizontalAlign || 'START',
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
