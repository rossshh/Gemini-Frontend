import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Main from '../components/Main/Main';
function Home() {
  return (
    <div className='homepage'>
        <Sidebar />
        <Main />
    </div>
  )
}

export default Home