import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css"

export default function Signup({ setUser }) {

  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("https://synapseai-backend-production.up.railway.app/api/signup",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      credentials:"include",
      body: JSON.stringify({ name,email,password })
    });

    const data = await res.json();

    if(data.success){
      setUser(data.name);
      navigate("/chat");
    } else {
      alert("Signup failed");
    }
  }

  return (
    <div className="signupForm">
      <h1>Signup</h1>

      <form onSubmit={handleSignup} className="form2">
        <label>Name :</label>
        <input 
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="SignupInput"
        />
         <label>Email :</label>
        <input 
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="SignupInput"
        />
         <label>Password :</label>
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="SignupInput"
        />
        <button type="submit" className="btnSub">Signup</button>
      </form>

      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}