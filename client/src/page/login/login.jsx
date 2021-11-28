import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constans";
import "./login.scss";

const api = Axios.create({
    baseURL: `${API_URL}`,
});

export default function LoginPage() {
    // const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleOnChange = (values) => {
        if (values.target.name === "email") {
            setEmail(values.target.value);
        } else if (values.target.name === "password") {
            setPassword(values.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let check = true;

        const data = {
            email: email,
            password: password,
        };
        if (email === "") {
            check = false;
            setErrors("Vui long Nhap Email");
        } else {
            check = true;
            setErrors("");
        }
        if (!password) {
            check = false;
            setErrors("Vui long Nhap password");
        }
        if (!check) {
            setErrors("Vui long check email vs password");
        } else {
            setErrors("");
            api.post("/auth/login", data)
                .then((res) => {
                    console.log('then')
                    //get infomation for User
                    // location.push("/");
                    localStorage.setItem("isLogin", JSON.stringify(true))
                    localStorage.setItem("user", JSON.stringify(res.data));
                    alert("Login Success");
                    window.location.reload();
                    // location.push("/");
                })
                .catch((res) => {
                    console.log('catch')
                    setErrors("Check for email or password");
                });
        }
    };

    console.log(email, password);

    return (
        <div className="login">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <p>{errors}</p>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email or phone number"
                        onChange={handleOnChange}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title="Invalid email address"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleOnChange}
                    />
                    <button className="loginButton">Sign In</button>
                    <span>
                        New to Netflix 2.0?{" "}
                        <b>
                            <Link to="/register">Sign up now.</Link>
                        </b>
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
