import React, { useState } from 'react'
import axios from 'axios'
import { useEffect, useContext, useRef } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

export default function Picture({formatDateTime}) {
  const titleContainer = useRef()
  const characterContainer = useRef()
  const [image, setImage] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=> {
    const {title, main_character} = location.state
    titleContainer.current.value = title? title : ""
    characterContainer.current.value = main_character? main_character : ""
  },[])

  const toPublish = (event) => {
    event.preventDefault()
    if(currentUser !== null) {
        upload().then(res => {
          const imageUrl = res
          axios({
            method:'put',
            url:'post',
            data:{
                author_id: `${currentUser.id}`,
                category: 'picture',
                title: `${titleContainer.current.value}`,
                main_character:`${characterContainer.current.value}`,
                imageUrl: `${imageUrl}`,
                publish_date: `${formatDateTime()}`
            }
            }).then(res => {
                navigate("../")
            }).catch(err => {
                console.log(err)
            })
        })
        
    } else {
        // if not logged in...
        navigate("../login", {state:{
            from:location.pathname, 
            title: titleContainer.current.value, 
            main_character: characterContainer.current.value,
        }})
      }
  }

  const handleUpload = (e) => {
    setImage(e.target.files[0])
  }

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      const res = await axios.post('upload', formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className='flex flex-col justify-around flex-none w-4/5 h-2/5 mx-auto mt-16 px-20 ' encType='multipart/form-data'>
            <input ref={titleContainer} type="text" name="imageTitle" placeholder='Title' required className=' outline-none px-5 py-2 rounded-lg '/>
            
            <input type="text" ref={characterContainer} name="imageMainCharacter" placeholder='Main Character' required className=' outline-none px-5 py-2 rounded-lg'/>
            
            {/* upload picture */}
            <div className='flex felx-col items-center'>
              <input type="file" accept="image/*" name="imageMain" id='imageFile'className='hidden' required onChange={handleUpload}/>
              <label htmlFor="imageFile" 
              className='mr-5 bg-teal-700 text-teal-100 rounded-xl py-2 px-3 text-center w-3/12 cursor-pointer'>
                Choose Image
              </label>
              <p>{image == null? '':image.name}</p>
            </div>
            
            <div className='flex flex-row justify-end space-x-5 [&_*]:px-2 [&_*]:py-1 [&_*]:rounded-md [&_*]:cursor-pointer [&_*]:bg-opacity-60 [&_*]:shadow-xl'>
                <Link to='/' className='bg-gray-500'>Cancel</Link>
                <button className='bg-teal-700' onClick={toPublish}>Publish</button>
            </div>
            
    </form>
  )
}
