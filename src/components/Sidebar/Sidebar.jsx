import React, { useContext, useState } from 'react'
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate=useNavigate();
    const [extended,setExtended]=useState(false);
    const {onSent, prevPrompts,setRecentPrompt,newChat,logout,isLoggedIn}=useContext(Context);

    const handleLogout=()=>{
        logout();
        navigate('/login');
    }

    const loadPrompt=async(prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <img className='menu' onClick={()=>setExtended(prev=>!prev)} src={assets.more} alt="" />
            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.add} alt="" />
                {extended ?<p>New Chat</p> : null}
            </div>
            {extended ?
            <div className="recent">
                <p className="recent-title">Recents</p>
                {
                    prevPrompts.map((item,index)=>{
                        return(
                            <div onClick={()=>loadPrompt(item)} className="recent-entry">
                                <img src={assets.message} alt="" />
                                <p>{item.slice(0,18)}...</p>
                            </div>
                        )
                    })
                }
            </div> 
            : null
            }
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question} alt="" />
                {extended ?<p>Help</p> :null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history} alt="" />
                {extended ? <p onClick={handleLogout}>{isLoggedIn ? 'Logout':'Login'}</p> :null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.settings} alt="" />
                {extended ? <p>Settings</p> :null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar