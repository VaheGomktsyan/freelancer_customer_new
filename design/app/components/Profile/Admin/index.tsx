"use client";
import { IUser } from "@/type/type";
import React, { useEffect } from "react";

export const Admin = ({user}:{user:IUser}) => {
    console.log('admin',user);
    return (
        <div>
            <h3>admin</h3>
        </div>
    );
};
