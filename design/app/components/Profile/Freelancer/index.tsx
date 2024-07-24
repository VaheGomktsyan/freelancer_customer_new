"use client";
import { IUser } from "@/type/type";
import React, { useEffect } from "react";

export const Freelancer = ({user}:{user:IUser}) => {
    console.log('Freelancer',user);
    return (
        <div>
            <h3>Freelancer</h3>
        </div>
    );
};