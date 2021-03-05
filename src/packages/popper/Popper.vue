<script lang="ts">
  import {
    createVNode,
    defineComponent,
    Fragment,
    Teleport,
    onBeforeUnmount,
    onDeactivated,
    onActivated,
    onMounted,
    renderSlot,
    toDisplayString,
    withDirectives,
  } from 'vue'

  import throwError from '@/utils/class.error'
  import { PatchFlags, renderBlock } from '@/utils/vnode'

</script>
