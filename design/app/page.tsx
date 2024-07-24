import type { Metadata } from "next";
import { Login } from "./components/Login";
import { Navlogin } from "./components/NavLogin";

export default function IndexPage() {
    return (
        <div>
            <Navlogin/>
            <Login />
        </div>
    );
}
export const metadata: Metadata = {
    title: "Login",
};
