import React, { useState,useEffect, Fragment } from 'react'
import  { GooeyCircleLoader } from "react-loaders-kit"
import "./Loder.css"

function Loder() {

  const [loderstart,setlodaerstart] = useState(false)

    const loaderProps = {
        loading: true,
        size: 275,
        duration: 50,
        colors: ["#99fffe", "#f42e00", "#042549"],
      };

    useEffect(() => {
      setTimeout(()=>{
        setlodaerstart(true)
      },1000)
    });


  return (
    <Fragment>

       {
         loderstart ? 
         <div className='Loder'>
         <div>
       <GooeyCircleLoader {...loaderProps} />
       </div>
        <span>Loding......</span>
        </div>
        :  ""
      }
    </Fragment>
  )
}

export default Loder
