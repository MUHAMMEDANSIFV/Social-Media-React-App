import React from 'react'
import  { GooeyCircleLoader } from "react-loaders-kit"
import {} from "react"

function Loder() {

    const loaderProps = {
        loading: true,
        size: 275,
        duration: 2,
        colors: ["#99fffe", "#f42e00", "#042549"],
      };


  return (
    <div>
      <GooeyCircleLoader {...loaderProps} />
    </div>
  )
}

export default Loder
