import fly from "./http"
class Apis {
    test(){
        return fly.request("/json1811.ashx",{
            v:"1565762846151",
            c:"PhotoListCenter",
            m:"GetPhotoLIst",
            Type:"2",
            AdvertisingType:"1"
          },{
              method:"GET"
          })
    }
}
export default new Apis();