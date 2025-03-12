import { test, expect, describe } from 'vitest'
import { padding } from '../src/padding'

describe('padding > number', () => {
	const cases = [0, 4, 8, 9]

	cases.forEach((value) => {
		test(`${value}`, () => {
			expect(padding(value)).toMatchObject({
				top: value,
				bottom: value,
				left: value,
				right: value,
			})
		})
	})

	test(`negative number throws`, () => {
		expect(() => padding(-1)).toThrow()
	})
})

describe('padding > array', () => {
	test('3 items error', () => {
		expect(() => padding([0, 2, 3])).toThrow()
	})
	test('1 item error', () => {
		expect(() => padding([0])).toThrow()
	})

	test('negative number throws', () => {
		expect(() => padding([0, -1])).toThrow()
	})

	test('2 items', () => {
		expect(padding([8, 16])).toMatchObject({
			top: 8,
			bottom: 8,
			left: 16,
			right: 16,
		})
	})
	test('4 items', () => {
		expect(padding([8, 16, 24, 32])).toMatchObject({
			top: 8,
			bottom: 24,
			left: 16,
			right: 32,
		})
	})
})

describe('padding > object', () => {
	const zeroPadding = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	}
	test('only left', () => {
		expect(padding({ left: 8 })).toMatchObject({ ...zeroPadding, left: 8 })
	})
	test('only right', () => {
		expect(padding({ right: 8 })).toMatchObject({ ...zeroPadding, right: 8 })
	})
	test('only top', () => {
		expect(padding({ top: 8 })).toMatchObject({ ...zeroPadding, top: 8 })
	})
	test('only bottom', () => {
		expect(padding({ bottom: 8 })).toMatchObject({ ...zeroPadding, bottom: 8 })
	})
	test('vertical only', () => {
		expect(padding({ vertical: 8 })).toMatchObject({ ...zeroPadding, top: 8, bottom: 8 })
	})
	test('horizontal only', () => {
		expect(padding({ vertical: 8 })).toMatchObject({ ...zeroPadding, top: 8, bottom: 8 })
	})

	test('full', () => {
		const p = { left: 2, right: 4, top: 8, bottom: 16 }
		expect(padding(p)).toMatchObject(p)
	})

	test('vertical + top throws error', () => {
		expect(() => padding({ vertical: 8, top: 16 })).toThrow()
	})
	test('vertical + bottom throws error', () => {
		expect(() => padding({ vertical: 8, bottom: 16 })).toThrow()
	})
	test('horizontal + left throws error', () => {
		expect(() => padding({ horizontal: 8, left: 16 })).toThrow()
	})
	test('horizontal + right throws error', () => {
		expect(() => padding({ horizontal: 8, right: 16 })).toThrow()
	})

	test('negative number throws', () => {
		expect(() => padding({ left: -1 })).toThrow()
		expect(() => padding({ right: -1 })).toThrow()
		expect(() => padding({ top: -1 })).toThrow()
		expect(() => padding({ bottom: -1 })).toThrow()
	})
})
