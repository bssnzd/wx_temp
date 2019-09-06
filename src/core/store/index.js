// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    foodslist:[],
    num:[]
  },
  mutations: {
    add: (state,data) => {
      let bool=true
      state.foodslist.map((item,index)=>{
        if(item.name==data.name){
          if(data.num==0){
            state.foodslist.splice(index,1)
          }else{
            item.num=data.num
            state.foodslist.splice(index,1,item)
          }
          bool=false
        }
      })
      if(bool){
        state.foodslist.push(data)
      }
    },
    cdd: (state,item) => {
      if(item){
        state.num[item.index][item.indx]=item.num
      }
    },
    clear:(state)=>{
      state.foodslist=[];
      state.num.map((item,ind)=>{
        item.map((ind,index)=>{
          state.num[ind][index]=0
        })
        console.log(state.num)
      })
      
    },
    num:(state,data)=>{
      state.num=data
    }
  }
})

export default store
