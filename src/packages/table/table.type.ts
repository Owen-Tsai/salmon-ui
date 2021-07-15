export interface ITableHeader {
  label?: string,
  value: string,
  sortable?: boolean,
  align?: string
}

export interface ITableSortingHeader {
  index: number,
  activated: boolean,
  order: 'ascending' | 'descending' | 'none'
}
