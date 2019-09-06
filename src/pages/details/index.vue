<template>
  <div>
      <i-tabs current="key" scroll @change="handleChangeScroll">
        <i-tab :key="index" v-for="(item,index) in x"></i-tab>
      </i-tabs>
  </div>
</template>

<script>

export default {
  

  data () {
    return {
      img:''
    }
  },
  mounted(){
    wx.showLoading({
      title:'Loading...'
    })
    this.$apis.get().then((res)=>{
      wx.hideLoading();
      this.foodslist=res.menu;
      this.tablist=res.tablist;
      this.foodslist.map((ite,index)=>{
        let arr=[]
        let num=[]
        ite.foods.map((item,inde)=>{
          let str='https://cube.elemecdn.com/'+item.image_path.substr(0,1)+'/'+item.image_path.substr(1,2)+'/'+item.image_path.substr(3)+'.jpeg'
          arr.push(str)
          num.push(0)
        })
        this.imglist.push(arr)
        this.num.push(num)
      })
      this.swiperlist=this.imglist[1].slice(0,4);
      setTimeout(()=>{
        this.getNodesInfo();
      },80)
    })
  },
  methods:{
    
  }
}
</script>

<style scoped lang='scss'>

</style>
