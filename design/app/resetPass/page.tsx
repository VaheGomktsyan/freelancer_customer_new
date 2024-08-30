import { Metadata } from "next";
import React from "react";
import { ResetPass } from "../components/ResetPass";

export default function ResetPassPage() {
    return (
        <div>
            <ResetPass />
        </div>
    );
}
export const metadata: Metadata = {
    title: "ResetPass",
};
