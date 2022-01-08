import {
  ref,
  watch
} from 'vue'

import { generateId } from '@/utils/utils'
import error from '@/utils/class.error'

import {
  ITableSortingHeader,
  ITableHeader
} from '@/packages/table/table.type'

export const useExpansion = (emit) => {
  const expanded = ref<any[]>([])

  const isRowExpanded = (id) => (
    expanded.value.includes(id)
  )

  const toggleRowExpansion = (id) => {
    const index = expanded.value.indexOf(id)

    if (index > -1) {
      expanded.value.splice(index, 1)
    } else {
      expanded.value.push(id)
    }

    emit('update:expandedRows', expanded.value)
  }

  return {
    isRowExpanded,
    toggleRowExpansion
  }
}

export const useSelection = (props, emit) => {
  const selected = ref<any[]>([])
  const isAllSelected = ref(false)
  const randomName = generateId()

  const isRowSelected = (id) => {
    selected.value.includes(id)
  }

  const handleSelectChange = () => {
    emit('update:selectedRows', selected)
  }

  const handleAllSelectChange = () => {
    if (!isAllSelected.value) {
      selected.value = []
    } else {
      props.data?.forEach((item: any) => {
        if (!item[props.rowPkField]) {
          error(
            'sui-table',
            'selectable table has to provide extra field with the same ' +
            'value provided in the props: ' + props.rowPkField
          )
        }
        if (!selected.value.includes(item[props.rowPkField])) {
          selected.value.push(item[props.rowPkField])
        }
      })
    }

    emit('update:selectedRows', selected)
  }

  watch(() => selected.value, (val) => {
    isAllSelected.value = val.length === props.data.length
  })

  return {
    randomName,
    selected,
    isRowSelected,
    isAllSelected,
    handleSelectChange,
    handleAllSelectChange
  }
}

export const useSorting = (props) => {
  const headersHovering = ref<boolean[]>(new Array(props.headers.length).fill(false))
  const activatedSortingHeader = ref<ITableSortingHeader>()
  const sortedData = ref([...props.data])

  const handleThMouseEnter = (item, i) => {
    if (!item.sortable) return
    headersHovering.value[i] = true
  }
  const handleThMouseLeave = (item, i) => {
    if (!item.sortable) return
    headersHovering.value[i] = false
  }
  const isHeaderSortingActivated = (item, i) => {
    if (activatedSortingHeader.value?.index === i) {
      return activatedSortingHeader.value
    }

    return false
  }
  const handleThClick = (item, i) => {
    if (!item.sortable) return
    const e = isHeaderSortingActivated(item, i)

    if (e) {
      if (e.activated) {

        e.order = (e.order === 'ascending' ? 'descending' : 'none')

        if (e.order === 'none') {
          e.activated = false
        }

      } else {
        e.activated = true
        e.order = 'ascending'
      }
    } else {
      activatedSortingHeader.value = {
        index: i,
        activated: true,
        order: 'ascending'
      }
    }

    doSort(e ? e.order : 'ascending', item)
  }

  const doSort = (
    order: 'ascending' | 'descending' | 'none',
    headerItem: ITableHeader
  ) => {
    if (order === 'none') {
      sortedData.value = [...props.data]
    } else {
      sortedData.value = sortedData.value.sort(
        (a, b) => {
          a = a[headerItem.value]
          b = b[headerItem.value]

          return (a === b ? 0 : a > b ? 1 : -1) * (order === 'ascending' ? 1 : -1)
        }
      )
    }
  }

  const showSortingIcon = (item, i) => {
    const e = isHeaderSortingActivated(item, i)
    return e && e.activated
  }

  const getSortingIconName = (item, i) => {
    const e = isHeaderSortingActivated(item, i)

    if (e && e.order === 'descending') {
      return 'arrow-down'
    } else {
      return 'arrow-up'
    }
  }

  return {
    sortedData,
    headersHovering,
    activatedSortingHeader,

    isHeaderSortingActivated,
    handleThMouseEnter,
    handleThMouseLeave,
    handleThClick,

    showSortingIcon,
    getSortingIconName
  }
}
