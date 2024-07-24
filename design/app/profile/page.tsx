import { Metadata } from 'next';
import React from 'react'
import { Profile } from '../components/Profile';
import { Nav } from '../components/Nav';

export default function ProfilePage() {
  return (
    <div>
      <Nav/>
      <Profile/></div>
  )
}
export const metadata: Metadata = {
    title: "Profile",
  };