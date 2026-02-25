import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"

export default function Login({ setUser }) {

  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8111/api/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      credentials:"include",
      body: JSON.stringify({ email,password })
    });

    const data = await res.json();

    if(data.success){
      setUser(data.name);
      navigate("/chat");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="MainLogin">
      <h1>Login</h1>
    <div className="login">
      <form onSubmit={handleLogin} className="form1">
        <label>Email :</label>
        <input 
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="loginInput"
        />
        <label>Password :</label>
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="loginInput"
        />
        <button type="submit"className="input2">Login</button>
      </form>
    </div>

      <p className="way">
        Don't have account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  )
}