import { Nav } from "@/app/components/Nav";
import { Settings } from "@/app/components/Profile/Settings";
import { Metadata } from "next";
import React from "react";
import styles from "../../styles/layout.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.prof}>
      <Nav />
      <Settings />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Settings",
};
