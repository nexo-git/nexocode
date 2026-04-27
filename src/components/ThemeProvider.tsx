'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { fetchAuthSession } from 'aws-amplify/auth'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

function applyTheme(t: Theme) {
  if (t === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    async function init() {
      const saved = localStorage.getItem('nexo-theme') as Theme | null
      if (saved === 'light' || saved === 'dark') {
        applyTheme(saved)
        setTheme(saved)
        return
      }
      // Sin preferencia guardada: dark para admins, light para el resto
      try {
        const session = await fetchAuthSession()
        const groups = (session.tokens?.idToken?.payload['cognito:groups'] as string[]) ?? []
        const defaultTheme: Theme = groups.includes('admin') ? 'dark' : 'light'
        applyTheme(defaultTheme)
        setTheme(defaultTheme)
      } catch {
        applyTheme('light')
      }
    }
    init()
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
    localStorage.setItem('nexo-theme', next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
