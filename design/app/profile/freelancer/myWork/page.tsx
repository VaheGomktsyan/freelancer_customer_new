import { MyWorkFree } from "@/app/components/Profile/Freelancer/MyWork";
import type { Metadata } from "next";

export default function IndexPage() {
    return (
        <div>
            <MyWorkFree />
        </div>
    );
}
export const metadata: Metadata = {
    title: "MyWorkFree",
};
