import { Nav } from "@/app/components/Nav";
import { MyWorkFree } from "@/app/components/Profile/Freelancer/MyWork";
import type { Metadata } from "next";
import styles from "../../../styles/layout.module.css";

export default function IndexPage() {
  return (
    <div className={styles.prof}>
      <Nav />
      <MyWorkFree />
    </div>
  );
}
export const metadata: Metadata = {
  title: "MyWorkFree",
};
