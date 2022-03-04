import { createApp } from 'vue'
import Main from './App.vue'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale-subtle.css'
import 'tippy.js/animations/shift-away.css'
import 'tippy.js/themes/light-border.css'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-creative'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-creative'

import './styles/index.scss'

import Message from './packages/message/message'
import Notification from './packages/notification/notification'

// global components registration for examples
import Demo from '@/demo/components/Demo.vue'
import SIcon from 'salmon-ui/icon'

const app = createApp(Main)

app.component('Demo', Demo)
app.component('SIcon', SIcon)

app.mount('#app')
