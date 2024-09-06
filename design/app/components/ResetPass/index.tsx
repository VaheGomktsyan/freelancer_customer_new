"use client";
import { useResetPasswordMutation } from "@/lib/features/user/userSlice";
import { IResetPassword } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";

export const ResetPass = ({ email }: any) => {
  console.log(email);
  const router = useRouter();
  const [ResetPass] = useResetPasswordMutation();

  return (
    <div>
      <div className="resPass_container">
        <div className="resPass_card">
          <h3>Reset Password</h3>
          <Formik
            initialValues={{
              code: 0,
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values: IResetPassword) => {
              console.log(values);
              ResetPass({...values, email}).unwrap();
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
                <div className="resPass_input">
                  <label htmlFor="code" className="input_label">
                    Code
                  </label>
                  <Field
                    type="text"
                    name="code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.code}
                    className="input-field"
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="err_message"
                  />
                </div>
                <div className="resPass_input">
                  <label htmlFor="password" className="input_label">
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
                <div className="resPass_input">
                  <label htmlFor="confirmPassword" className="input_label">
                    ConfirmPassword
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    className="input-field"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="err_message"
                  />
                </div>
                <div className="resPass_button_div">
                  <button type="submit" className="resPass_button">
                    Reset
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
