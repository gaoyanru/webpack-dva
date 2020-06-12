/* eslint-disable no-irregular-whitespace */
import dva from 'dva'
import { createHashHistory } from 'history'
import router from './router'
const app = dva({
  history: createHashHistory()
})
app.router(router)
app.start('#app')
