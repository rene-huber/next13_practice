import Link from 'next/link'
import React from 'react'
import classes from './page.module.css'


function Home() {
  return (
    <main className={classes.main}>Home

      <Link href="/dashboard"> dash </Link>
      <Link href="/login"> Login </Link>
    </main>
  )
}

export default Home