import "./Sidebar2.css"
import {  useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";

function Sidebar2({user, open, setOpen}){
    const {allthreats,setAllThreats,currThreadId,setNewChats,setPropmt,setReplay,setCurrThreadId,setPrevChats}=useContext(MyContext);

    const getAllThreads =async()=>{
        try{
            const res =await fetch("https://synapseai-backend-production.up.railway.app/api/thread",{credentials:"include"});
            const res2 =await res.json();
            const filter = res2.map(thread=>({thread:thread.threadId,
                                            title:thread.title
            }))
            console.log(res2)
            setAllThreats(filter)
            //threadId.title


        }catch(err){
            console.log(err)
        }
    }

    //click on logo or new chat then new chat appers 
    let newChat =()=>{
        setNewChats(true);
        setPropmt(" ");
        setReplay(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    //click and show the past history of spcific chat
    let changethread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    setOpen(false);   // ⭐ ADD THIS LINE HERE
    try {
        const response = await fetch(`https://synapseai-backend-production.up.railway.app/api/thread/${newThreadId}`,{credentials:"include"});
        const data = await response.json();

        setPrevChats(data);   //show old messages
        setNewChats(false);   //to remove the text start new chat
        
        // console.log("Thread data:", data);
        // console.log("Is array?", Array.isArray(data));
    } catch (err) {
        console.log(err);
    }
    
};

    useEffect(()=>{
        getAllThreads();
    },[currThreadId])

    //Delete Thread
    let deleteThread =async(threadId)=>{
        try{
            const res =await fetch(`https://synapseai-backend-production.up.railway.app/api/thread/${threadId}`,{method:"DELETE",credentials:"include"})
            const res2 =await res.json();
            console.log(res2);

            //updated thread re-render
            setAllThreats(prev => prev.filter(thread=>thread.thread!==threadId));

            if(threadId ===currThreadId){
                newChat();
            }
            }catch(err){
                console.log(err)
            }
        }



        

    return(
        <>
        <section className={`sidebar ${open ? "show" : ""}`}>

            {/* new chat button */}
            
            <button className="button2" onClick={newChat}>
                <img src="/logo2.png" alt="logo" className="logo" ></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>


            {/* history */}
            {/* <ul className="history">
                {
                    allthreats?.map((thread,idx)=>{
                       return <li key={idx} onClick={(e)=>changethread(thread.threadId)}>
                        {thread.title}</li>
                    })
                }
            </ul> */}

            <ul className="history">
            {allthreats?.map((thread) => (
                <li
                key={thread.thread}
                onClick={() => changethread(thread.thread)}
                className={thread.thread ==currThreadId?"highlighted":" "}//Highlight current thread
                >
                {thread.title}
                <i className="fa-regular fa-trash-can"
                onClick={(e)=>{
                    e.stopPropagation();
                    deleteThread(thread.thread);
                }}></i>
                </li>
            ))}
            </ul>

            
            {/* sign */}
            <div className="sign">
                <p>Hello, {user} </p>
            </div>

        </section>

        {open && (
            <div className="overlay show" onClick={()=>setOpen(false)}></div>
        )}
        </>
    )
}

export default Sidebar2;