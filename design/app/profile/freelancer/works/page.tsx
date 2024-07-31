import { Works } from "@/app/components/Profile/Freelancer/Works";
import type { Metadata } from "next";

export default function IndexPage() {
    return (
        <div>
            <Works />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Works",
};
