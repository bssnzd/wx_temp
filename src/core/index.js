import Apis from "@/core/api"
import store from "@/core/store"
export default (Vue)=>{
    // console.log(Vue);
    Vue.prototype.$eventHub=new Vue();
    Vue.prototype.$apis=Apis;
    Vue.prototype.$store=store;
}