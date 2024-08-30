"use client"
import { useResetPasswordMutation } from "@/lib/features/user/userSlice"
import { useRouter } from "next/navigation"

export const ResetPass=()=>{
    const router=useRouter()
    const[ResetPass]=useResetPasswordMutation()

    return (
        <div>

        </div>
    )
}