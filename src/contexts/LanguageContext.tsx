'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, translations } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ro') // Default to Romanian
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'ro' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  // Translation function
  const t = (key: string): string => {
    // Use default language during SSR to prevent hydration mismatch
    const currentLanguage = isClient ? language : 'en'
    const keys = key.split('.')
    let value: unknown = translations[currentLanguage]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
} 