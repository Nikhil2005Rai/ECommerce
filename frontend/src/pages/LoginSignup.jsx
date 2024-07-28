import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Signup" ? (
            <input type="text" placeholder="Your name" />
          ) : (
            <></>
          )}
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        {state === "Signup" && (
          <p className="loginsignup-login">
            Already have an account? <span onClick={()=>setState("Login")}>Login here</span>
          </p>
        )}
        {state === "Login" && (
          <p className="loginsignup-login">
            Create an account? <span onClick={()=>setState("Signup")}>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the term of use & prvacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
