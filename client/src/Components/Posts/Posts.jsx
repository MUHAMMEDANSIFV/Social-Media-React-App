import React from 'react'
import "./Posts.css"
import Post from '../Post/Post'

function Posts({PostsList}) {
  return (
    <div className='Posts'>
        {
          PostsList.map((data,id) => {
            return(
             <Post key={id} data={data} />
            )
          })
        }
    </div>
  )
}

export default React.memo(Posts);
