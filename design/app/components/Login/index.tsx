"use client";
import { useLoginMutation } from "@/lib/features/user/userSlice";
import { ILogin } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const Login = () => {
    const router = useRouter();
    const [logUser] = useLoginMutation();
    return (
        <div>
            <h3>Login</h3>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
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
                        <div>
                            <label htmlFor="username">Username</label>
                            <Field
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            <ErrorMessage name="username" component="div" />
                        </div>
                        <div>
                            <label htmlFor="password">password</label>
                            <Field
                                type="text"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <button type="submit">Log In</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
