"use client";
import { useAddSkillMutation } from "@/lib/features/skill/skillSlice";
import { ISkill } from "@/type/type";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const AddSkill = () => {
    const router = useRouter();
    const [addSkill, data] = useAddSkillMutation();
    console.log(data);

    return (
        <div>
            <h3>AddSkill</h3>
            <Formik
                initialValues={{
                    name: "",
                }}
                onSubmit={(values: ISkill) => {
                    console.log(values);
                    addSkill(values)
                        .unwrap()
                        .then((res) => {
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
                        <div>
                            <label htmlFor="name">Enter Skill Name</label>
                            <Field
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <button type="submit">Add Skill</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
