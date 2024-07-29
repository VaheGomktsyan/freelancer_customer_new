import { useAddWorkMutation } from "@/lib/features/work/workSlice";
import { IAddWork, IWork } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/router";

export const AddWork = () => {
    const router = useRouter();
    const [addWork, data] = useAddWorkMutation();
    console.log(data);

    return (
        <div>
            <h3>AddWork</h3>
            <Formik
                initialValues={{
                    name: "",
                    price: 0,
                    deadline: new Date,
                    description: "",
                    skills: [],
                }}
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
                        <div>
                            <label htmlFor="name">Enter Work Name</label>
                            <Field
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <div>
                            <label htmlFor="price">Enter Work price</label>
                            <Field
                                type="text"
                                name="price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                            />
                            <ErrorMessage name="price" component="div" />
                        </div>
                        <div>
                            <label htmlFor="description">
                                Enter Work description
                            </label>
                            <Field
                                type="text"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            <ErrorMessage name="description" component="div" />
                        </div>
                        <button type="submit">Add Work</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
