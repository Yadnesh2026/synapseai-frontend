import "./Chat.css"
import { useContext, useState,useEffect } from "react"
import { MyContext } from "./MyContext"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

//react-markdown
//rehype-highlight

export default function Chat(){
    const {newChats,prevChats,replay} =useContext(MyContext);
    const [latestReplay,setLatestReplay] =useState(null)

    useEffect(()=>{///PRINT IN INDIUVAL WORD IN LATEST REPLAY
        if(!prevChats?.length || !replay) return;

        const content =replay.split(" ");//INDIVIUAL WORDS
        let idx=0;
        const interval =setInterval(()=>{
            setLatestReplay(content.slice(0,idx+1).join(" "));

            idx++;
            if(idx>=content.length) clearInterval(interval);
        },40)
        return ()=>clearInterval(interval)

    },[prevChats,replay])
    return(
        <>
        {/* {newChats && <h1>Start a new Chat</h1>} */}

        <div className="chats">
            {newChats && (
                <div className="emptyState">
                    <h1>Start a new Chat</h1>
                </div>
            )}
            {
                prevChats?.slice(0,-1).map((chat,idx)=>
                <div className={chat.role==="user"?"userDiv":"gptDiv"} key={idx}>
                    {
                    chat.role ==="user"?
                        <p className="userMessage">{chat.content}</p>:
                    <div className="gptMessage">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                    </div>
                    }
                </div>
            )
            }
            {
            prevChats.length>0 && latestReplay !==null &&
            <div className="gptDiv" key={"typing"}>
                <div className="gptMessage">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {latestReplay}
                    </ReactMarkdown>
                </div>
            </div>
            }
            {/* for not priting the chat in type words again on tap on history---
            we can also write this isn ternory operator as latestchat ===null: */}
            {
            prevChats.length>0 && latestReplay ===null &&
            <div className="gptDiv" key={"non-typing"}>
                <div className="gptMessage">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {prevChats[prevChats.length-1].content}
                    </ReactMarkdown>
                </div>
            </div>
            }
            {/* <div className="userDiv">
                <p className="userMessage">User Msg</p>
            </div>

            <div className="gptDiv">
                <p className="gptMessage">GPT Geneate Msg</p>
            </div> */}
        </div>
        </>
    )
}