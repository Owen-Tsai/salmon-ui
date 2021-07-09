export type CarouselArrowOption = 'always' | 'hover' | 'never'
export type CarouselDirection = 'horizontal' | 'vertical'
export type CarouselTransition = 'fade' | 'slide'
export type CarouselSlidesPerViewOption = 'auto' | number

export interface IAutoplayConfig {
  delay?: number,
  pauseOnMouseEnter?: boolean
}
export type AutoPlayOption = boolean | IAutoplayConfig
