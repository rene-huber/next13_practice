"use client"
import useStore from '@/utils/store'


function zustand({childre}) {
    const isDarkTheme = useStore(state => state.isDarkTheme)
  return (
    <div>{childre}</div>
  )
}

export default zustand