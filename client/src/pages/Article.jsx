import React from 'react'
import { useLocation } from 'react-router-dom'
import { Image } from 'antd'

export default function Article() {
  const location = useLocation()
  console.log(location.state)
  const {username, category, title, text_content, imageUrl} = location.state
  return (
    <div className='flex flex-col w-6/12 mx-auto bg-neutral-400 bg-opacity-50 h-screen overflow-y-scroll divide-y divide-dotted px-20 pt-10'>
      <div className='flex flex-row w-full justify-between items-center pb-5'>
        
        <div className='basis-6/12 text-3xl '>
          {title}
        </div>
        
        <div className='basis-2/12 italic text-neutral-300'>
          -- {username}
        </div>
      </div>

      {/* Post body */}
      <div className='pt-5'>
      {
        category == 'text'
        ? {text_content}
        : <div className='flex felx-col justify-center'> <Image width={700} src={`/publications/${imageUrl}`}/> </div>
      }
      </div>
      

    </div>
  )
}
