import type { Metadata } from "next";
import { Login } from "./components/Login";

export default function IndexPage() {
    return (
        <div>
            <Login />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Login",
};
