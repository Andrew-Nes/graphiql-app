import { createContext, useState, ReactNode, FC, useEffect } from 'react';

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
  const [language, setLanguage] = useState('en');

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    changeLanguage(savedLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
