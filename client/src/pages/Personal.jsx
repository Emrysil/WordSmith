import axios from 'axios'
import {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { message, Popconfirm, Avatar, Image } from 'antd'
import {UserOutlined} from '@ant-design/icons'

// personal homepage
export default function Personal() {

  const {currentUser, logout} = useContext(AuthContext)
  const {id, username, avatar} = currentUser
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios({
      method:'get',
      url:'post',
      params:{
        searchBy:'author',
        keyword: `${username}`
      }
    })
    .then(res => {
      console.log(res.data)
      const arr = res.data
      arr.sort((a,b) => {return b.post_id - a.post_id})
      setPosts(arr)
    })
    .catch(err => console.log(err))
  }, [])

  const handleDeleteAll = () => {
    axios({
      method:'delete',
      url: 'post',
      params: {
        post_id: -1,
        author_id:`${id}`
      }
    }).then(res => {
      setPosts([])
    })
  }
  const cancel = (action) => {
    message.error(action + ' Cancelled');
  };
  
  const handleDelete = (post_id) => {
    axios({
      method:'delete',
      url:'post',
      params: {
        post_id:`${post_id}`,
        author_id:`${id}`
      }
    })
    .then(res => {
      message.success("Delete Successful")
      console.log(res.data)
      const arr = res.data
      arr.sort((a,b) => {return b.post_id - a.post_id})
      setPosts(arr)
    })
  }

  const handleLogout = () => {
    logout()
    navigate("../")
  }
  
  return (
    <div className='flex flex-col w-5/12 m-auto justify-between bg-slate-900 h-full overflow-y-scroll' >
      {/* header */}
      <div className='basis-2/12 bg-white rounded-lg flex flex-row justify-around px-10 py-5 space-x-5'>
        {/* avatar */}
        <div>
          {avatar == null?
              <Avatar size={96} icon={<UserOutlined />} />
              // <div className='h-full w-full bg-gray-400 '></div>
              :
              <img src={currentUser.avatar} alt="USER" className = 'h-full aspect-square rounded-full overflow-hidden'/>
          }
        </div>
        {/* username */}
        <div className='basis-9/12 flex-col space-y-5'>
            <p className='text-2xl italic font-semibold'>{username}</p>

            <div>
              <p className='text-zinc-600 italic'>This user is kinda lazy</p>
            </div>

            <div>
              <Popconfirm
                title="Delete all posts" description="Are you sure to delete all posts?"
                onConfirm={handleDeleteAll}
                onCancel={() => cancel('Deletion')}
                okText="Yes" okType='default'
                cancelText="No">
                <a href="#" className='px-3 py-2 bg-red-600 bg-opacity-90 rounded-xl text-white'>Delete ALL Posts</a>
              </Popconfirm>
              <Popconfirm
                title="Log Out"
                description="Are you sure to log out?"
                onConfirm={handleLogout}
                onCancel={() => cancel('Log Out')}
                okText="Yes" okType='default'
                cancelText="No">
                <a href="#" className='px-3 py-2 bg-red-600 bg-opacity-90 rounded-xl text-white ml-3'>Log Out</a>
              </Popconfirm>
            </div>
            
        </div>
      </div>
      {/* ------- end of header ------ */}

      {/* published articles */}
      <div className='basis-9/12 bg-white rounded-lg p-5 flex flex-col overflow-y-scroll'>
        {
          posts && posts.map(x => {
            return (
              <div key={x.post_id} className='flex flex-row justify-between mb-10'>
                
                {/* post date */}
                <div className='basis-1/12'>
                  <div className='h-24 aspect-square border-gray-400 border-8 rounded-full flex flex-col justify-center items-center'>
                    <p className='font-mono text-gray-400 text-2xl'>{`${x.publish_date.substring(8,10)}/${x.publish_date.substring(5,7)}`}</p>
                  </div>
                </div>

                {/* vertical rule */}
                <div className='basis-[1px] bg-slate-400'></div>
                
                {/* post content */}
                <div className='basis-10/12 flex flex-col space-y-2'>

                  <div className='flex flex-row justify-between'>
                    <p className='text-3xl'>{x.title}</p>
                    <Popconfirm 
                      title="Delete the post" description="Are you sure to delete this post?"
                      onConfirm={() => handleDelete(x.post_id)} onCancel={() => cancel('Deletion')}
                      okText="Yes" okType='default'
                      cancelText="No">
                      <a href="#" className='bg-red-600 px-3 text-white rounded-xl py-2'>Delete</a>
                    </Popconfirm>
                  </div>
                  {
                    (
                      x.category == 'text'
                      ? <p className='text-gray-500'>{x.text_content}</p>
                      : <Image width={300}
                      src={`/publications/${x.imageUrl}`}
                      />
                      )
                  }
                  
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
