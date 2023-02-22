import React from 'react'
import { useLocation } from 'react-router-dom'
import Video from '../components/Video'
import Text from '../components/Text'
import Picture from '../components/Picture'
export default function Compose() {
  const location = useLocation()
  const [contentType] = React.useState(location.state===null?'text':location.state.contentType)

  const formatDateTime = () => {
    const currentTime = new Date().toLocaleTimeString()
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = currentDate.getDate()
    day = day < 10 ? '0' + day : day
    return year + '-' + month + '-' + day + ' ' + currentTime
  }

  const renderComponent = (param) => {
    switch (param) {
      case 'video':
        return <Video formatDateTime={formatDateTime}/>
      case 'picture':
        return <Picture formatDateTime={formatDateTime}/>
      default:
        return <Text formatDateTime={formatDateTime}/>
    }
  }

  return (
    <div className=' w-7/12 h-screen mx-auto'>
      <div className='flex flex-col w-full h-screen justify-start'>
        {
          renderComponent(contentType)
        }
      </div>
    </div>
  )
}
