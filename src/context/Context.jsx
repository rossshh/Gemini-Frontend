import {createContext, useEffect, useState} from 'react';
import run from '../config/gemini';

export const Context= createContext();

const ContextProvider=(props)=>{

    const [token, setToken]=useState(localStorage.getItem('token'));
    const [user,setUser]=useState("");
    const [input,setInput]=useState("");
    const [recentPrompt, setRecentPrompt]=useState("");
    const [prevPrompts, setPrevPrompts]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");
    const authorizationToken=`Bearer ${token}`;

    const delayPara=(index,nextWord)=>{
        setTimeout(function() {
            setResultData(prev=>prev+nextWord)
        }, 75*index);
    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt != undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts((prev) => [...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }
    
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 != 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "<b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br/>");
        let finalResponse = newResponse2.split(" ");
        
        for (let i = 0; i < finalResponse.length; i++) {
            const nextWord = finalResponse[i];
            delayPara(i, nextWord + " ")
        }
        setLoading(false)
        setInput("")
    }

    //JWT AUTHENTICATION
    const storeTokenInLS=(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem('token',serverToken);
    }

    const userAuthorization=async()=>{
        try {
            const response=await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                    "Authorization":authorizationToken,
                }
            });
            if(response.ok)
            {
                const data=await response.json();
                console.log("User Data",data.userData);
                setUser(data.userData);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{
        userAuthorization();
    },[]);

    //LOGOUT 
    const isLoggedIn=!!token;
    const logout=()=>{
        setToken("");
        return localStorage.removeItem('token');
    }
        
    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        storeTokenInLS,
        user,
        logout,
        isLoggedIn
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
};

export default ContextProvider;