import Vue from 'vue'
import App from './App'
import core from "@/core"

Vue.config.productionTip = false
App.mpType = 'app'
core(Vue)
const app = new Vue(App)
app.$mount()
