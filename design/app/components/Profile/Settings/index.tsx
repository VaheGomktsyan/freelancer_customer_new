"use client";
import {
    useResetPasswordMutation,
    useUpdatePasswordMutation,
    useUpdatePicUrlMutation,
    useUpdateUserMutation,
} from "@/lib/features/user/userSlice";
import { IUpdatePicUrl, IUpdateUser, IUser } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";

export const Settings = () => {
    const router = useRouter();
    const [updateUser] = useUpdateUserMutation();
    const [updatePicUrl] = useUpdatePicUrlMutation();
    const [resetPassword] = useResetPasswordMutation();
    const [updatePassword] = useUpdatePasswordMutation();

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
            <Formik
                initialValues={{
                    picUrl: "",
                }}
                onSubmit={(values: IUpdatePicUrl) => {
                    console.log(values);
                    updatePicUrl(values)
                        .unwrap()
                        .then((res) => {})
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
                            <label htmlFor="picUrl">Picture</label>
                            <Field
                                type="file"
                                name="picUrl"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.picUrl}
                            />
                            <ErrorMessage name="picUrl" component="div" />
                        </div>
                        <button type="submit">Update Picture</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
