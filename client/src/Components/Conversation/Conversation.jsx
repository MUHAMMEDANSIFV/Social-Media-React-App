import React, { Fragment } from 'react'

function Conversation({data,cu}) {
  return (
    <Fragment>
    <div className='follower conversation'>
      <div>
         <div className="online-dot"></div>
         <img src='' alt='' className='followerImage' 
         style={{width:'50px',height:'50px'}} />
         <div className='name' style={{fontSize:"0.8rem"}}>
          <span></span>
          <span>Online</span>
         </div>
      </div>
    </div>
    <hr style={{width:"85%",border:"0.1px solid #ececec"}} />
         </Fragment>
  )
}

export default Conversation;
