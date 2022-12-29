import axios from "./Axios.instence.js";
axios.defaults.withCredentials = true;

export const allchatster = async (callback) => {
    try{
       const response = await axios.get("/chat/allchasrter")
       callback(response)
    }catch(err){
        callback(err)
    }
}