import fly from "./http"
import data from '../../data/data.json'
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
    get(){
        return new Promise((resolve,reject)=>{
            resolve(data)
        })
    }
}
export default new Apis();