"use client";
import { useLoginMutation } from "@/lib/features/user/userSlice";
import { loginSchema } from "@/schema";
import { ILogin } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./login.scss";

export const Login = () => {
    const router = useRouter();
    const [logUser] = useLoginMutation();
    return (
        <div className="login-container">
            <div className="login-card">
                <h3>Login</h3>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values: ILogin) => {
                        console.log(values);
                        logUser(values)
                            .unwrap()
                            .then((res) => {
                                localStorage.token = res.access_token;
                                router.push("profile");
                            })
                            .catch(console.warn);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="login_input">
                                <label
                                    htmlFor="username"
                                    className="input_label"
                                >
                                    Email Address
                                </label>
                                <Field
                                    type="text"
                                    name="username"
                                    
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    className="input-field"
                                />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="err_message"
                                />
                            </div>
                            <div className="login_input">
                                <label
                                    htmlFor="password"
                                    
                                    className="input_label"
                                >
                                    Password
                                </label>
                                <Field
                                    type="text"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className="input-field"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="err_message"
                                />
                            </div>
                            <button type="submit" className="log_button">
                                Login
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
