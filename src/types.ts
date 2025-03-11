import type { Padding } from './padding'

export type Axis = 'x' | 'y'

export type Dimension = 'width' | 'height'

export type Dimensions = {
	width: number
	height: number
}

export type Position = {
	x: number
	y: number
}

export type Alignment = 'START' | 'CENTER' | 'END' | 'STRETCH'

export type Direction = 'ROW' | 'COLUMN'

export type TextOverflow = 'WRAP' | 'ELLIPSIS' | 'HIDDEN'

export type SizingType = 'FIT' | 'GROW' | 'FIX'

export type SizingOption = {
	type: SizingType,
	value?: number
	min?: number
	max?: number
}

export type InputSizingOption = SizingOption | number

export type Sizing = {
	x: SizingOption
	y: SizingOption
}

export type InputNode = {
	id: string
	width?: InputSizingOption
	height?: InputSizingOption
	children: InputNode[]
	parent: InputNode | null
	padding?: Padding
	verticalAlign?: Alignment
	horizontalAlign?: Alignment
	gap?: number
	text?: string
	textOverflow?: TextOverflow
	direction?: Direction
}

export type Input = {
	root: InputNode
	resolution: Dimensions
}

export type OutputNode = {
	id: string
	x: number
	y: number
	width: number
	height: number
	children: OutputNode[]
	parent: OutputNode | null
}

export type FlatNode = {
	id: string
	x: number
	y: number
	width: number
	height: number
}

export type Output = {
	root: OutputNode
	resolution: Dimensions
}

export type WIPNode = {
	id: string
	children: WIPNode[]
	parent: WIPNode | null
	sizing: Sizing
	padding: Padding
	gap: number
	text: string
	textOverflow: TextOverflow
	direction: Direction
	alignment: {
		x: Alignment
		y: Alignment
	}
	position: {
		absolute: Position
		relative: Position
	}
	dimensions: Dimensions
	computed: {
		x: boolean
		y: boolean
	}
	offset: {
		x: number
		y: number
	}
}
