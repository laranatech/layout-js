import type {
	Dimensions,
	WIPNode,
} from '../types.ts'
import { fix } from '../sizing.ts'

import { computeFitHeights, computeFitWidths } from './compute-fit.ts'
import { computeFixHeights, computeFixWidths } from './compute-fix.ts'
import { computeGrowHeights, computeGrowWidths } from './compute-grow.ts'

/**
 *
 * @param node
 * @param resolution
 * @returns
 */
const fixRootNodeDimensions = (root: WIPNode, resolution: Dimensions): WIPNode => {
	// Root node always has fixed dimenstions that matches resolution
	root.dimensions = { ...resolution }
	root.sizing = { x: fix(resolution.width), y: fix(resolution.height) }
	root.computed = { x: true, y: true }
	return root
}

export const computeDimensions = (root: WIPNode, resolution: Dimensions): WIPNode => {
	const node = fixRootNodeDimensions(root, resolution)

	computeFixWidths(node)
	computeFitWidths(node)
	computeGrowWidths(node)
	// computeText(node)
	computeFixHeights(node)
	computeFitHeights(node)
	computeGrowHeights(node)

	return node
}


