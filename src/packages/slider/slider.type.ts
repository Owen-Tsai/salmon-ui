import { ComputedRef, Ref } from 'vue'

export interface ISliderProps {
  modelValue: number | number[],
  min: number,
  max: number,
  step: number,
  showStops: boolean,
  showTooltip: boolean,
  formatTooltip: (val: number) => string | number,
  disabled: boolean,
  range: boolean,
  vertical: boolean,
  height: string,
  debounce: number,
  label: string,
  markers?: Record<number, any>,
}

export interface ISliderData {
  firstValue: number,
  secondValue: number,
  oldValue: number | number[],
  sliderSize: number
}

export interface ISliderProvider {
  disabled: ComputedRef<boolean>,
  min: ComputedRef<number>,
  max: ComputedRef<number>,
  step: ComputedRef<number>,
  showTooltip: ComputedRef<boolean>,
  precision: ComputedRef<number>,
  sliderSize: ComputedRef<number>,
  formatTooltip: ComputedRef<(value: number) => string | number> | undefined,
  emitChange: () => void,
  resetSize: () => void,
  updateDragging: (isDragging: boolean) => void
}

export type Marker = {
  point: number,
  position: number,
  marker: {[s: string]: any;}
}

export interface ISliderHandle {
  tooltip: Ref<HTMLElement>,
  showTooltip: Ref<boolean>,
  wrapperStyle: ComputedRef<CSSStyleDeclaration>,
  formattedValue: ComputedRef<string | number>,
  handleMouseEnter: () => void,
  handleMouseLeave: () => void,
  handleButtonDown: (event: MouseEvent | TouchEvent) => void,
  onLeftKeyDown: () => void,
  onRightKeyDown: () => void,
  setPosition: (newPosition: number) => void
}

export interface ISliderHandlerData {
  startX: number,
  currentX: number,
  startY: number,
  currentY: number,
  startPosition: number,
  newPosition: number,
  oldValue: number,
}

export interface ISliderHandlerProps {
  modelValue: number,
  vertical: boolean,
}

export type SliderHandleRefs = {
  [s in 'firstHandleEl' | 'secondHandleEl']: Ref<ISliderHandle>
}

export type Markers = ComputedRef<Marker>
