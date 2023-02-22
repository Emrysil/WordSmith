import React, { useEffect } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
const Text = ({formatDateTime}) => {
    const titleContainer = React.useRef()
    const characterContainer = React.useRef()
    const textContainer = React.useRef()

    const navigate = useNavigate()
    const location = useLocation()

    const {currentUser} = React.useContext(AuthContext)

    const toPublish = (event) => {
        event.preventDefault()
        if(currentUser !== null) {
            axios({
                method:'put',
                url:'post',
                data:{
                    author_id: `${currentUser.id}`,
                    category: 'text',
                    title: `${titleContainer.current.value}`,
                    main_character:`${characterContainer.current.value}`,
                    text_content: `${textContainer.current.value}`,
                    publish_date: `${formatDateTime()}`
                }
            }).then(res => {
                navigate("../")
            }).catch(err => {
                console.log(err)
            })
        } else {
            // if not logged in...
            navigate("../login", {state:{
                from:location.pathname, 
                title: titleContainer.current.value, 
                main_character: characterContainer.current.value,
                text_content: textContainer.current.value
            }})
        }
    }

    useEffect(() => {
        const {title, main_character, text_content} = location.state
        titleContainer.current.value = title? title : ""
        characterContainer.current.value = main_character? main_character : ""
        textContainer.current.value = text_content? text_content : ""
    },[])

    return (
        <form className='flex flex-col justify-around flex-none w-4/5 h-4/5 mx-auto mt-16 px-20 '>
            
            <input ref={titleContainer} type="text" name="textTitle" placeholder='Title' required className=' outline-none px-5 py-2 rounded-lg '/>
            
            <input type="text" ref={characterContainer} name="textMainCharacter" placeholder='Main Character' required className=' outline-none px-5 py-2 rounded-lg'/>
            
            <textarea ref={textContainer} className='basis-9/12 bg-white p-10 rounded-lg '/>

            <div className='flex flex-row justify-end space-x-5 [&_*]:px-2 [&_*]:py-1 [&_*]:rounded-md [&_*]:cursor-pointer [&_*]:bg-opacity-60 [&_*]:shadow-xl'>
                <Link to='/' className='bg-gray-500'>Cancel</Link>
                <button className='bg-teal-700' onClick={toPublish}>Publish</button>
            </div>
            
        </form>
    )
} 

export default Text