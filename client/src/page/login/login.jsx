import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.scss";

export default function LoginPage() {
    const [email,setEmail] = useState("")
    const [password, setPassword]= useState("")


    const handleOnChange = (values) => {
        console.log(values.target.name , values.target.value)
        if(values.target.name === 'email') {
            setEmail(values.target.value)
        }else if (values.target.name === 'password'){
            setPassword(values.target.value)
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = new FormData()
        form.append('email', email);
        form.append('password', password)
        console.log('form Data' , form)
    }

    console.log(email, password)

    return (
        <div className="login">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <input name="email" type="email" 
                        placeholder="Email or phone number" 
                        onChange={handleOnChange}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title="Invalid email address" />
                    <input name="password" type="password" placeholder="Password" onChange={handleOnChange}/>
                    <button className="loginButton">Sign In</button>
                    <span>
                        New to Netflix 2.0? <b><Link to="/register">Sign up now.</Link></b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure
                        you're not a bot. <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    );
}
