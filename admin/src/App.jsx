import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  return (
    <div className='min-h-screen'>
      <ToastContainer position='bottom-right' hideProgressBar theme='light' />
      {token === ""
        ? <Login setToken={setToken} />
        : (
          <div className='flex min-h-screen'>
            <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setToken={setToken} />

            <div className='flex min-w-0 flex-1 flex-col lg:pl-60'>
              <NavBar setToken={setToken} onMenu={() => setSidebarOpen(true)} />

              <main className='flex-1 px-4 py-8 sm:px-6'>
                <div className='mx-auto w-full max-w-6xl'>
                  <Routes>
                    <Route path='/' element={<Navigate to='/list' replace />} />
                    <Route path='/add' element={<Add token={token} />} />
                    <Route path='/list' element={<List token={token} />} />
                    <Route path='/orders' element={<Orders token={token} />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App
