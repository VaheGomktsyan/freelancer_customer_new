"use client";
import { useForgotPasswordMutation } from "@/lib/features/user/userSlice";
import { IForgotPassword } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";

export const ForgotPass = () => {
    const router = useRouter();
    const [ForgotPass] = useForgotPasswordMutation();

    return (
        <div>
            <div>
                <Formik
                    initialValues={{
                        username: "",
                    }}
                    onSubmit={(values: IForgotPassword) => {
                        console.log(values);
                        ForgotPass(values)
                            .unwrap()
                            .then((res) => {
                                router.push("");
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
                            <button type="submit">Reset</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
