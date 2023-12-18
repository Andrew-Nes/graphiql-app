import dictionary from '../services/dictionary.json';
import { useLanguage } from '@/hooks';

const useTranslations = () => {
  const { language } = useLanguage();
  return dictionary[language as keyof typeof dictionary] || dictionary.en;
};

export { useTranslations };
