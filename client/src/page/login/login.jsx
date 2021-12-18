import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
import { default as message } from 'antd/es/message';
import 'antd/es/message/style/index.css';
import Axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constans";
import "./login.scss";


const api = Axios.create({
    baseURL: `${API_URL}`,
});

export default function LoginPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
        api.post("/auth/login", values)
            .then((res) => {
                localStorage.setItem("isLogin", JSON.stringify(true));
                localStorage.setItem("user", JSON.stringify(res.data));
                alert("Login Successful");
                navigate("/");
                window.location.reload();
            })
            .catch((res) => {
                console.log(res);
                message.error('Invalid from email or password');
            });
    };

    return (
        <div className="login">
            <div className="container">
                <Form className="form__ant" onFinish={onFinish} form={form}>
                    <h1 style={{ color: "white" }}>
                        Sign In
                    </h1>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                // declare the type and message here
                                type: "email",
                                message:
                                    "Please enter valid email example@email.com",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                    >
                        <Input
                            style={{ maxWidth: "320px" }}
                            placeholder="example@email.com"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            style={{ maxWidth: "320px" }}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Button htmlType="submit" className="loginButton">
                        Sign In
                    </Button>
                    <span style={{ marginTop: "20px" }}>
                        New to Netflix 2.0?{" "}
                        <b>
                            <Link to="/register">Sign up now.</Link>
                        </b>
                        <br />
                        <p>
                            This page is protected by Google reCAPTCHA to ensure
                            you're not a bot.
                        </p>
                    </span>
                </Form>
            </div>
        </div>
    );
}
