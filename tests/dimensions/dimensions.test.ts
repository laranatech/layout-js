import { test, expect, describe } from 'vitest'
import { layout } from '../../src/layout'
import { fit, fix, grow } from '../../src/sizing'
import { Input, InputNode, Output, OutputNode } from '../../src/types'
import { padding } from '../../src/padding'

describe('Empty root', () => {
	test('grow', () => {
		const input: Input = {
			root: {
				id: 'test-root',
				children: [],
				parent: null,
				direction: 'COLUMN',
			},
			resolution: { width: 640, height: 480 },
		}
	
		const expectedResult: Output = {
			root: {
				id: 'test-root',
				x: 0,
				y: 0,
				width: 640,
				height: 480,
				children: [],
				parent: null
			},
			resolution: { width: 640, height: 480 },
		}
	
		expect(layout(input)).toMatchObject(expectedResult)
	})

	test('fix', () => {
		const input: Input = {
			root: {
				id: 'test-root',
				children: [],
				parent: null,
				direction: 'COLUMN',
			},
			resolution: { width: 640, height: 480 },
		}
	
		const expectedResult: Output = {
			root: {
				id: 'test-root',
				x: 0,
				y: 0,
				width: 640,
				height: 480,
				children: [],
				parent: null
			},
			resolution: { width: 640, height: 480 },
		}
	
		// expect(layout(input)).toMatchObject(expectedResult)
	})
})

// test('Empty fit root', () => {
// 	const input: Input = {
// 		root: {
// 			id: 'test-root',
// 			children: [],
// 			parent: null,
// 		},
// 		resolution: { width: 640, height: 480 },
// 	}

// 	const expectedResult: Output = {
// 		root: {
// 			id: 'test-root',
// 			position: {
// 				x: 0,
// 				y: 0,
// 			},
// 			Dimensions: {
// 				width: 0,
// 				height: 0,
// 			},
// 			children: [],
// 			parent: null
// 		},
// 		resolution: { width: 640, height: 480 },
// 	}

// 	expect(layout(input)).toMatchObject(expectedResult)
// })

// test('Fit root with 2 grow children', () => {
// 	const root: InputNode = {
// 		id: 'test-root',
// 		children: [],
// 		parent: null,
// 		gap: 8,
// 		padding: padding(16),
// 	}

// 	const child = (n: number) => {
// 		return {
// 			id: `test-child-${n}`,
// 			sizing: {
// 				x: grow(),
// 				y: fix({ value: 100 }),
// 			},
// 			parent: root,
// 			children: [],
// 		}
// 	}

// 	root.children = [
// 		child(1),
// 		child(2),
// 	]

// 	const input: Input = {
// 		root,
// 		resolution: { width: 640, height: 480 },
// 	}

// 	const expectedRoot: OutputNode = {
// 		id: 'test-root',
// 		position: {
// 			x: 0,
// 			y: 0,
// 		},
// 		Dimensions: {
// 			width: 640,
// 			height: 132,
// 		},
// 		children: [],
// 		parent: null,
// 	}

// 	const expectedChild = (n: number, x: number, y: number) => {
// 		return {
// 			id: `test-child-${n}`,
// 			position:  { x, y },
// 			Dimensions: { width: 300, height: 100 },
// 			children: [],
// 			parent: expectedRoot,
// 		}
// 	}

// 	expectedRoot.children = [
// 		expectedChild(1, 16, 16),
// 		expectedChild(2, 324, 16),
// 	]

// 	const expectedResult: Output = {
// 		root: expectedRoot,
// 		resolution: { width: 640, height: 480 },
// 	}

// 	expect(layout(input)).toMatchObject(expectedResult)
// })
