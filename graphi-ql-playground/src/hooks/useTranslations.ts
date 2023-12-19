import dictionary from '../services/dictionary.json';
import { useLanguage } from '@/hooks';
import { DEFAULT_LANG } from '@/constants';

const useTranslations = () => {
  const { language } = useLanguage();
  return (
    dictionary[language as keyof typeof dictionary] || dictionary[DEFAULT_LANG]
  );
};

export { useTranslations };
