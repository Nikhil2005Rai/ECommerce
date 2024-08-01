import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate(); // Use navigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // console.log("Form submitted", {
    //   username,
    //   email,
    //   password,
    //   agree,
    // });

    //SignUP
    if (state === "Signup") {
      axios
        .post("http://localhost:8000/api/v1/user/register", {
          username,
          email,
          password,
        })
        .then((res) => {
          console.log(res);
          alert("User registered successfully");
          setState("Login");
        })
        .catch((err) => {
          console.error(err);
          alert("Signup failed");
        });
    }

    //Login
    if (state === "Login") {
      axios
        .post(
          "http://localhost:8000/api/v1/user/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          // console.log(res);
          login()
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          alert("Login Failed");
        });
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            {state === "Signup" && (
              <input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={!agree}>
            Continue
          </button>
        </form>
        {state === "Signup" && (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        )}
        {state === "Login" && (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Signup")}>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input
            type="checkbox"
            value={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <p>By continuing, I agree to the term of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
