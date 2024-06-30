import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/home' element={<Dashboard />} />
      </Routes>

    </BrowserRouter>


  </>
}

export default App