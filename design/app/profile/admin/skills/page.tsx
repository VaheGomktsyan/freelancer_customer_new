import { Skills } from "@/app/components/Profile/Admin/Skills";
import type { Metadata } from "next";

export default function IndexPage() {
    
    return (
        <div>
            <Skills />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Skills",
};
