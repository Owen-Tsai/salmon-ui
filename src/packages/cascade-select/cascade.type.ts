export interface ICascadeProvider {
  disabled?: boolean,

}

export interface ICascadeDataItem {
  label?: string,
  value: string | number,
  children?: ICascadeDataItem[],

  [otherOptions: string]: unknown
}

export type ProcessedData = Array<ICascadeDataItem[]>
