<template>
  <div class="home">
    <div class="top" v-if="foodslist.length>0">
      <div></div>
      <swiper 
        autoplay="autoplay" interval="2000" duration="500" circular='true'>
        <block v-for="(item,index) in swiperlist" :key='index'>
          <swiper-item>
            <image :src="item"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <p class="js">”津市牛肉粉“是湖南省最有名的特色小吃，制作原料主要有山楂、枙子、灵香草等。作为地方特产，也能成为人们常食用的食品，味道鲜美，香滑不油，吃起来润滑可口、风味独具。</p>
    <i-row class="goods">
        <i-col span="6" i-class="col-class">
          <ul class="left">
            <li v-for="(item,index) in tablist" :key="index" @click="selc(index)">
              <h1 :class="{active:currentNum===index}">{{item}}</h1>
            </li>
          </ul>
        </i-col>
        <i-col span="18" i-class="col-class">
          <scroll-view
            scroll-y
            :scroll-into-view="selcterId"
            scroll-with-animation
            @scroll="getScroll"
            @scrolltolower="scrollOver"
            class="right"
          >
            <ul>
              <li v-for="(item,index) in foodslist" :key="index">
                <h1 :id="'po'+index"  class="title">{{tablist[index]}}</h1>
                <ul>
                  <li v-for="(it,indx) in item.foods" :key="indx">
                    <img :src="imglist[index][indx]"  @click="sel(it.specfoods[0].food_id)"/>
                    <div>
                      <h1>{{it.name}}</h1>
                      <p>{{it.description}}</p>
                      <p>{{'月售'+it.month_sales+'份 好评率'+it.satisfy_rate+'%'}}</p>
                    </div>
                    <div class="price">
                      <span>{{'￥'+it.specfoods[0].price}}</span>
                      <div>
                        <img v-show="num[index][indx]>0" src="../../../static/images/cdd.svg" alt="" @click="add(false,index,indx,it)">
                        <p v-show="num[index][indx]>0">{{num[index][indx]}}</p>
                        <i v-show="num[index][indx]<=0"></i>
                        <img src="../../../static/images/add.svg" alt="" @click="add(true,index,indx,it)">
                      </div>
                    </div>
                    <div class="details" v-if="bool==it.specfoods[0].food_id">
                      <img :src="imglist[index][indx]"  />
                      <h1>{{it.name}}</h1>
                      <p>{{'月售'+it.month_sales+'份 好评率'+it.satisfy_rate+'%'}}</p>                  
                      <div>
                        <span>{{'￥'+it.specfoods[0].price}}</span>
                        <div>
                          <img v-show="num[index][indx]>0" src="../../../static/images/cdd.svg" alt="" @click="add(false,index,indx,it)">
                          <p v-show="num[index][indx]>0">{{num[index][indx]}}</p>
                          <i v-show="num[index][indx]<=0"></i>
                          <img src="../../../static/images/add.svg" alt="" @click="add(true,index,indx,it)">
                        </div>
                      </div>
                      <p>{{it.description}}</p>
                      <img src="../../../static/images/x.svg" alt="" class="im" @click="sel">
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </scroll-view>
        </i-col>
    </i-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      foodslist:[],
      tablist:[],
      imglist:[],
      swiperlist:[],
      currentNum:0,
      selcterId: "",
      listHeight:[],
      // num:[],
      bool:0
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
      let anum=[]
      this.foodslist.map((ite,index)=>{
        let arr=[]
        let num=[]
        ite.foods.map((item,inde)=>{
          let str='https://cube.elemecdn.com/'+item.image_path.substr(0,1)+'/'+item.image_path.substr(1,2)+'/'+item.image_path.substr(3)+'.jpeg'
          arr.push(str)
          num.push(0)
        })
        this.imglist.push(arr)
        anum.push(num)
      })
      this.$store.commit('num',anum)
      this.swiperlist=this.imglist[1].slice(0,4);
      setTimeout(()=>{
        this.getNodesInfo();
      },80)
    })
  },
  computed:{
    num(){
      return this.$store.state.num;
    }
  },
  methods: {
    selc(index) {
      this.selcterId = "po" + index;
    },
    getScroll(e) {
      let scrollTop=e.target.scrollTop;
      for(let i =0;i<this.listHeight.length;i++){
        var h1=this.listHeight[i];
        var h2=this.listHeight[i+1];
        // console.log(h1,h2);
        if(scrollTop>=h1&&scrollTop<h2){
          this.currentNum=i;
        }
      }
    },
    getNodesInfo() {
      const query = wx.createSelectorQuery();
      query.selectAll(".title").boundingClientRect(nodes=>{
        // this.listHeight.push(0);
        nodes.map((item)=>{
          this.listHeight.push(item.top-355);
        })
      }).exec();
    },
    add(bool,index,indx,it){
      let data={
        name:it.name,
        price:it.specfoods[0].price,
        num:0,
        index:index,
        indx:indx
      }
      if(bool){
        this.num[index][indx]+=1
        this.num[index].splice(indx,1,this.num[index][indx])
        data.num=this.num[index][indx]
      }else{
        this.num[index][indx]-=1
        if(this.num[index][indx]<=0){
          this.num[index][indx]=0
        }
        data.num=this.num[index][indx]
        this.num[index].splice(indx,1,this.num[index][indx])
      }
      this.$store.commit('num',this.num)
      this.$store.commit('add',data)
      var num=0;
      this.$store.state.foodslist.map((res)=>{
        num+=res.num
      })
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
    sel(res){
      this.bool=res;
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang='scss'> 
.top{
  width: 100%;
  height: 200px;
  position: relative;
  div{
    width: 100%;
    height: 100%;
    background: $col;
    opacity: 0.2;
  }
  ._swiper{
    position: absolute;
    width: 200px;
    height: 200px;
    top:20px;
    left:87.5px;
    z-index: 5;
  }
}
.js{
  margin: 20px auto;
  width: 280px;
}
.goods {
  .left {
    height: 550px;
    background: rgb(243, 240, 240);
    h1{
      font-size: 18px;
      line-height: 24px;
      padding: 10px 0;
    }
    .active{
      background: $col;
    }
  }
  .right {
    flex: 1;
    height: 550px;
    overflow: hidden;
    background: #fff;
    .title{
      font-size: 18px;
      line-height: 24px;
      padding: 5px 0;
      text-indent: 10px;
    }
    ul>li>ul>li{
      overflow: hidden;
      padding: 10px 0;
      position: relative;
      >img{
        width:100px;
        height:100px;
        margin: 10px;
        float: left;
      }
      >div:nth-child(2){
        float: left;
        width: 160px;
        h1{
          font-size: 16px;
          padding-top: 15px;
        }
        p:nth-child(2){
          font-size: 14px;
          line-height: 20px;
          white-space: nowrap; 
          width: 100%; 
          overflow: hidden;
          text-overflow:ellipsis;
        }
        p:nth-child(3){
          font-size: 12px;
          line-height: 20px;
          color: #c1c1c1;
        }
      }
      .price{
        position: absolute;
        bottom:10px;
        right: 0;
        width: 160px;
        span{
          color: red;
          float: left
        }
        div{
          float: right ;
          width: 70px;
          padding-right: 10px;
          display: flex;
          line-height: 20px;
          justify-content: space-between;
          img{
            width: 20px;
            height: 20px;  
          }
        }
      }
      .details{
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        z-index:100;
        background: #fff;
        >img{
            width: 375px;
            height: 375px; 
        }
        h1{
          padding:0 15px;
          font-size: 18px;
          line-height: 30px;
        }
        >p{
          padding:0 15px;
          font-size: 12px;
          line-height: 20px;
        }
        div{
          padding:0 15px;
          display: flex;
          justify-content: space-between;
          span{
            color: red;
          }
          div{
            width: 70px;
            padding-right: 10px;
            display: flex;
            line-height: 20px;
            justify-content: space-between;
            img{
              width: 20px;
              height: 20px;  
            }
          }
        }
        .im{
          position: absolute;
          top:20px;
          right:20px;
          width: 30px;
          height: 30px;
        }
      }
    } 
  }
}
</style>
