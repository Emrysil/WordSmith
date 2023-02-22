import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export default function Login() {
  const [inputs, setInputs] = React.useState({
    username:"",
    password:""
  })

  const [error, setError] = React.useState(null)

  const navigate = useNavigate()
  
  const location = useLocation()

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  const {login} = React.useContext(AuthContext)

  const handleSubmission = async (e) => {
    e.preventDefault()
    login(inputs)
      .then(res => {
        if(location.state!==null && location.state.from!==null){
          const {from, ...other} = location.state
          navigate(`..${from}`, {state:{...other}})
        } else {
          navigate('../')
        }
      })
      .catch(err => {
        console.log("entering catch block")
        setError(err.response.data)
    })

    
  }
  
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-4xl -mt-36 text-white'>Welcome to WordSmith</h1>
      <h3 className='mb-10 text-white italic'>A free space for content creators</h3>
      <form className='flex flex-col basis-60 items-center justify-around p-6 bg-white rounded-md'>
        <div className='flex flex-row'>
          <input onChange={handleChange} type="text" name="username" className="border rounded-2xl border-slate-300 outline-none px-3 py-1" placeholder='username'/>
        </div>
        <div className='flex flex-row'>
          <input onChange={handleChange} type="password" name='password' className='border rounded-2xl border-slate-300 outline-none px-3 py-1' placeholder='password'/>
        </div>
        {error && <p className='text-red-700'>{error}</p>}
        <div className='flex flex-row justify-center'>
          <button onClick={handleSubmission} className='bg-teal-600 py-2 px-24 text-white rounded-2xl cursor-pointer'value="Login">Login</button>
        </div>
        <div className='-mb-5'>
          <p className='italic'>No account? Sign up <Link to="/register" className='underline underline-offset-2'>here</Link></p>
        </div>
      </form>
    </div>
  )
}
