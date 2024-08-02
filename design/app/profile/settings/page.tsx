import { Settings } from "@/app/components/Profile/Settings";
import { Metadata } from "next";
import React from "react";

export default function ProfilePage() {
    return (
        <div>
            <Settings />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Settings",
};
