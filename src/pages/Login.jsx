import React, { useContext, useState } from "react";
import "./auth.css";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

function Login() {
  const {storeTokenInLS}=useContext(Context);
  const navigate=useNavigate();
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name:"",
    email: "",
    password: "",
  });
  const [user, setUser] = useState({ 
    name:"",
    email: "",
    password: "",
  });
 

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
      otp:e.target.value,
    });
    setOtp(e.target.value);
  };
  const handleSendOtp = async () => {
    try {
      const response = await fetch("https://nodeservermern.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        setUser({ ...user, otp: data.otp });
        setOtpSent(true);
        toast.success("OTP sent successfully");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("https://nodeservermern.onrender.com/api/auth/register/api/auth/verify-otp", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        setSignupData({ name: "", email: "", password: "" });
        storeTokenInLS(data.token);
        toast.success("Registration Successful");
        navigate("/");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error("Invalid Registration");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    if (isLogin) {
      try {
        const response = await fetch("https://nodeservermern.onrender.com/api/auth/login", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(user),
        });
        if (response.ok) {
          const data = await response.json();
          setLoginData({ email: "", password: "" });
          storeTokenInLS(data.token);
          toast.success("Login Success");
          navigate("/");
        } else {
          toast.error("Invalid Credentials")
        }
      } catch (error) {
        console.error(error);
      }
    } 
    else {
        if (otpSent) {
          handleVerifyOtp();
        } else {
          handleSendOtp();
        }
    };
  };
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="login-form-container">
        <h1 style={{ textAlign: "center", marginTop: "40px" }}>
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="auth-credentials">
            <div className="auth-login-credentials">
            {!isLogin ? <>
              <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  value={user.name}
                  onChange={handleInput}
                  required
                /> 
              </>: null}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={user.email}
                onChange={handleInput}
                required
              />
            </div>
            <div className="auth-login-credentials">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={user.password}
                onChange={handleInput}
                autoComplete="off"
                required
              />
            </div>
            {!isLogin && !otpSent &&(
              <button onClick={handleSubmit} style={{display:"flex",justifyContent:"flex-end",borderWidth:'0',cursor:'pointer',backgroundColor:'transparent'}}>send otp</button>
            )}
            {otpSent ? (
            <>
              <p>Otp sent successfully</p>
              <div className="auth-login-credentials">
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              </>
            ):null
            }
            {isLogin ? (
              <button type="submit" className="auth-submit-button">
                Login
              </button>
            ) : (
              <button type="submit" className="auth-submit-button">
                Sign Up
              </button>
            )}
            
            <div className="auth-footer">
              <a href="#" className="footer-buttons">
                Forgot Password ?
              </a>
              <a href="#" className="footer-buttons" onClick={handleToggle}>
                {isLogin ? "New User ?" : "Login ?"}
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;