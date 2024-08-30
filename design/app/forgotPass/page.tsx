import { Metadata } from "next";
import React from "react";
import { ForgotPass } from "../components/ForgotPass";

export default function ForgotPassPage() {
    return (
        <div>
            <ForgotPass />
        </div>
    );
}
export const metadata: Metadata = {
    title: "ForgotPass",
};
