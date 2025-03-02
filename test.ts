import { GROW, FIT } from './src/sizing.ts'
import { layout } from './src/layout.ts'

layout({
	root: {
		id: '',
		parent: null,
		children: [],
		sizing: {
			x: GROW(),
			y: GROW(),
		},
	},
	resolution: {
		width: 640,
		height: 480,
	},
})
