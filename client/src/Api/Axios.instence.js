import axios from "axios"
axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {'X-Custom-Header': 'foobar'}
  });

instance.interceptors.response.use(response => response.data,async (error) => {
  const originalRequest = error.config;
  if(error.response.status === 401){
    try{
      originalRequest._retry = true
      const refreshtoken =  await instance.get("/auth/refreshtoken",{withCredentials:true})
      console.log(refreshtoken)
    const result = await axios(originalRequest)
    return result
    }catch(err){
       await axios.get("/auth/Logout",{withCredentials:true})
    }
  }else{
    return error
  }
})

export default instance;