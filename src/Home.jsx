import { motion } from "motion/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Home.css"

export default function Home({setUser}){
    const [showAuth,setShowAuth] = useState(false);//show lanidng page, true show login/sign up
    const navigate = useNavigate();

    const item = {
    hidden: { opacity: 0, y: -50 },
    show: { opacity: 1, y: 0 }

    
}

    return(
        <> 
            <motion.div className="HomeNavbar">   
                    <h1  className="logo">Synapse Ai</h1>
            </motion.div>

            <motion.div className="bgImage"
            initial={{opacity:0,x:200}}
            animate={{opacity:0.45,x:0}}
            transition={{duration:1.5}}>
            <img src="sss.png" />
            </motion.div>

            <motion.div className="HomeMain">
                <motion.div className="heroContent"
                initial={{opacity:0 ,y:40}}
                animate={{opacity:1,y:0}}
                transition={{ duration: 0.8 }}>
                <p>
                An AI-powered chat assistant built to simplify conversations, 
                accelerate learning, and enhance productivity — 
                all in one seamless experience.
                </p>
                <motion.button className="heroBtn"
                initial={{opacity:0,y:30}}
                animate={{opacity:1,y:0}}
                transition={{delay:0.4,duration:0.6}}
                onClick={()=> navigate("/chat")}>Get Started</motion.button>
                 </motion.div>  
            </motion.div>

        </>
    )
}