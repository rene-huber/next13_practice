"use client"

import { SessionProvider } from "next-auth/react";

import styles from './page.module.css'

export default function Home() {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
