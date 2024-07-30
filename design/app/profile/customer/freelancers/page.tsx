import { Freelancers } from "@/app/components/Profile/Customer/Freelancers";
import type { Metadata } from "next";

export default function IndexPage() {
    return (
        <div>
            <Freelancers />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Freelancers",
};
