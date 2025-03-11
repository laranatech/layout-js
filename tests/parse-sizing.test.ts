import { test, expect, describe } from 'vitest'
import { parseSizing } from '../src/parse-sizing'

describe('parse sizing > number', () => {
	describe('number', () => {
		describe('positive', () => {
			[0, 8, 16, 999].forEach((value) => {
				test(`${value}`, () => {
					expect(parseSizing(value)).toMatchObject({ type: 'FIX', value })
				})
			})
		})
		test('negative number throws', () => {
			expect(() => parseSizing(-8)).toThrow()
		})
		test('NaN throws', () => {
			// @ts-ignore
			expect(() => parseSizing(null)).toThrow()
			// @ts-ignore
			expect(() => parseSizing(undefined)).toThrow()
			// @ts-ignore
			expect(() => parseSizing('100')).toThrow()
			expect(() => parseSizing(Infinity)).toThrow()
		})
	})

	describe('ojbect', () => {
		test('invalid type throws', () => {
			// @ts-ignore
			expect(() => parseSizing({ type: 'fluid' })).toThrow()
		})
	})
})
