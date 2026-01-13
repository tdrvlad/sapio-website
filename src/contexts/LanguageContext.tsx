'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, translations } from '@/lib/translations'
import ERROR_MESSAGE from "@/lib/errorMessage";

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t:  <T = string>(key: string) => T 
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error(ERROR_MESSAGE.USE_LANGUAGE_ERROR)
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en') // Default to English
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
  const t = <T = string>(key: string): T => {
    // Use default language during SSR to prevent hydration mismatch
    const currentLanguage = isClient ? language : 'en'
    const keys = key.split('.')
    let value: unknown = translations[currentLanguage]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key as unknown as T
    
      }
    }
    
  return (value as T) ?? (key as unknown as T)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
} 