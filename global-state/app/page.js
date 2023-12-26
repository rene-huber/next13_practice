import Image from 'next/image'
import styles from './page.module.css'
import Toggle from '@/components/Toggle'

export default function Home() {
  return (
    <main className={styles.main}>
      <Toggle />
      <h1>hello</h1>
    </main>
  )
}
