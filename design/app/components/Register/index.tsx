"use client";
import { useRegisterMutation } from "@/lib/features/user/userSlice";
import { registerSchema } from "@/schema";
import { IRegister, IUser } from "@/type/type";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import "./register.scss";
import Link from "next/link";

export const Register = () => {
  const [addUser] = useRegisterMutation();
  const router = useRouter();

  return (
    <div>
      <div className="login_href">
        <p>Already a member?</p>
        <a href="/">Sign in</a>
      </div>
      <div className="register_container">
        <img src={"reg.svg"} alt="My Image" className="reg_photo" />
        <div className="reg_card">
          <h3>Sign Up</h3>
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
                <div className="reg_input_names">
                  <div>
                    <label htmlFor="firstName" className="input_label">
                      FirstName
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      className="input-field-names"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="err_message"
                    />
                  </div>
                  <div className="input_label_names">
                    <label htmlFor="lastName" className="input_label">
                      LastName
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      className="input-field-names"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="err_message"
                    />
                  </div>
                </div>

                <div className="reg_input">
                  <label htmlFor="age" className="input_label">
                    Age
                  </label>
                  <Field
                    type="text"
                    id="age"
                    name="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                    className="input-field"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="err_message"
                  />
                </div>

                <div className="reg_input">
                  <label htmlFor="email" className="input_label">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="input-field"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="err_message"
                  />
                </div>

                <div className="reg_input">
                  <label htmlFor="password" className="input_label">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
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

                <div className="reg_input">
                  <label htmlFor="confirmpassword" className="input_label">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmpassword}
                    className="input-field"
                  />
                  <ErrorMessage
                    name="confirmpassword"
                    component="div"
                    className="err_message"
                  />
                </div>
                <div className="reg_input">
                  <label htmlFor="role" className="input_label">
                    Role
                  </label>
                  <Field
                    as="select"
                    type="role"
                    id="role"
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                    className="input-field"
                  >
                    <option value="" hidden>
                      ...
                    </option>
                    <option value="0">Customer</option>
                    <option value="1">Freelancer</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="err_message"
                  />
                </div>

                {values.role && +values.role == 0 ? (
                  <div className="reg_input">
                    <label htmlFor="description" className="input_label">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      type="text"
                      id="description"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      className="input-field"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="err_message"
                    />
                  </div>
                ) : values.role && +values.role == 1 ? (
                  <div className="reg_input">
                    <label htmlFor="salary" className="input_label">
                      Salary
                    </label>
                    <Field
                      type="salary"
                      id="salary"
                      name="salary"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.salary}
                      className="input-field"
                    />
                    <ErrorMessage
                      name="salary"
                      component="div"
                      className="err_message"
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div className="log_button_div">
                  <button type="submit" className="log_button">
                    Sign Up
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
