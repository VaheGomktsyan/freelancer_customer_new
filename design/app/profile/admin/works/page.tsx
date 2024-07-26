import { Work } from "@/app/components/Profile/Admin/Works";
import type { Metadata } from "next";

export default function IndexPage() {
    
    return (
        <div>
            <Work />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Work",
};
