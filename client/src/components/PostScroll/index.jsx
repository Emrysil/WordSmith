import React from 'react'
import Post from '../Post'

export default function PostScroll({posts}) {
    return (
      <div className='w-8/12 h-screen mx-auto overflow-auto'>
          <div className='flex flex-col items-center mt-10 space-y-10 ' >
              {
                posts && posts.map(x => {
                  return <Post key={x.post_id} {...x}/>
                })
              }
          </div>
      </div>
    )
}
