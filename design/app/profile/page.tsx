import { Metadata } from "next";
import React from "react";
import { Nav } from "../components/Nav";
import { Profile } from "../components/Profile";
import styles from "../styles/layout.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.prof}>
      <Nav />
      <Profile />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Profile",
};
