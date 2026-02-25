import "./ChatWindow.css"
import Chat from "./Chat"
import { MyContext } from "./MyContext"
import { useContext, useState,useEffect } from "react"
import {RingLoader} from "react-spinners"
import { useNavigate } from "react-router-dom";

export default function ChatWindow(){
    const {propmt,setPropmt,replay,setReplay,currThreadId,prevChats,setPrevChats,setUser} = useContext(MyContext);
    const [loading,setLoading]=useState(false);//For Loader
    const [isOpen,setIsOpen]=useState(false);//for frop down ---after wards false

    // const navigate = useNavigate();


    let getreplay =async ()=>{
        setLoading(true)
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                messages:propmt,
                threadId:currThreadId
            })
        };

        try{
            const response  = await fetch("https://synapseai-backend-production.up.railway.app/api/chat",{
                            ...options,
                            credentials:"include"
                            });
            const data  = await response.json();
            console.log(data )
            setReplay(data.AiReplay);
            
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to prevChats
    useEffect(()=>{
        if(propmt && replay){
            setPrevChats(prevChats =>[
                ...prevChats,
                {
                    role:"user",
                    content:propmt
                },{
                    role:"assistant",
                    content:replay
                }
            ]);
            setPropmt("")
        }

        
    },[replay])

    //handle profile toggle
    let handleProfile =()=>{
        setIsOpen(!isOpen)
    }
    //handle logout
    let logout =async ()=>{
        await fetch("https://synapseai-backend-production.up.railway.app/api/logout",{
            method:"POST",
            credentials:"include"
        });
        setUser(null);//clear logged
        window.location.href = "/"; 
    }



     return(
    <div className="chatwindow">

        <div className="navbar">
        <span className="Name" >SynapseAi&nbsp;</span>
        <span><i className="fa-solid fa-user"onClick={handleProfile}></i></span>
        </div>
        {isOpen &&
        <div className="dropDown">
            {/* <div className="dropDownItem"><i className="fa-solid fa-arrow-up-right-from-square"></i>Upgrade Plan</div>
            <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div> */}
            <div className="dropDownItem"onClick={logout}><i className="fa-solid fa-right-from-bracket" ></i>Logout</div>
            </div>}


        <div className="chatArea">
        <Chat />
        {loading && (
        <div className="loaderWrapper">
        <RingLoader color="white" size={40} />
        </div>
        )}
        </div>

        

        <div className="chatInput">
        <div className="userInput">
        <input placeholder="Ask Anything" className="input" value={propmt} 
            onChange={(e)=>setPropmt(e.target.value)} onKeyDown={(e)=>e.key=='Enter'?getreplay():''}></input>

        <div id="submit"onClick={getreplay}><i className="fa-solid fa-paper-plane" ></i></div>

        </div>
        <p className="info">SynapseAi can make mistakes. Check important info. See Cookie Preferences.</p>
        </div>
    </div>
        
    )

}