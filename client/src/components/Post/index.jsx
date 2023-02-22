import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'antd'

// A single chat bubble
export default function Post (props) {
    const {avatar, category, title, text_content, imageUrl, publish_date, username} = props
    const date = publish_date.substring(0,10)
    return (
        <div className='flex flex-row items-start justify-around w-10/12 '>
            <div className='basis-1/12 aspect-square rounded-full overflow-hidden '>
                {
                    avatar?
                    <img src={avatar} alt="avatar" className='object-fill h-full w-full '/>
                    :
                    <div className='h-full w-full bg-white'></div>
                }
            </div>
            <Link to="/article" state={{...props}} className=' basis-9/12 flex flex-col justify-between h-fit px-10 py-5 bg-slate-400 bg-opacity-60 rounded-2xl drop-shadow-xl'>
                <div className=' h-1/6 flex flex-row justify-between text-white italic font-serif' >
                    <span className=''>
                        {username}
                    </span>
                    <span className=''>
                        {date}
                    </span>
                </div>

                <div className=' h-1/6  text-xl font-bold italic' >{title}</div>

                {
                    category == 'text'
                    ?<div className=' h-1/2 text-neutral-600 overflow-y-scroll' >{text_content}</div>
                    : <div className='h-1/2'><Image width={300} src={`/publications/${imageUrl}`}/></div>
                }
                
                
            </Link>
        </div>
    )
}
