import { Nav } from "@/app/components/Nav";
import { Freelancers } from "@/app/components/Profile/Customer/Freelancers";
import type { Metadata } from "next";
import styles from "../../../styles/layout.module.css"

export default function IndexPage() {
    return (
        <div className={styles.prof}>
            <Nav />
            <Freelancers />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Freelancers",
};
