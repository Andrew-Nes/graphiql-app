import { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { DEFAULT_LANG } from '@/constants';

interface LanguageContextProps {
  language: string;
  changeLanguage: (newLanguage: string) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(DEFAULT_LANG);

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;
    changeLanguage(savedLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
