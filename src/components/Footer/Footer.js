import { useRouter } from 'next/router';
import Link from 'next/link';

import useSite from 'hooks/use-site';
import { postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';

import Section from 'components/Section';
import Container from 'components/Container';

import styles from './Footer.module.scss';

const Footer = () => {
  const router = useRouter();
  const { metadata = {}, recentPosts = [], categories = [] } = useSite();
  const { title } = metadata;

  const latestFivePosts = Array.isArray(recentPosts) ? recentPosts.slice(0, 5) : [];
  const hasRecentPosts = latestFivePosts.length > 0;
  const hasCategories = Array.isArray(categories) && categories.length > 0;

  const handleCategoryChange = (e) => {
    const selectedSlug = e.target.value;
    if (selectedSlug) {
      router.push(categoryPathBySlug(selectedSlug));
    }
  };

  return (
    <footer className={styles.footer}>
      <Section className={styles.footerMenu}>
        <Container>
          <ul className={styles.footerMenuColumns}>
            {/* Column 1: Site Info */}
            <li>
              <p className={styles.footerMenuTitle}>
                <strong>{title || 'Entertainment Surge'}</strong>
              </p>
              <p className={styles.footerAbout}>
                Entertainment Surge - Riding the wave of digital media—bringing you the latest in movies, memes, gaming, tech and viral culture.
              </p>
            </li>

            {/* Column 2: Recent Posts (Max 5) */}
            <li>
              <Link className={styles.footerMenuTitle} href="/posts/">
                <strong>Recent Posts</strong>
              </Link>
              {hasRecentPosts && (
                <ul className={styles.footerMenuItems}>
                  {latestFivePosts.map((post) => {
                    const { id, slug, title } = post;
                    return (
                      <li key={id || slug}>
                        <Link href={postPathBySlug(slug)}>{title}</Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            {/* Column 3: Categories Dropdown */}
            <li>
              <Link href="/categories/" className={styles.footerMenuTitle}>
                <strong>Categories</strong>
              </Link>
              {hasCategories && (
                <div className={styles.categoryDropdownWrapper}>
                  <select
                    className={styles.categorySelect}
                    onChange={handleCategoryChange}
                    defaultValue=""
                    aria-label="Select Category"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) => {
                      const { id, slug, name } = category;
                      return (
                        <option key={id || slug} value={slug}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </li>

            {/* Column 4: More */}
            <li>
              <p className={styles.footerMenuTitle}>
                <strong>More</strong>
              </p>
              <ul className={styles.footerMenuItems}>
                <li>
                  <a href="/feed.xml">RSS</a>
                </li>
                <li>
                  <a href="/sitemap.xml">Sitemap</a>
                </li>
              </ul>
            </li>
          </ul>
        </Container>
      </Section>

      <Section className={styles.footerLegal}>
        <Container>
          <p>
            &copy; {new Date().getFullYear()} {title || 'Entertainment Surge'}
          </p>
        </Container>
      </Section>
    </footer>
  );
};

export default Footer;
