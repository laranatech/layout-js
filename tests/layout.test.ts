import { test, expect } from 'vitest'
import { layout } from '../src/layout.ts'
import { FIT, FIX, GROW } from '../src/sizing.ts'
import { Input, Output } from '../src/types.ts'

test('Empty grow root', () => {
	const input: Input = {
		root: {
			id: 'test-root',
			sizing: {
				x: GROW(),
				y: GROW(),
			},
			children: [],
			parent: null,
		},
		resolution: { width: 640, height: 480 },
	}

	const expectedResult: Output = {
		root: {
			id: 'test-root',
			position: {
				absolute: {
					x: 0,
					y: 0,
				},
				relative: {
					x: 0,
					y: 0,
				},
			},
			dimmensions: {
				width: 640,
				height: 480,
			},
			children: [],
			parent: null
		},
		resolution: { width: 640, height: 480 },
	}

	expect(layout(input)).toMatchObject(expectedResult)
})

test('Empty fix root', () => {
	const input: Input = {
		root: {
			id: 'test-root',
			sizing: {
				x: FIX({ value: 640 }),
				y: FIX({ value: 480 }),
			},
			children: [],
			parent: null,
		},
		resolution: { width: 640, height: 480 },
	}

	const expectedResult: Output = {
		root: {
			id: 'test-root',
			position: {
				absolute: {
					x: 0,
					y: 0,
				},
				relative: {
					x: 0,
					y: 0,
				},
			},
			dimmensions: {
				width: 640,
				height: 480,
			},
			children: [],
			parent: null
		},
		resolution: { width: 640, height: 480 },
	}

	expect(layout(input)).toMatchObject(expectedResult)
})

test('Empty fit root', () => {
	const input: Input = {
		root: {
			id: 'test-root',
			sizing: {
				x: FIT(),
				y: FIX(),
			},
			children: [],
			parent: null,
		},
		resolution: { width: 640, height: 480 },
	}

	const expectedResult: Output = {
		root: {
			id: 'test-root',
			position: {
				absolute: {
					x: 0,
					y: 0,
				},
				relative: {
					x: 0,
					y: 0,
				},
			},
			dimmensions: {
				width: 0,
				height: 0,
			},
			children: [],
			parent: null
		},
		resolution: { width: 640, height: 480 },
	}

	expect(layout(input)).toMatchObject(expectedResult)
})
