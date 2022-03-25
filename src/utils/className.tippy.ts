// plugin for adding custom class name to tippy instance
import type {
  Instance,
  Plugin
} from 'tippy.js'

import type { ExtendedProps } from './popper'

const updateClassNames = (
  boxEl: Element,
  action: 'add' | 'remove',
  classes: Array<string>
) => {
  classes.forEach((cls) => {
    boxEl.classList[action](cls)
  })
}

const classNamePlugin: Plugin<ExtendedProps> = {
  name: 'classes',
  defaultValue: [],

  fn: (instance: Instance<ExtendedProps>) => {
    const box = instance.popper.firstElementChild as Element

    const add = () => {
      updateClassNames(box, 'add', instance.props.classes)
    }

    const remove = () => {
      updateClassNames(box, 'remove', instance.props.classes)
    }

    return {
      onCreate: add,
      onBeforeUpdate: remove,
      onAfterUpdate: add
    }
  }
}

export default classNamePlugin
