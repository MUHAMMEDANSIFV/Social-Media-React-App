import axios from "./Axios.instence.js";
axios.defaults.withCredentials = true;

export const likepost =async (data,callback) => {
   try{

     const response = await axios.put("/post/post-like",data,{withCredentials:true})
     callback(response)

   }catch(err) {
    callback(err)
   }
}