import axios from "axios"

const tokeninstorage = localStorage.getItem("token")
const Token = tokeninstorage ? tokeninstorage : null ;

const instance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    headers: {accessToken:Token}
  });

export default instance;