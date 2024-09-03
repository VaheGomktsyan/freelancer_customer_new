import { Metadata } from "next";
import React from "react";
import { ResetPass } from "../../components/ResetPass";

export default function ResetPassPage({params}:any) {
    return (
        <div>
            <ResetPass email={params.email}/>
        </div>
    );
}
export const metadata: Metadata = {
    title: "ResetPass",
};
