import React from 'react'
import Navbar from './components/Navbar'
import Article from './pages/Article'
import Compose from './pages/Compose'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import SearchResults from './pages/SearchResults'
import Personal from './pages/Personal'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/article",
        element:<Article/>
      },
      {
        path:"/compose",
        element:<Compose/>
      },
      {
        path:"/search",
        element:<Search/>
      },
      {
        path:"/search_results",
        element:<SearchResults/>
      },
      {
        path: "/personal",
        element: <Personal/>
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
])

export default function app() {
  return (
    <div className='flex flex-row justify-center h-screen'>
      <div className="flex flex-col relative basis-full h-screen bg-Edward bg-cover bg-fixed font-mono">
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

