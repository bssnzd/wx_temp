var Fly=require("flyio/dist/npm/wx") //wx.js为您下载的源码文件
var fly=new Fly; //创建fly实例

fly.config.baseURL="http://m.bestcake.com"

fly.interceptors.request.use((request)=>{
    console.log(request)
    //给所有请求添加自定义header
    // request.headers["token"]="xxxxxx";
  	//打印出请求体
  	// console.log(request.body)
  	//终止请求
  	//var err=new Error("xxx")
  	//err.request=request
  	//return Promise.reject(new Error(""))
  
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})
 
//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        console.log(response);
        //只将请求结果的data字段返回
        return response.data
    },
    (err) => {
        //发生网络错误后会走到这里
        //return Promise.resolve("ssss")
    }
)
export default fly;