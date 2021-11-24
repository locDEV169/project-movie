import React, { useState } from "react";
import "./register.scss";

export default function RegisterPage() {
    // eslint-disable-next-line no-unused-vars
    const [username,setUserName] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [email,setEmail] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [password, setPassword]= useState("")


    const handleOnChange = (values) => {
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    console.log(email, password ,username)

    return (
        <div className="register">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <input name="username" type="username" placeholder="Username" onChange={handleOnChange}/>
                    <input name="email" type="email" 
                        placeholder="Email or phone number" 
                        onChange={handleOnChange}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title="Invalid email address" />
                    <input name="password" type="password" placeholder="Password" onChange={handleOnChange}/>
                    <button className="registerButton">Sign Up</button>
                    <span>
                        Register Now
                    </span>
                </form>
            </div>
        </div>
    );
}
