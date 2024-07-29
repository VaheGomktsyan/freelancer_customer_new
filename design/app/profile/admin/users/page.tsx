import { Skills } from "@/app/components/Profile/Admin/Skills";
import { Users } from "@/app/components/Profile/Admin/Users";
import type { Metadata } from "next";

export default function IndexPage() {
    
    return (
        <div>
            <Users />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Users",
};
