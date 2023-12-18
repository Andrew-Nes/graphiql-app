import dictionary from '../services/dictionary.json';
import { useLanguage } from '../context/languageContext';
import { IDictionary } from '@/types';

const translations: IDictionary = {
  en: dictionary.en,
  ru: dictionary.ru,
};

const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language as keyof IDictionary] || translations.en;
};

export { useTranslations };
