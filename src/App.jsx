import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Login from './pages/Login'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App