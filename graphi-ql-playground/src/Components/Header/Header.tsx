import React, { useEffect, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { Button } from '../Button';
import { routes } from '@/services/routes';
import { LANGS } from '@/constants';

import classnames from 'classnames';
import styles from './header.module.scss';

const IS_AUTH = false;

const Header: React.FC = () => {
  const [lang, setLang] = useState('');
  const [isScroll, setIsScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    const savedLang = localStorage.getItem('lang') || '';
    setLang(savedLang);
  }, []);

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

    setLang(selectedLang);
    localStorage.setItem('lang', selectedLang);
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
          name="Menu"
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
                  Playground
                </Link>
              </li>
              <li>
                <Link href="" className={styles.link} onClick={closeMenu}>
                  Sign Out
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
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href={routes.REGISTER}
                  className={styles.link}
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </li>
            </ul>
          )}

          <div className={styles.menu__lang}>
            <select
              className={styles.select}
              value={lang}
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
