import { Nav } from "@/app/components/Nav";
import { Freelancers } from "@/app/components/Profile/Customer/Freelancers";
import { MyWorkCust } from "@/app/components/Profile/Customer/MyWork";
import type { Metadata } from "next";
import styles from "../../../styles/layout.module.css"

export default function IndexPage() {
    return (
        <div className={styles.prof}>
            <Nav />
            <MyWorkCust />
        </div>
    );
}
export const metadata: Metadata = {
    title: "MyWorkCust",
};
