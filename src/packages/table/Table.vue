<template>
  <table
    :class="[
      'sui-table',
      {
        'is-bordered': border,
        'is-striped': stripe
      }
    ]"
  >
    <thead>
    <tr>
      <th
        v-for="(item, i) in headers"
        :key="`header-${i}`"
        :class="{
          'sui-table__extra-col':
            (item.value === 's-table-select' || item.value === 's-table-expand') ?
              '20px' : 'auto',
          'is-sortable': item.sortable
        }"
        @click="handleThClick(item, i)"
        @mouseenter="handleThMouseEnter(item, i)"
        @mouseleave="handleThMouseLeave(item, i)"
      >
        <template
          v-if="item.value === 's-table-select'"
        >
          <s-checkbox
            v-model="isAllSelected"
            :indeterminate="selected.length > 0 && !isAllSelected"
            @change="handleAllSelectChange"
          ></s-checkbox>
        </template>
        <template v-else>{{ item.label }}</template>

        <template v-if="item.sortable">
          <button :class="[
            'sui-table__sort',
            {
              'is-shown': headersHovering[i],
              'is-activated': showSortingIcon(item, i)
            }
          ]">
            <s-icon :name="getSortingIconName(item, i)" stroke-width="3"></s-icon>
          </button>
        </template>
      </th>
    </tr>
    </thead>

    <tbody>
    <template
      v-for="(item, i) in sortedData"
      :key="`col-${i}`"
    >
      <tr @click="handleRowClick(item)">
        <!-- extra col for expansion arrow -->
        <td
          v-if="expandable && renderExtraCol('expand')"
          class="sui-table__extra-col"
        >
          <s-icon
            name="chevron-right"
            :class="{ 'is-expanded': isRowExpanded(item[rowPkField]) }"
          ></s-icon>
        </td>
        <!-- extra col for selection checkbox -->
        <td
          v-if="selectable"
          class="sui-table__extra-col"
        >
          <s-checkbox
            v-model="selected"
            :value="item[rowPkField]"
            @click="handleSelectChange"
          ></s-checkbox>
        </td>

        <!-- normal cols -->
        <template
          v-for="(value, key) in item"
          :key="`cell-${key}`"
        >
          <td
            v-if="isColEnabled(key)"
          >
            <slot
              :item="item"
              :name="`item-${key}`"
            >{{ value }}
            </slot>
          </td>
        </template>
      </tr>

      <tr
        v-if="isRowExpanded(item[rowPkField])"
        class="sui-table__expand-row"
      >
        <td :colspan="headers.length + 1">
          <slot :item="item" name="expanded"></slot>
        </td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed
} from 'vue'

import {
  ITableHeader
} from './table.type'

import SIcon from '../icon'
import SCheckbox from '../checkbox'

import {
  useExpansion,
  useSelection,
  useSorting
} from '@/utils/compositions/table'

import error from '@/utils/class.error'

export default defineComponent({
  name: 'STable',
  components: {
    SIcon,
    SCheckbox
  },
  emits: ['click:row', 'update:expandedRows', 'update:selectedRows'],
  props: {
    headers: {
      type: Array as PropType<ITableHeader[]>,
    },
    data: Array,
    border: Boolean,
    stripe: Boolean,
    rowPkField: {
      type: [String, Number],
      default: 'id'
    },
    expandable: Boolean,
    expandedRows: Array,
    selectable: Boolean,
    selectedRows: Array
  },
  setup(props, {emit}) {
    const {
      randomName,
      selected,
      isAllSelected,
      handleSelectChange,
      handleAllSelectChange
    } = useSelection(props, emit)

    const {
      isRowExpanded,
      toggleRowExpansion
    } = useExpansion(emit)

    const {
      sortedData,
      headersHovering,
      activatedSortingHeader,
      isHeaderSortingActivated,
      handleThClick,
      handleThMouseEnter,
      handleThMouseLeave,
      showSortingIcon,
      getSortingIconName
    } = useSorting(props)

    const handleRowClick = (row) => {
      emit('click:row', row)

      if (props.expandable) {
        if (!row[props.rowPkField]) {
          error(
            'sui-table',
            'expandable table has to provide extra field with the same ' +
            'value provided in the props: ' + props.rowPkField
          )
        }

        toggleRowExpansion(row[props.rowPkField])
      }
    }

    const renderExtraCol = (key) => {
      if (props.headers) {
        return props.headers.filter(
          e => e.value === `s-table-${key}`
        ).length >= 1
      }

      return false
    }

    const headerKeys = computed(() => {
      const arr: any[] = []
      if (props.headers) {
        props.headers.forEach(e => {
          arr.push(e.value)
        })
      }

      return arr
    })

    const isColEnabled = (key) => {
      return headerKeys.value.includes(key)
    }

    return {
      sortedData,
      headerKeys,
      isColEnabled,

      selected,
      randomName,
      headersHovering,
      activatedSortingHeader,
      showSortingIcon,
      getSortingIconName,

      isRowExpanded,
      isAllSelected,
      isHeaderSortingActivated,

      handleRowClick,
      handleSelectChange,
      handleAllSelectChange,

      handleThClick,
      handleThMouseEnter,
      handleThMouseLeave,

      toggleRowExpansion,
      renderExtraCol,
    }
  }
})
</script>
