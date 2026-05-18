import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"
import { apiUrl } from "./api";
import Toast from "./Toast";

export default function Login({ setUser }) {

  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [toast,setToast] = useState(null);
  const [submitting,setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    try {
      const res = await fetch(apiUrl("/api/login"),{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        credentials:"include",
        body: JSON.stringify({ email,password })
      });

      const data = await res.json();

      if(data.success){
        setUser(data.name);
        setToast({
          type: "success",
          title: "Welcome back",
          message: "You are signed in successfully."
        });
        setTimeout(() => navigate("/chat"), 850);
      } else {
        setToast({
          type: "error",
          title: "Login failed",
          message: data.message || "Please check your email and password."
        });
      }
    } catch (err) {
      console.log(err);
      setToast({
        type: "error",
        title: "Connection issue",
        message: "Please try again in a moment."
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="MainLogin">
      <Toast {...toast} />
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
        <button type="submit"className="input2" disabled={submitting}>
          {submitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>

      <p className="way">
        Don't have account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  )
}
