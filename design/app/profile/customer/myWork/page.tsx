import { Freelancers } from "@/app/components/Profile/Customer/Freelancers";
import { MyWorkCust } from "@/app/components/Profile/Customer/MyWork";
import type { Metadata } from "next";

export default function IndexPage() {
    return (
        <div>
            <MyWorkCust />
        </div>
    );
}
export const metadata: Metadata = {
    title: "MyWorkCust",
};
