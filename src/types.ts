export type Dimmensions = {
	width: number
	height: number
}

export type Position = {
	x: number
	y: number
}

export type SizingOption = {
	type: 'FIT' | 'GROW' | 'FIX',
	value?: number
	min?: number
	max?: number
}

export type Padding = {
	left?: number
	right?: number
	top?: number
	bottom?: number
	vertical?: number
	horizontal?: number
} | number

export type VerticalAlign = 'TOP' | 'MIDDLE' | 'BOTTOM' | 'BETWEEN'

export type HorizontalAlign = 'LEFT' | 'CENTER' | 'RIGHT' | 'BETWEEN'

export type Sizing = {
	x: SizingOption
	y: SizingOption
}

export type InputSizing = {
	x?: SizingOption
	y?: SizingOption
}

export type Direction = 'ROW' | 'COLUMN'

export type InputNode = {
	id: string
	sizing?: InputSizing
	children: InputNode[]
	parent: InputNode | null
	padding?: Padding
	verticalAlign?: VerticalAlign
	horizontalAlign?: HorizontalAlign
	gap?: number
	text?: string
	direction?: Direction
}

export type Input = {
	root: InputNode
	resolution: Dimmensions
}

export type OutputNode = {
	id: string
	position: {
		absolute: Position
		relative: Position
	}
	dimmensions: Dimmensions
	children: OutputNode[]
	parent: OutputNode | null
}

export type Output = {
	root: OutputNode
	resolution: Dimmensions
}
