import axios from 'axios'
import React from 'react'
import {AiOutlineSearch} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

export default function Search() {

    const [searchPrompt, setSearchprompt] = React.useState('')
    const [searchBy, setSearchBy] = React.useState('')
    
    const readSelection = (event) => {
        setSearchBy(event.target.value) 
    }

    const readEntry = (event) => {
        const {keyCode, target} = event
        if(keyCode !== 13) {
            setSearchprompt(target.value.trim())
        }
    }

    const [err, setErr] = React.useState(null)
    const navigate = useNavigate()
    const handleFormSubmit = event => {
        event.preventDefault()
    }
    const handleReturn = (event) => {
        const { key } = event
        if(key === 'Enter' && searchPrompt.length>0) {
            // 将搜索内容发给后端
            axios({
              method:'get',
              url:'post/',
              params: {
                  searchBy: `${searchBy}`,
                  keyword: `${searchPrompt}`
              }
            }).then(res => {
                navigate("../search_results", {state:{posts:res.data}})
            }).catch(err => {
                setErr(err)
            })
        }
    }

    return (
            <div className='flex flex-col justify-center items-center h-screen space-y-8'>
              <h1 className='text-4xl -mt-44 text-white italic'>Welcome to Emrys Wonderland</h1>
              <h3 className=' mb-10 text-white'>A free space for content creators</h3>

              <form className='flex flex-col items-center space-y-2 w-1/4' onSubmit={handleFormSubmit}>

                  <div className='w-full relative'>
                      <input type="text" name="search" onChange={readEntry} onKeyUp={handleReturn} className='w-full rounded-3xl pl-12 py-2 outline-none  ' placeholder='I am looking for...'/>
                      <AiOutlineSearch className='absolute top-2.5 left-4 text-lg text-gray-600 '/>
                  </div>

                  <div onChange={readSelection} className='w-full flex flex-row justify-around text-white [&_label]:cursor-pointer [&_label]:font-bold [&_input]:hidden'>
                      <div className='cursor-default '>Search by: </div>
                      <div>  
                          <input type="radio" name="searchBy" id='author' value="author" className='peer'/>
                          <label htmlFor="author" className='peer-checked:text-teal-700' >
                              Author
                          </label>
                      </div>
                      <div>
                          <input type="radio" name="searchBy" id='title' value="title" className='peer' />
                          <label htmlFor="title" className='peer-checked:text-teal-700' >Title</label>
                      </div>
                      <div>
                          <input type="radio" name="searchBy" id='character' value="character" className='peer' />
                          <label htmlFor="character"className='peer-checked:text-teal-700' >Character</label>
                      </div>
                  </div>
              </form>

              {
                err && <div>{err}</div>
              }
            </div>
        )   
}   
