import { ComputedRef, Ref } from 'vue'

export interface ISliderInitData {
  firstValue: number,
  secondValue: number,
  oldValue: number | null,
  dragging: boolean,
  sliderSize: number
}

export interface ISliderProps {
  modelValue: number | number[]
  min: number
  max: number
  step: number
  showStops: boolean
  showTooltip: boolean
  formatTooltip: (val: number) => number | string
  disabled: boolean
  range: boolean
  vertical: boolean
  height: string
  label: string
  marks?: Record<number, any>
}

export interface ISliderButton {
  tooltipEl: Ref<HTMLElement | null>,
  showTooltip: Ref<boolean>,
  buttonWrapperStyle: ComputedRef<CSSStyleDeclaration>,
  formattedValue: ComputedRef<number | string>,
  handleMouseEnter: () => void,
  handleMouseLeave: () => void,
  onButtonDown: (event: MouseEvent | TouchEvent) => void,
  onLeftKeyDown: () => void,
  onRightKeyDown: () => void,
  setPosition: (newPosition: number) => void
}

export type ButtonRefs = {
  [s in 'firstButton' | 'secondButton']: Ref<ISliderButton>
}

export interface ISliderButtonProps {
  modelValue: number,
  vertical: boolean
}

export interface ISliderButtonData {
  hovering: boolean
  dragging: boolean
  isClick: boolean
  startX: number
  currentX: number
  startY: number
  currentY: number
  startPosition: number
  newPosition: number
  oldValue: number
}

export type Stops = {
  stops: ComputedRef<number[]>
  getStopStyle: (position: number) => any
}

export type Mark = {
  point: number
  position: number
  mark: {[s: string]: any;}
}
