import React from 'react'
import PostScroll from '../components/PostScroll'
import { useLocation } from 'react-router-dom'
export default function SearchResults() {
    const location = useLocation()
    return (
      <>
        {
            location.state !== null && location.state.posts!==null
            ?
            <PostScroll posts={location.state.posts}/>
            :
            <div></div>
        }
      </>
    )
}
