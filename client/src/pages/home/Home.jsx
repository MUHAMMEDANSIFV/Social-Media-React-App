import axios from '../../Api/Axios.instence'
import React, { useState , useEffect, Fragment } from 'react'
import { useNavigate } from "react-router-dom"
import LeftSide from '../../Components/LeftSide/LeftSide'
import PostSide from '../../Components/Postside/PostSide'
import RightSide from '../../Components/RightSide/RightSide'
import './Home.css'
import {useDispatch} from "react-redux"
import Loder from '../../Components/Loder/Loder'

function Home() {

  const navigate = useNavigate()
  const [Loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
     jwtveryfication()
     
  })

       const jwtveryfication = async () => {
      const response = await axios.get("/user/home", { withCredentials: true })
      if(response.success){
       dispatch({
        type:"user",
        payload:response.user
       })
         setLoading(false)
      }else{
        navigate("/")
      }
    }
  if(Loading) return (
    <div className='Home'>
       <Loder />
    </div>
  )
  return (
    <Fragment>
          <div className='Home'>
            <LeftSide />
            <PostSide />
            <RightSide />
          </div>
    </Fragment>
  )
}

export default Home
