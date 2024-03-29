import { useEffect, useState, ChangeEvent, FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, logout } from '@/services/auth/firebase';
import { useLanguage, useTranslations } from '@/hooks';
import { routes } from '@/types';
import { LANGS } from '@/constants';

import { Button } from '../Button';

import styles from './Header.module.scss';

export const Header: FC = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  const { changeLanguage, language } = useLanguage();

  const dictionary = useTranslations();

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const handleResize = () => {
    if (window.innerWidth > 480) {
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  const handleSelectLang = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    localStorage.setItem('lang', selectedLang);
    changeLanguage(selectedLang);
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header
      className={clsx(styles.header, {
        [styles.scroll]: isScroll,
        [styles.menu__open]: menuOpen,
      })}
    >
      <nav className={styles.nav}>
        <Link
          href={routes.MAIN}
          className={styles.nav__logo}
          onClick={closeMenu}
        >
          <span>GraphiQL</span>
          <span className={styles.nav__logo_icon}></span>
        </Link>

        <Button
          name={dictionary.header.menu}
          className={styles.button__menu}
          onClick={toggleMenu}
        />

        <div className={styles.menu}>
          {user && !loading && (
            <ul className={styles.menu__links}>
              <li>
                <Link
                  href={routes.PRODUCT}
                  className={styles.link}
                  onClick={closeMenu}
                >
                  {dictionary.header.playground}
                </Link>
              </li>
              <li>
                <Link href="" className={styles.link} onClick={handleLogout}>
                  {dictionary.header.logout}
                </Link>
              </li>
            </ul>
          )}

          {!user && !loading && (
            <ul className={styles.menu__links}>
              <li>
                <Link
                  href={routes.LOGIN}
                  className={styles.link}
                  onClick={closeMenu}
                >
                  {dictionary.header.login}
                </Link>
              </li>
              <li>
                <Link
                  href={routes.REGISTER}
                  className={styles.link}
                  onClick={closeMenu}
                >
                  {dictionary.header.register}
                </Link>
              </li>
            </ul>
          )}

          {!loading && (
            <div className={styles.menu__lang}>
              <select
                className={styles.select}
                value={language}
                onChange={handleSelectLang}
              >
                {Object.values(LANGS).map((option) => (
                  <option key={option} value={option}>
                    {option.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
