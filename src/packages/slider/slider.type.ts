import { ComputedRef } from 'vue'

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
  tooltipClass: string,
  markers?: Record<number, any>
}

export interface ISliderData {
  firstValue: number,
  secondValue: number,
  oldValue: number,
  isDragging: boolean,
  sliderSize: number
}

export interface ISliderProvider {
  disabled: ComputedRef<boolean>,
  min: ComputedRef<number>,
  max: ComputedRef<number>
}

export type Marker = {
  point: number,
  position: number,
  marker: {[s: string]: any;}
}

export type Markers = ComputedRef<Marker>
