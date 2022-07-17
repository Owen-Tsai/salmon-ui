import {
  onMounted,
  onUpdated,
  ref,
  VNode
} from 'vue'
import { getFirstElementFromChildren } from '@/utils/vue-utils'

type SlotChildren = {
  value?: VNode[]
}

const useFirstElement = () => {
  const children: SlotChildren = {};
  const firstElement = ref<HTMLElement>();

  const getFirstElement = () => {
    if (!children.value) return
    const element = getFirstElementFromChildren(children.value);
    if (element !== firstElement.value) {
      firstElement.value = element;
    }
  }

  onMounted(() => getFirstElement());

  onUpdated(() => getFirstElement());

  return {
    children,
    firstElement,
  }
}

export default useFirstElement
