import axios from "../Api/Axios.instence.js";
axios.defaults.withCredentials = true;


export const getAllUser =async (callback) => {
    try{

      const response = await axios.get("/user/all-users")
      callback(response)
    }catch(err){
        callback(err)
        console.log(err)
    }
}