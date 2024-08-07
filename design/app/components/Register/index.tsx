"use client";
import { useRegisterMutation } from "@/lib/features/user/userSlice";
import { registerSchema } from "@/schema";
import { IRegister, IUser } from "@/type/type";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

export const Register = () => {
    const [addUser] = useRegisterMutation();
    const router = useRouter();

    return (
        <div>
            <h3>Register</h3>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    age: 0,
                    email: "",
                    password: "",
                    confirmpassword: "",
                    role: -1,
                    salary: 0,
                    description: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values: IRegister) => {
                    console.log(values);
                    addUser(values)
                        .unwrap()
                        .then(() => router.push("/"))
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
                                as="select"
                                type="role"
                                id="role"
                                name="role"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.role}
                            >
                                <option value="" hidden>
                                    ...
                                </option>
                                <option value="0">Customer</option>
                                <option value="1">Freelancer</option>
                            </Field>
                            <ErrorMessage name="role" component="div" />
                        </div>

                        {values.role && +values.role == 0 ? (
                            <div>
                                <label htmlFor="description">description</label>
                                <Field
                                as="textarea"
                                    type="text"
                                    id="description"
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                />
                            </div>
                        ) : values.role && +values.role == 1 ? (
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
                        ) : (
                            <></>
                        )}

                        <button type="submit">Register</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
