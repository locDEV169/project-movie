/* eslint-disable no-fallthrough */
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import { default as message } from 'antd/es/message';
import 'antd/es/message/style/index.css';
import Axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constans";
import "./register.scss";

const api = Axios.create({
    baseURL: `${API_URL}`,
});

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log(values);
        api.post("/auth/register", values)
        .then((res) => {
            localStorage.setItem("isLogin", JSON.stringify(true));
            localStorage.setItem("user", JSON.stringify(res.data));
            alert("Register Successful");
            navigate("/login");
            window.location.reload();
        })
        .catch((res) => {
            console.log(res);
            message.error('Invalid from username email or password');
            message.error('Username already exists');
        });
    };

    return (
        <div className="register">
            <div className="container">
                <Form className="form__ant" onFinish={handleSubmit} form={form}>
                    <h1 style={{ color: "white" }}>Sign Up</h1>
                    <Form.Item
                        label="User Name"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username",
                            },
                        ]}
                    >
                        <Input
                            style={{ maxWidth: "320px" }}
                            placeholder="abc"
                        />
                    </Form.Item>
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
                    <Button htmlType="submit" className="registerButton">
                        Sign Up
                    </Button>
                    <span style={{ marginTop: "15px" }}>
                        Register Now
                        <Link to="/login" style={{ marginLeft: "10px" }}>
                            Sign In
                        </Link>
                    </span>
                </Form>
            </div>
        </div>
    );
}
