import {
  ref,
  watch
} from 'vue'

import { generateId } from '@/utils/utils'
import throwError from '@/utils/class.error'

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
          throwError(
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
