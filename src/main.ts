import { createApp } from 'vue'
import Main from './App.vue'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale-subtle.css'
import 'tippy.js/animations/shift-away.css'
import 'tippy.js/themes/light-border.css'

import './styles/index.styl'

import Message from './packages/message/message'

let app = createApp(Main)
app.config.globalProperties.$message = Message

app.mount('#app')
