import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Register() {
  const [inputs, setInputs] = React.useState({
    username:"",
    email:"",
    password:""
  })

  const [error, setError] = React.useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmission = async (e) => {
    e.preventDefault()
    axios.post('/auth/register', inputs)
      .then(res => {
        navigate("/login", {replace:true})
      })
      .catch(err => {
        setError(err.response.data)
      })
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-4xl -mt-32 text-white italic'>Welcome to WordSmith</h1>
      <h3 className=' mb-10 text-white'>A free space for content creators</h3>
      <form className='flex flex-col basis-80 items-center justify-around p-6 bg-white rounded-md'>
        <div className='flex flex-row'>
          <input onChange={handleChange} required type="text" name="username" className="border rounded-2xl border-slate-300 outline-none px-3 py-1" placeholder='username'/>
        </div>
        <div className='flex flex-row'>
          <input onChange={handleChange} required type="password" name='password' className='border rounded-2xl border-slate-300 outline-none px-3 py-1' placeholder='password'/>
        </div>
        <div className='flex flex-row'>
          <input onChange={handleChange} required type="email" name='email' className='border rounded-2xl border-slate-300 outline-none px-3 py-1' placeholder='email'/>
        </div>
        <div className='flex flex-row justify-center'>
          <button onClick={handleSubmission} className='bg-teal-600 py-2 px-20 text-white rounded-2xl cursor-pointer'>Register</button>
        </div>
        {error && <p className='text-red-700 '>{error}</p>}
        <div className='-mb-5 flex flex-col items-center'>
          <p className='italic'>Already have an account?</p>
          <p>Log in <Link to="/login" className='underline underline-offset-2'>here</Link></p>
        </div>
      </form>
    </div>
  )
}