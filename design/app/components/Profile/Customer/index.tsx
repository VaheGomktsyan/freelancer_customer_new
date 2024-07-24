"use client";
import { IUser } from "@/type/type";
import React, { useEffect } from "react";

export const Customer = ({user}:{user:IUser}) => {
    console.log('Customer',user);
    return (
        <div>
            <h3>Customer</h3>
        </div>
    );
};