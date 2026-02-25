import './App.css'
import Sidebar from "./Sidebar2.jsx";
import ChatWindow  from './ChatWindow.jsx';
import { MyContext } from './MyContext.jsx';
import {  useState,useEffect } from 'react';
import {v1 as uuidv1} from "uuid";
import Home from "./Home.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [propmt,setPropmt]=useState("");
  const [replay,setReplay]=useState(null);
  const [currThreadId,setCurrThreadId]=useState(uuidv1());
  const [prevChats,setPrevChats]=useState([]);
  const [newChats,setNewChats]=useState(true);
  const [allthreats,setAllThreats]=useState([]);
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const [open,setOpen] = useState(false);
  
useEffect(()=>{
    fetch("http://localhost:8111/api/current-user",{
    credentials:"include"
    })
    .then(res => res.json())
    .then(data => {
      if(data.loggedIn){
          setUser(data.name);
      }
      setLoading(false);
    });
  },[])

   console.log("USER:", user);

   if(loading){
      return <div>Loading...</div>
    }



  const providerValue ={
    propmt,setPropmt,
    replay,setReplay,
    currThreadId,setCurrThreadId,
    newChats,setNewChats,
    prevChats,setPrevChats,
    allthreats,setAllThreats,
    user,setUser
  };

return(
  <div className="app">

    <Routes>

      {/* Landing / Login */}
      <Route 
        path="/" 
        element={<Home setUser={setUser} />} 
      />
       {/* Login Page */}
      <Route 
        path="/login" 
        element={<Login setUser={setUser} />} 
      />

      {/* Signup Page */}
      <Route 
        path="/signup" 
        element={<Signup setUser={setUser} />} 
      />

      {/* Chat Page */}
      <Route 
      path="/chat" 
      element={
        <ProtectedRoute user={user}>
          <MyContext.Provider value={providerValue}>

          <div className="chatLayout">
            {/* Humburgur */}
          <button className='humburger' onClick={() => setOpen(prev => !prev)}><i class="fa-solid fa-bars"></i></button>
          {/* sidebar */}
              <Sidebar user={user} open={open} setOpen={setOpen}/>

              <ChatWindow/>
          </div>
        </MyContext.Provider>
        </ProtectedRoute>
      } 
    />

    </Routes>

  </div>
)}

export default App;
