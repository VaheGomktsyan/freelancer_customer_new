"use client";
import {
    useResetPasswordMutation,
    useUpdatePasswordMutation,
    useUpdatePicUrlMutation,
    useUpdateUserMutation,
} from "@/lib/features/user/userSlice";
import { UpdateUserSchema } from "@/schema";
import { IResetPassword, IUpdatePicUrl, IUpdateUser, IUser } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Settings = () => {
    const router = useRouter();
    const [updateUser] = useUpdateUserMutation();
    const [updatePicUrl] = useUpdatePicUrlMutation();
    const [resetPassword] = useResetPasswordMutation();
    const [updatePassword] = useUpdatePasswordMutation();

    const [formData, setFormData] = useState<any>(null);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (formData) {
            const data = new FormData();
            data.append("file", formData);
            updatePicUrl(data);
        }
    };
    return (
        <div>
            <h3>Settings</h3>
            <h4>Update User Data</h4>
            <Formik
                initialValues={{
                    lastName: "",
                    firstName: "",
                    age: 0,
                    picUrl: "",
                }}
                validationSchema={UpdateUserSchema}
                onSubmit={(values: IUpdateUser) => {
                    console.log(values);
                    updateUser(values).unwrap();
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
                            <label htmlFor="firstName">FirstName</label>
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
                            <label htmlFor="lastName">LastName</label>
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
                                name="age"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                            />
                            <ErrorMessage name="age" component="div" />
                        </div>
                        <button type="submit">Update User</button>
                    </form>
                )}
            </Formik>
            <h4>Update User Picture</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="picUrl">Picture</label>
                    <input
                        type="file"
                        name="picUrl"
                        onChange={(e) => {
                            if (e.target.files?.length)
                                setFormData(e.target.files[0]);
                        }}
                    />
                </div>
                <button type="submit">Update Picture</button>
            </form>
            <div>
                <h4>Reset Password</h4>
                <Formik
                    initialValues={{
                        code: 0,
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={(values: IResetPassword) => {
                        console.log(values);
                        resetPassword(values).unwrap();
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
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="text"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">ConfirmPassword</label>
                                <Field
                                    type="text"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                />
                                <ErrorMessage name="confirmPassword" component="div" />
                            </div>
                            <button type="submit">Reset Password</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
