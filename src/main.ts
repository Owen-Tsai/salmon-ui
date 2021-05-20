import { createApp } from 'vue'
import Main from './App.vue'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale-subtle.css'
import 'tippy.js/animations/shift-away.css'
import 'tippy.js/themes/light-border.css'

import './styles/index.styl'

import Message from './packages/message/message'
import Notification from './packages/notification/notification'

let app = createApp(Main)
app.config.globalProperties.$message = Message
app.config.globalProperties.$notify = Notification

app.mount('#app')
