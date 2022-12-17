import axios from '../../Api/Axios.instence'
import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from "react-router-dom"
import LeftSide from '../../Components/LeftSide/LeftSide'
import PostSide from '../../Components/Postside/PostSide'
import RightSide from '../../Components/RightSide/RightSide'
import Loder from '../../Components/Loder/Loder'
import './Home.css'
import {useDispatch} from "react-redux"

function Home() {

  const [Loderworking, setLoderworking] = useState(true)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    jwtveryfication(()=>{
      setLoderworking(false)
    })
  })

       const jwtveryfication = async (loderstop) => {
      axios.defaults.withCredentials = true;
      const response = await axios.get("/user/home", { withCredentials: true })
      console.log(response.data)
      if(response.data.success){
       dispatch({
        type:"user",
        payload:response.data.user
       })
       loderstop()
      }else if(response.data.status === "jwt expired"){
       refreshtoken()
      }else{
        navigate("/")
      }
    }

    const refreshtoken = async () => {
      axios.defaults.withCredentials = true
      const response = await axios.get("/auth/refreshtoken",{withCredentials:true})
      console.log(response)
      if(response.data.message){
        jwtveryfication()
      }else if(response.data.error){
        navigate("/")
      }
    }

  return (
    <Fragment>
      {
        Loderworking ?
           <Loder />
                     :
          <div className='Home'>
            <LeftSide />
            <PostSide />
            <RightSide />
          </div>
      }
    </Fragment>
  )
}

export default Home
