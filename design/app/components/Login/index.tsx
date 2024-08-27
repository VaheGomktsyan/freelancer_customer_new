"use client";
import { useLoginMutation } from "@/lib/features/user/userSlice";
import { loginSchema } from "@/schema";
import { ILogin } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./login.scss";
import "public/login.png";
import Link from "next/link";

export const Login = () => {
    const router = useRouter();
    const [logUser] = useLoginMutation();
    return (
        <div>
            <div className="login-container">
                <img src={"login.png"} alt="My Image" className="login_photo" />
                <svg
                    className="svg1"
                    width="175"
                    height="104"
                    viewBox="0 0 175 104"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M153.684 56.229C159.149 47.168 162.568 37.3733 164.017 27.4908L167.161 27.9485L173.366 28.8578L173.447 28.8641C175.122 17.5581 174.551 6.12053 171.816 -4.80289L162.587 -2.52038C160.109 -12.4029 155.748 -21.8276 149.537 -30.1236L157.185 -35.8048C150.641 -44.684 142.241 -52.447 132.215 -58.4856L127.29 -50.3213C118.193 -55.8081 108.424 -59.2005 98.5365 -60.649L99.9167 -70.0675C88.6048 -71.7417 77.1424 -71.1397 66.232 -68.4371L68.5157 -59.213C58.6217 -56.7424 49.1983 -52.3781 40.8979 -46.1701L35.2137 -53.814C26.3299 -47.2738 18.5628 -38.8774 12.521 -28.857L20.6896 -23.9345C15.2062 -14.8421 11.8057 -5.0788 10.3565 4.8037L3.68728 3.82548L0.964397 3.44924L0.933026 3.43043C-0.742112 14.7364 -0.139821 26.1928 2.56424 37.0974L11.7932 34.8149C14.2714 44.6974 18.6569 54.1346 24.8743 62.4369L17.2264 68.1181C23.7701 76.9973 32.1395 84.7415 42.1653 90.7801L47.0903 82.6158C56.1875 88.0963 65.9873 91.5138 75.875 92.9623L74.7896 100.28L74.4948 102.381C85.8067 104.055 97.2378 103.434 108.148 100.732L105.852 91.5075C115.74 89.0306 125.182 84.6475 133.52 78.4521L139.204 86.096C148.057 79.5369 155.805 71.1719 161.847 61.1515L153.684 56.229ZM65.4039 52.2409C45.4465 40.2139 39.0283 14.3288 51.0679 -5.61806C63.0825 -25.5335 88.9813 -31.9421 108.939 -19.9151C128.865 -7.90057 135.283 17.9783 123.262 37.8937C111.229 57.8406 85.3298 64.2491 65.4039 52.2409Z"
                        fill="#ADD8E6"
                    />
                </svg>

                <svg
                    className="svg3"
                    width="38"
                    height="49"
                    viewBox="0 0 38 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M43.0596 12.2207C41.3865 9.69192 39.2696 7.60338 36.8897 6.01309L37.395 5.25548L38.3955 3.76415L38.4057 3.74368C35.6844 1.92132 32.6524 0.662046 29.4872 0.0238806L28.9443 2.69257C26.0796 2.11584 23.1056 2.08854 20.1896 2.67552L19.6604 0C16.5567 0.600626 13.5144 1.81894 10.718 3.6686L12.2271 5.94824C9.68679 7.62727 7.60739 9.73629 6.01626 12.1149L3.74565 10.5997C1.92234 13.3196 0.665817 16.3602 0.023901 19.5135L2.694 20.0561C2.11696 22.9193 2.08964 25.8918 2.67693 28.8062L0 29.3351C0.600943 32.4372 1.8199 35.4779 3.67053 38.2729L5.95138 36.7645C7.63129 39.3035 9.74142 41.3818 12.1213 42.9721L11.0457 44.576L10.6121 45.2347L10.6019 45.2415C13.3232 47.0638 16.3655 48.3197 19.5204 48.9613L20.0633 46.2926C22.928 46.8693 25.9123 46.8932 28.8248 46.3062L29.354 48.9818C32.4578 48.3811 35.4932 47.1696 38.2896 45.3166L36.7804 43.0369C39.3208 41.3579 41.407 39.2455 42.9981 36.8634L44.76 38.0442L45.2688 38.3786C47.0921 35.6588 48.3384 32.6249 48.9803 29.4716L46.3102 28.929C46.8872 26.0658 46.9111 23.0832 46.3307 20.1653L49.0076 19.6364C48.3964 16.5411 47.1843 13.5073 45.3336 10.7123L43.0596 12.2207ZM31.1705 34.5667C25.6015 38.249 18.1102 36.7269 14.426 31.1609C10.7453 25.6017 12.2715 18.1177 17.8405 14.4321C23.4026 10.7533 30.8905 12.2787 34.5713 17.8379C38.2589 23.4005 36.7326 30.8879 31.1705 34.5667Z"
                        fill="#ADD8E6"
                    />
                </svg>
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
                                        type="password"
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
                                <a href="" className="a_href">
                                    Forgot Password?
                                </a>
                                <div className="log_button_div">
                                    <button
                                        type="submit"
                                        className="log_button"
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className="log_button_link">
                                <p>
                                    ________ <sub>or</sub> ________
                                </p>
                                    <Link
                                        href="/register"
                                        className="log_button"
                                        shallow
                                        passHref
                                        legacyBehavior
                                        replace={false}
                                    >
                                        Register
                                    </Link>
                                </div>
                                <svg
                                    className="svg2"
                                    viewBox="0 0 50 49"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M43.0628 12.2207C41.3897 9.69192 39.2727 7.60338 36.8929 6.01309L37.3982 5.25548L38.3987 3.76415L38.4089 3.74368C35.6876 1.92132 32.6555 0.662046 29.4904 0.0238806L28.9475 2.69257C26.0827 2.11584 23.1087 2.08854 20.1928 2.67552L19.6636 0C16.5598 0.600626 13.5176 1.81894 10.7211 3.6686L12.2303 5.94824C9.68996 7.62727 7.61057 9.73629 6.01943 12.1149L3.74882 10.5997C1.92551 13.3196 0.668991 16.3602 0.0270749 19.5135L2.69717 20.0561C2.12013 22.9193 2.09282 25.8918 2.6801 28.8062L0.00317383 29.3351C0.604117 32.4372 1.82308 35.4779 3.67371 38.2729L5.95456 36.7645C7.63447 39.3035 9.7446 41.3818 12.1245 42.9721L11.0489 44.576L10.6153 45.2347L10.605 45.2415C13.3264 47.0638 16.3686 48.3197 19.5236 48.9613L20.0665 46.2926C22.9312 46.8693 25.9154 46.8932 28.8279 46.3062L29.3572 48.9818C32.4609 48.3811 35.4964 47.1696 38.2928 45.3166L36.7836 43.0369C39.324 41.3579 41.4102 39.2455 43.0013 36.8634L44.7632 38.0442L45.2719 38.3786C47.0953 35.6588 48.3415 32.6249 48.9834 29.4716L46.3133 28.929C46.8904 26.0658 46.9143 23.0832 46.3338 20.1653L49.0108 19.6364C48.3996 16.5411 47.1874 13.5073 45.3368 10.7123L43.0628 12.2207ZM31.1737 34.5667C25.6047 38.249 18.1134 36.7269 14.4292 31.1609C10.7484 25.6017 12.2747 18.1177 17.8437 14.4321C23.4058 10.7533 30.8937 12.2787 34.5745 17.8379C38.2621 23.4005 36.7358 30.8879 31.1737 34.5667Z"
                                        fill="#ADD8E6"
                                    />
                                </svg>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
