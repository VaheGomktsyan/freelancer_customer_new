"use client";
import { useForgotPasswordMutation } from "@/lib/features/user/userSlice";
import { forgotPassSchema } from "@/schema";
import { IForgotPassword } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";
import "./forgotPass.scss";

export const ForgotPass = () => {
  const router = useRouter();
  const [ForgotPass] = useForgotPasswordMutation();

  return (
    <div>
      <div className="forgotPass_container">
      <img src={"reg.svg"} alt="My Image" className="login_photo" />
        <div className="forgotPass_card">
          <h3>Forgot Password</h3>
          <Formik
            initialValues={{
              username: "",
            }}
            validationSchema={forgotPassSchema}
            onSubmit={(values: IForgotPassword) => {
              console.log(values);
              ForgotPass(values)
                .unwrap()
                .then((res) => {
                  router.push("/resetPass/" + values.username);
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
                <div className="forgotPass_input">
                  <label htmlFor="username" className="input_label">
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
                
                <a href="/" className="a_href">Back to login</a>
                <div className="button_div">
                  <button type="submit" className="button">
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
