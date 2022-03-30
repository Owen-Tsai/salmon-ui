/*
 * This composition function watches attribute value changes
 * and execute re-apply new values
 */
import {
  getCurrentInstance,
  reactive,
  shallowRef,
  watchEffect
} from 'vue'
import { entries } from './utils'

interface Params {
  excludeListeners?: boolean,
  excludedKeys?: string[]
}

// attributes like class and style should not be watched
const DEFAULT_EXCLUDE_KEYS = ['class', 'style']

const listenersPrefix = /^on[A-Z]/

const useAttrs = (params: Params = {}) => {
  const {
    excludeListeners = false,
    excludedKeys = []
  } = params
  const instance = getCurrentInstance()
  if(!instance) return
  
  const attrs = shallowRef({})
  const allExcludedKeys = Array.from([...DEFAULT_EXCLUDE_KEYS, ...excludedKeys])

  instance.attrs = reactive(instance.attrs)

  watchEffect(()=> {
    attrs.value = entries(instance.attrs).reduce((acm, current) => {
      const key = current[0] as string
      const val = current[1] as string
      if(
        !allExcludedKeys.includes(key) &&
        !(excludeListeners && listenersPrefix.test(val))
      ) {
        // @ts-expect-error can be indexed with string
        acm[key] = val
      }

      return acm
    }, {})
  })

  return attrs
}

export default useAttrs
