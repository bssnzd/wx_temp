<template>
  <div class="counter">
    <div v-if="foodslist.length<=0" class="top">
      购物车空空如也...
    </div>
    <p v-if="foodslist.length>0">
      <span>已选商品</span>
      <span @click="clear">清空</span>
    </p>
    <div class="show" v-for="(item,index) in foodslist" :key="index">
        <p>{{item.name}}</p>
        <div>
          <p>{{"￥"+item.price*item.num}}</p>
          <img src="../../../static/images/cdd.svg" alt="" @click="add(false,item)">
          <p>{{item.num}}</p>
          <img src="../../../static/images/add.svg" alt="" @click="add(true,item)">
        </div>    
    </div>
    <p class="sb" v-if="foodslist.length>0">
      <span>总价</span>
      <span>{{"￥"+count}}</span>
    </p>
  </div>
</template>

<script>
// Use Vuex
// import store from './store'

export default {
  data(){
    return {
    }
  },
  computed: {
    foodslist () {
      return this.$store.state.foodslist
    },
    count(){
      var count=0;
      this.$store.state.foodslist.map((res)=>{
        count+=res.price*res.num
      })
      return count;
    }
  },
  mounted(){
    this.getcount()
  },
  methods: {
    add(bool,item){
      if(bool){
        item.num+=1
      }else{
        item.num-=1  
      }
      this.$store.commit('add',item)
      this.getcount(item)
    },
    getcount(item){
      var num=0
      this.$store.state.foodslist.map((res)=>{
        num+=res.num
      })
      this.$store.commit('cdd',item)
      num=''+num;
      if(num!=0){
        wx.setTabBarBadge({
          index: 1,
          text: num
        })
      } else{
        wx.removeTabBarBadge({
          index: 1          
        })
      }
    },
    clear(){
      this.$store.commit('clear')
      this.getcount()
    }
  }
}
</script>

<style scoped lang='scss'>
.counter{
  .top{
    background: #eceff1;
    text-align: center;
  }
  >p{
    background: #eceff1;
    display: flex;
    justify-content: space-between;
    width: 100%;
    span{
      padding: 0 20px;
    }
  }
  .sb{
    background: #fff;
    span:nth-child(2){
      margin-right: 80px;
      color: $col;
    }
  }
  .show{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    >p{
      font-size: 20px;
      line-height: 40px;
    }
    div{
      display: flex;
      justify-content: space-between;
      p:nth-child(1){
        color:red;
        font-size: 14px;
        line-height: 40px;
        padding-right: 20px;
      }
      img{
        margin-top: 10px;
        width: 20px;
        height: 20px;
      }
      p:nth-child(3){
        font-size: 14px;
        line-height: 40px;
        padding: 0 10px;
      }
    }
  }
}
</style>
