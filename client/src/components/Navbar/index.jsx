import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsTelegram, BsInstagram, BsWhatsapp, BsSearch } from 'react-icons/bs'
import {AiOutlineLogin} from 'react-icons/ai'
import { AuthContext } from '../../context/authContext'
import { Badge } from 'antd'
import {NotificationFilled} from '@ant-design/icons'


export default function Navbar() {
  const [ins] = React.useState("emrys_4x4x")
  const [tele] = React.useState("@emrys_44")
  const [whatsapp] = React.useState("########")
  const [copySuccess] = React.useState("copied to clipboard!")
  const copySuccessNode = React.useRef()

  const {currentUser} = React.useContext(AuthContext)

  const naviagte = useNavigate()
  
  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data)
    copySuccessNode.current.className='animate-fade'
    setTimeout(() => {
      copySuccessNode.current.className='text-transparent'
    }, 1500);
  }
  const gotoPersonal = () => {
      naviagte('../Personal')
  }
  return (
    <div className='w-screen h-20 bg-black flex flex-none flex-row justify-center items-center'>
      <div className='basis-9/12 h-full flex flex-row text-white justify-between items-center text-4xl'>
        <Link to="/" className='cursor-pointer' ><p className=' italic' >WordSmith</p></Link>
        <div className='basis-4/12 flex flex-row justify-between items-center [&>div]:cursor-pointer' >
          <div>
            <Link to="/search" className='hover:text-pink-600' ><BsSearch/></Link>
          </div>
          <div className='flex relative'>
            <Badge count={99} overflowCount={10}>
              <NotificationFilled className='text-white' style={{fontSize: 36,}}/>
            </Badge>
          </div>
          <div onClick={()=>{copyToClipboard(ins)}} className="hover:text-fuchsia-800" ><BsInstagram/></div>
          <div onClick={()=>{copyToClipboard(tele)}} className="hover:text-sky-500"><BsTelegram /></div>
          <div onClick={()=>{copyToClipboard(whatsapp)}} className="hover:text-lime-500" ><BsWhatsapp/></div>
          {
          currentUser == null? <Link to="/login" className='cursor-pointer'>
            <div className='cursor-pointer'>
              <AiOutlineLogin className='hover:text-sky-700'/>
            </div>
          </Link>
          :
          <div className='h-[36px] w-[36px] rounded-full overflow-hidden' onClick={gotoPersonal}>
            {currentUser.avatar == null?
              <div className='h-full w-full bg-gray-400 '></div>
              :
              <img src={currentUser.avatar} alt="USER" />
            }
          </div>
          }  
        </div> 
      </div>
      <div className='float-right ' >
        <div className='text-transparent' ref={copySuccessNode}>
          <p className='text-sm ml-10' >{copySuccess}</p>
        </div>
      </div>
    </div>
  )
}
