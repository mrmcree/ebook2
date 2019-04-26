//全局注册组件 tab
import tabbarComponent from './tabbar.vue'
const tab={
    install:(Vue)=>{
        Vue.component('tab',tabbarComponent)
    }
}
export default tab