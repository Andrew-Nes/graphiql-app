import React, { useEffect, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { Button } from '../Button';
import { routes } from '@/services/routes';
import { LANGS } from '@/constants';

import classnames from 'classnames';
import styles from './header.module.scss';
import { useLanguage } from '../LanguageContext/LanguageContext';
import useTranslations from '@/utils/translation';

const IS_AUTH = false;

const Header: React.FC = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { changeLanguage, language } = useLanguage();

  const dictionary = useTranslations();

  function handleResize(): void {
    if (window.innerWidth > 480) {
      setMenuOpen(false);
    }
  }

  function toggleMenu(): void {
    setMenuOpen(!menuOpen);
  }

  function closeMenu(): void {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }

  function handleScroll(): void {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    changeLanguage(savedLang);
  }, [changeLanguage]);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleSelectLang(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedLang = e.target.value;
    localStorage.setItem('lang', selectedLang);
    changeLanguage(selectedLang);
  }

  return (
    <header
      className={classnames(
        styles.header,
        isScroll && styles.scroll,
        menuOpen && styles.menu__open
      )}
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
          {IS_AUTH && (
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
                <Link href="" className={styles.link} onClick={closeMenu}>
                  {dictionary.header.logout}
                </Link>
              </li>
            </ul>
          )}

          {!IS_AUTH && (
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

          <div className={styles.menu__lang}>
            <select
              className={styles.select}
              value={language}
              onChange={handleSelectLang}
            >
              {LANGS.map((option) => (
                <option key={option} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
