import { AddWork } from "@/app/components/Profile/Customer/AddWork";
import type { Metadata } from "next";

export default function IndexPage() {
    return (
        <div>
            <AddWork />
        </div>
    );
}
export const metadata: Metadata = {
    title: "AddWork",
};
