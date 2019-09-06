<template>
  <div>
      <card text='bssnzd'/>
      <img :src="img" alt="">
      <button @click="getimg">img</button>
      <i-tabs :current="current" @change="handleChange" >
        <i-tab v-for='(item,index) in arr' :key="index" :title="'bssnzd'+item" :i-class="current==index?'aaa':''"></i-tab>
      </i-tabs>
      <map style='width:300px;height:300px'></map>
      <button size="mini" @click="getTest">getTest</button>
      <button size="mini" @click="getLong">getLong</button>
  </div>
</template>

<script>
import QQMapWX from "../../../static/js/qqmap-wx-jssdk.min.js";
var qqmapsdk;
export default {
  data() {
    return {
      markers:[],
      poi:[]
    };
  },
  onLoad() {
    qqmapsdk = new QQMapWX({
      key: "UVUBZ-QJD6F-6MDJP-JDHV4-BW3SK-KXBFD"
    });

    qqmapsdk.search({
      keyword: "酒店",
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      }
    });

    console.log(qqmapsdk);
  },
  methods: {
    getTest() {
      wx.getLocation({
        type: "gcj02",
        success(res) {
          const longitude = res.longitude;
          const latitude = res.latitude;
          const speed = res.speed;
          const accuracy = res.accuracy;
          // 逆地址解析
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            location: e.detail.value.reverseGeo || '',
            success(res){
              
              console.log(res);
            }
          });

          console.log(res);
        }
      });
    },
    getLong(){
      // 长沙市岳麓区麓谷企业广场
      // 地址解析
      var _this = this;
      qqmapsdk.geocoder({
        
        address:"长沙市岳麓区麓谷企业广场",
        success(res){
            var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        _this.markers= [{
            id: 0,
            title: res.title,
            latitude: latitude,
            longitude: longitude,
            iconPath: './resources/placeholder.png',//图标路径
            width: 20,
            height: 20,
            callout: { //可根据需求是否展示经纬度
              content: latitude + ',' + longitude,
              color: '#000',
              display: 'ALWAYS'
            }
          }],
          _this.poi= { //根据自己data数据设置相应的地图中心坐标变量名称
            latitude: latitude,
            longitude: longitude
          }
        ;
        }
      })
    }
  }
} 
</script>

<style  lang='scss'>
img{
  width: 206.5px;
  height: 275px;
}
.aaa i-badge view>view{
  background: #ff6618;
  color: beige;
}
</style>
