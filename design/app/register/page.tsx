import { Metadata } from "next";
import React from "react";
import { Register } from "../components/Register";
import { Navlogin } from "../components/NavLogin";

export default function RegisterPage() {
    return (
        <div>
            <Navlogin />
            <Register />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Register",
};
