import { Nav } from "@/app/components/Nav";
import { Works } from "@/app/components/Profile/Freelancer/Works";
import type { Metadata } from "next";
import styles from "../../../styles/layout.module.css";

export default function IndexPage() {
  return (
    <div className={styles.prof}>
      <Nav />
      <Works />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Works",
};
