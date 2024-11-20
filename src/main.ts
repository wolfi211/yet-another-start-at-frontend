import '@/assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import PrimeVue from 'primevue/config'

import Aura from '@primevue/themes/aura'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: false,
      },
    },
  })
  .mount('#app')
