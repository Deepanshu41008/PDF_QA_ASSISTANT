'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center">
      <label htmlFor="theme-switcher" className="sr-only">
        Theme Switcher
      </label>
      <select
        id="theme-switcher"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 rounded-md p-2"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value= "light">Light</option>
      </select>
    </div>
  )
}
