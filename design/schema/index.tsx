import { number, object, string } from "yup";
import * as Yup from "yup";

export const loginSchema = object({
    username: string().email().required(),
    password: string().min(6).max(20).required(),
});

export const registerSchema = Yup.object({
    firstName: string().min(1).max(15).required(),
    lastName: string().min(1).max(15).required(),
    age: number().min(18).max(120).required(),
    email: string().email().required(),
    password: string().min(6).max(12).required(),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    role: number().min(0).max(2).required(),
    salary: number().min(1000).max(1000000).required(),
    description: string().min(3).required(),
});

export const addWorkSchema = Yup.object({
    name: string().min(1).max(15).required(),
    price: number().min(1000).max(500000).required(),
    description: string().min(1).max(100).required(),
});
export const addSkillSchema = Yup.object({
    name: string().min(1).max(15).required(),
});
