import { test, expect, describe } from 'vitest'
import { fit, fix, grow } from '../src/sizing'
import { SizingOption } from '../src/types'

describe('sizing definition', () => {
	describe('fix()', () => {
		const fixObject: SizingOption = { type: 'FIX' }
	
		describe('number', () => {
			test('positive', () => {
				expect(fix(0)).toMatchObject({ ...fixObject, value: 0 })
				expect(fix(123)).toMatchObject({ ...fixObject, value: 123 })
				expect(fix(999)).toMatchObject({ ...fixObject, value: 999 })
			})
		
			test('negative number throws', () => {
				expect(() => fix(-1)).toThrow()
				expect(() => fix(-123)).toThrow()
				expect(() => fix(-999)).toThrow()
			})
		})
	})

	describe('fit()', () => {
		const fitObject: SizingOption = { type: 'FIT' }

		test('value throws', () => {
			expect(() => fit(1)).toThrow()
			expect(() => fit({ value: 123 })).toThrow()
		})

		test('max', () => {
			expect(fit({ max: 100 })).toMatchObject({ ...fitObject, max: 100 })
		})

		test('min', () => {
			expect(fit({ min: 100 })).toMatchObject({ ...fitObject, min: 100 })
		})
	})

	describe('grow()', () => {
		const growObject: SizingOption = { type: 'GROW' }

		test('min', () => {
			expect(grow({ min: 1 })).toMatchObject({ ...growObject, min: 1 })
		})
		test('max', () => {
			expect(grow({ max: 1 })).toMatchObject({ ...growObject, max: 1 })
		})
		test('value', () => {
			expect(grow({ value: 1 })).toMatchObject({ ...growObject, value: 1 })
			expect(grow(2)).toMatchObject({ ...growObject, value: 2 })
			expect(grow()).toMatchObject({ ...growObject, value: 1 })
		})
	})
})
