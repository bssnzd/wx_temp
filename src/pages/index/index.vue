<template>
  <div>
    <div :id="'box'+'a'">
      aaaaaaaaa
    </div>
    <div v-if="bool" :style="{width:'100px',heigth:'100px',background:'#fe5026'}">
      aaaa
    </div>
    <div v-show="!bool" style="width:100px;heigth:100px;background:yellow">
      bbbb
    </div>
    <div>
      <button @click="target">target</button>
      <div @click="target">
        xxx
        <div @click.stop="target">aaa</div>
      </div>
    </div>
    <input type="text" v-model="val" style="border:1px solid #ff6618">
    <span>{{val}}</span>
    <button @click="tag">tag</button>
    <card_a/>
    <card :text='text'/>

  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data () {
    return {
      bool:true,
      val:'',
      text:'bssnzd'
    }
  },

  components: {
    card
  },

  methods: {
    target(){
      this.bool=!this.bool
      console.log(1)
    },
    tag(){
      wx.navigateTo({
        url:'../counter/main?name=bssnzd'
      })

    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang='scss'> 
#boxa{
  background: $col;
  width: 10*10px;
  height: 1*100px;
}
</style>
