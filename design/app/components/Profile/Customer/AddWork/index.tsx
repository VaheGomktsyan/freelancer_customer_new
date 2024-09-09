"use client";
import { useAddWorkMutation } from "@/lib/features/work/workSlice";
import { addWorkSchema } from "@/schema";
import { IAddWork, IWork } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";
import "./addWork.scss";

export const AddWork = () => {
  const router = useRouter();
  const [addWork, data] = useAddWorkMutation();
  console.log(data);

  return (
    <div className="addWork_cont">
      <div className="addwork_card">
        <h3>AddWork</h3>
        <Formik
          initialValues={{
            name: "",
            price: 0,
            deadline: new Date(),
            description: "",
            skills: [],
          }}
          validationSchema={addWorkSchema}
          onSubmit={(values: IAddWork) => {
            console.log(values);
            addWork(values)
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
              <div className="addWork_input">
                <label htmlFor="name" className="input_label">
                  Enter Work Name
                </label>
                <Field
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="input-field"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="err_message"
                />
              </div>
              <div className="addWork_input">
                <label htmlFor="price" className="input_label">
                  Enter Work price
                </label>
                <Field
                  type="text"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  className="input-field"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="err_message"
                />
              </div>
              <div className="addWork_input">
                <label htmlFor="description" className="input_label">
                  Enter Work description
                </label>
                <Field
                  type="text"
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
              <div className="button_div">
              <button type="submit" className="button">Add Work</button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
