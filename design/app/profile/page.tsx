import { Metadata } from "next";
import React from "react";
import { Profile } from "../components/Profile";
import { AddSkill } from "../components/Profile/Admin/AddSkills";

export default function ProfilePage() {
    return (
        <div>
            <Profile />
            {/* <AddSkill /> */}
        </div>
    );
}
export const metadata: Metadata = {
    title: "Profile",
};
