import { useLanguage } from '../Components/LanguageContext/LanguageContext';
import dictionary from '../services/dictionary.json';

interface ITranslations {
  forms: {
    errors: {
      requiredEmail: string;
      requiredPassword: string;
      requiredName: string;
      invalidEmail: string;
      shortName: string;
      passwordDigitContain: string;
      passwordLetterContain: string;
      passwordSpecialChContain: string;
      shortPassword: string;
    };
  };
  header: {
    menu: string;
    login: string;
    register: string;
    logout: string;
    playground: string;
  };
  landing: {
    heading: string;
    intro: string;
    login: string;
    playground: string;
    course: {
      name: string;
      description_1: string;
      description_2: string;
      more: string;
      week: string;
    };
    team: string;
  };
  footer: {
    greeting: string;
    intro: string;
    course: string;
    copyright: string;
  };
}

interface IDictionary {
  en: ITranslations;
  ru: ITranslations;
}

const translations: IDictionary = {
  en: dictionary.en,
  ru: dictionary.ru,
};

const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language as keyof IDictionary] || translations.en;
};

export default useTranslations;
