export interface IProgressColor {
  color: string,
  percentage: number
}

export type ProgressType = 'linear' | 'circular' | 'dashboard'
export type ProgressStatus = 'success' | 'error' | 'normal' | 'active'
