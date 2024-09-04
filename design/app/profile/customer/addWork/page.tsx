import { Nav } from "@/app/components/Nav";
import { AddWork } from "@/app/components/Profile/Customer/AddWork";
import type { Metadata } from "next";
import styles from "../../../styles/layout.module.css";


export default function IndexPage() {
  return (
    <div className={styles.prof}>
      <Nav />
      <AddWork />
    </div>
  );
}
export const metadata: Metadata = {
  title: "AddWork",
};
