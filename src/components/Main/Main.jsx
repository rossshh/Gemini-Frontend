import React, { useContext } from 'react'
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { NavLink } from 'react-router-dom';
import Login from '../../pages/Login';

function Main() {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,user}=useContext(Context);

  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
        </div>
        <div className="main-container">

        {!showResult ?
            <>
            <div className="greet">
                <p><span>Hello,{user.name}</span></p>
                <p>How can i help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest Beautiful Places to see on an upcoming road trip</p>
                    <img src={assets.compass} alt="" />
                </div>
                <div className="card">
                    <p>Briefly Summarize this concept: urban planning</p>
                    <img src={assets.lightbulb} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of this code</p>
                    <img src={assets.code} alt="" />
                </div>
            </div>
            </>
            :<div className='result'>
                <div className="result-title">
                    <img src={assets.user} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini} alt="" />
                    {loading? 
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div> 
                    : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                </div>
            </div>
        }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
                    <div>
                        <img src={assets.gallery} alt="" />
                        <img src={assets.mic} alt="" />
                        {input? <img onClick={()=>onSent()} src={assets.send} alt="" />:null}
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini may display inaccurate info, including about people, so double-check its results if it's important.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main;