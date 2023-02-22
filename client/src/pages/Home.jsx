import React from 'react'
import PostScroll from '../components/PostScroll'
import {AiFillPlusCircle} from 'react-icons/ai'
import {BsVectorPen, BsFillCameraFill} from 'react-icons/bs'
import {BiMoviePlay} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Home() {

  const [posts, setPosts] = React.useState([])
  React.useEffect(() => {
    axios({
      method:'get',
      url:'post'
    })
    .then(res => {
      setPosts(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <>
      <PostScroll posts={posts}/>
      
      {/* bottom right plus sign for posting different types of content */}
      <div className='group absolute h-60 w-32 right-0 bottom-0 '>
          <AiFillPlusCircle className='text-7xl absolute left-1/4 bottom-5 cursor-pointer'/>
          <Link to="/compose" state={{contentType:'text'}}>
            <BsVectorPen className='hidden absolute left-1/2 -translate-x-1/2 bottom-10 text-4xl group-hover:block group-hover:animate-expandOut1 '/>
          </Link>
          <Link to="/compose" state={{contentType:'picture'}} >
            <BsFillCameraFill className='hidden absolute left-1/2 -translate-x-1/2 bottom-10 text-4xl group-hover:block group-hover:animate-expandOut2 '/>
          </Link>
          <Link to="/compose" state={{contentType:'video'}}>
            <BiMoviePlay className='hidden absolute left-1/2 -translate-x-1/2 bottom-10 text-4xl group-hover:block group-hover:animate-expandOut3'/>
          </Link>
      </div>

    </>
  )
}
