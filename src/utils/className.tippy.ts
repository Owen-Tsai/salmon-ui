// plugin for adding custom class name to tippy instance

const updateClassNames = (
  boxEl: Element,
  action: string,
  classes: Array<string>
) => {
  classes.forEach((cls) => {
    boxEl.classList[action](cls)
  })
}

const classNamePlugin = {
  name: 'classes',
  defaultValue: [],

  fn(instance) {
    const box = instance.popper.firstElementChild

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
