import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css"
import { apiUrl } from "./api";
import Toast from "./Toast";

export default function Signup({ setUser }) {

  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [toast,setToast] = useState(null);
  const [submitting,setSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    try {
      const res = await fetch(apiUrl("/api/signup"),{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        credentials:"include",
        body: JSON.stringify({ name,email,password })
      });

      const data = await res.json();

      if(data.success){
        setUser(data.name);
        setToast({
          type: "success",
          title: "Account created",
          message: "Your workspace is ready."
        });
        setTimeout(() => navigate("/chat"), 900);
      } else {
        setToast({
          type: "error",
          title: "Signup failed",
          message: data.message || "Please check your details and try again."
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
    <div className="signupForm">
      <Toast {...toast} />
      <h1>SignUp</h1>

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
        <button type="submit" className="btnSub" disabled={submitting}>
          {submitting ? "Creating..." : "SignUp"}
        </button>
      </form>

      <p className="loginLink">
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
