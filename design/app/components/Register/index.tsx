"use client";
import { useRegisterMutation } from "@/lib/features/user/userSlice";
import { IRegister, IUser } from "@/type/type";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";

export const Register = () => {
    const [addUser] = useRegisterMutation();

    return (
        <div>
            Register
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    age: 0,
                    email: "",
                    password: "",
                    confirmpassword: "",
                    role: 0,
                    salary: 0,
                    description: "",
                }}
                // validationSchema={registerSchema}
                onSubmit={(values: IRegister) => {
                    console.log(values);
                    addUser(values)
                        .unwrap()
                        .then(console.log)
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
                            <label htmlFor="firstName">firstName</label>
                            <Field
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                            />
                            <ErrorMessage name="firstName" component="div" />
                        </div>

                        <div>
                            <label htmlFor="lastName">lastName</label>
                            <Field
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                            />
                            <ErrorMessage name="lastName" component="div" />
                        </div>

                        <div>
                            <label htmlFor="age">Age</label>
                            <Field
                                type="text"
                                id="age"
                                name="age"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                            />
                            <ErrorMessage name="age" component="div" />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <ErrorMessage name="email" component="div" />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <ErrorMessage name="password" component="div" />
                        </div>

                        <div>
                            <label htmlFor="confirmpassword">
                                Confirm Password
                            </label>
                            <Field
                                type="password"
                                id="confirmpassword"
                                name="confirmpassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmpassword}
                            />
                            <ErrorMessage
                                name="confirmpassword"
                                component="div"
                            />
                        </div>

                        <div>
                            <label htmlFor="role">Role</label>
                            <Field
                                type="role"
                                id="role"
                                name="role"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.role}
                            />
                            <ErrorMessage name="role" component="div" />
                        </div>

                        <div>
                            <label htmlFor="salary">Salary</label>
                            <Field
                                type="salary"
                                id="salary"
                                name="salary"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.salary}
                            />
                            <ErrorMessage name="salary" component="div" />
                        </div>

                        <div>
                            <label htmlFor="description">description</label>
                            <Field
                                type="text"
                                id="description"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            <ErrorMessage name="description" component="div" />
                        </div>

                        <button type="submit">Register</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
