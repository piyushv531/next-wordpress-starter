import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import useSearch, { SEARCH_STATE_LOADED } from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';

import Section from 'components/Section';

import styles from './Nav.module.scss';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const Nav = () => {
  const formRef = useRef();

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { metadata = {} } = useSite();
  const { title } = metadata;

  const mainCategories = [
    { label: 'Home', slug: '' },
    { label: 'Movies', slug: 'movies' },
    { label: 'TV', slug: 'tv' },
    { label: 'Reviews', slug: 'reviews' },
    { label: 'Box Office', slug: 'box-office' },
    { label: 'Gaming', slug: 'gaming' },
    { label: 'Tech', slug: 'tech' },
  ];

  const { query, results, search, clearSearch, state } = useSearch({
    maxResults: 5,
  });

  const searchIsLoaded = state === SEARCH_STATE_LOADED;

  useEffect(() => {
    if (searchVisibility === SEARCH_HIDDEN) {
      removeDocumentOnClick();
      return;
    }

    addDocumentOnClick();
    addResultsRoving();

    const searchInput = Array.from(formRef.current.elements).find((input) => input.type === 'search');

    searchInput.focus();

    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVisibility]);

  function addDocumentOnClick() {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }

  function removeDocumentOnClick() {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }

  function handleOnDocumentClick(e) {
    if (!e.composedPath().includes(formRef.current)) {
      setSearchVisibility(SEARCH_HIDDEN);
      clearSearch();
    }
  }

  function handleOnSearch({ currentTarget }) {
    search({
      query: currentTarget.value,
    });
  }

  function handleOnToggleSearch() {
    setSearchVisibility(SEARCH_VISIBLE);
  }

  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }

  function removeResultsRoving() {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }

  function handleResultsRoving(e) {
    const focusElement = document.activeElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 'P') {
        focusElement.nextSibling.children[0].firstChild.firstChild.focus();
      } else if (focusElement.parentElement.nextSibling) {
        focusElement.parentElement.nextSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusElement.nodeName === 'A' && focusElement.parentElement.previousSibling) {
        focusElement.parentElement.previousSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.lastChild.firstChild.focus();
      }
    }
  }

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      clearSearch();
      setSearchVisibility(SEARCH_HIDDEN);
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={styles.nav}>
      <Section className={styles.navSection}>
        <div className={styles.navTopRow}>
          <p className={styles.navName}>
            <Link href="/">{title}</Link>
          </p>
          <div className={styles.navActionsMobile}>
            <button 
              className={styles.hamburgerBtn} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
          {mainCategories.map((cat) => (
            <li key={cat.label} onClick={() => setIsMenuOpen(false)}>
              <Link href={cat.slug === '' ? '/' : `/categories/${cat.slug}`}>
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.navSearch}>
          {searchVisibility === SEARCH_HIDDEN && (
            <button onClick={handleOnToggleSearch} disabled={!searchIsLoaded} aria-label="Toggle Search">
              <span className="sr-only">Toggle Search</span>
              <FaSearch />
            </button>
          )}
          {searchVisibility === SEARCH_VISIBLE && (
            <form ref={formRef} action="/search" data-search-is-active={!!query}>
              <input
                type="search"
                name="q"
                value={query || ''}
                onChange={handleOnSearch}
                autoComplete="off"
                placeholder="Search..."
                required
              />
              <div className={styles.navSearchResults}>
                {results.length > 0 && (
                  <ul>
                    {results.map(({ slug, title }, index) => {
                      return (
                        <li key={slug}>
                          <Link tabIndex={index} href={postPathBySlug(slug)}>
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {results.length === 0 && (
                  <p>
                    Sorry, not finding anything for <strong>{query}</strong>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </Section>
    </nav>
  );
};

export default Nav;
