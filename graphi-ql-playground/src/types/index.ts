export enum routes {
  MAIN = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  PRODUCT = '/playground',
}

interface ITranslations {
  forms: {
    title: {
      login: string;
      register: string;
    };

    subtitle: {
      login: string;
      register: string;
    };

    fields: {
      name: string;
      email: string;
      pass: string;
      confirmPassword: string;
    };

    buttons: {
      login: string;
      register: string;
    };

    options: {
      login: string;
      register: string;
    };

    errors: {
      login: string;
      register: string;
      auth: string;
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

  notFound: {
    text: string;
    button: string;
  };

  courseData: string[];

  playground: {
    docs: {
      button: {
        titleDocs: string;
        titleNoDocs: string;
      };
    };
  };
}

export interface IDictionary {
  en: ITranslations;
  ru: ITranslations;
}
