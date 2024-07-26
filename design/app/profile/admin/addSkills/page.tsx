import { AddSkill } from "@/app/components/Profile/Admin/AddSkills";
import type { Metadata } from "next";

export default function IndexPage() {
    
    return (
        <div>
            <AddSkill />
        </div>
    );
}
export const metadata: Metadata = {
    title: "AddSkill",
};
