import React from 'react'
import './NavIcons.css'
import Home from "../../img/home.png"
import Noti from "../../img/noti.png"
import Comment from "../../img/comment.png"
import { UilSetting } from "@iconscout/react-unicons"

function NavIcons() {
  return (
    <div className="navIcons">
    <img src={Home} alt="" />
    <UilSetting />
    <img src={Noti} alt="" />
    <img src={Comment} alt="" />
  </div>
  )
}

export default NavIcons
