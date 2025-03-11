import type {
	Dimensions,
	WIPNode,
} from '../types'
import { fix } from '../sizing'

import { computeFitHeights, computeFitWidths } from './compute-fit'
import { computeFixHeights, computeFixWidths } from './compute-fix'
import { computeGrowHeights, computeGrowWidths } from './compute-grow'

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


