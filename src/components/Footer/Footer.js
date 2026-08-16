import Link from 'next/link';

import useSite from 'hooks/use-site';
import { postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';

import Section from 'components/Section';
import Container from 'components/Container';

import styles from './Footer.module.scss';

const Footer = () => {
  const { metadata = {}, recentPosts = [] } = useSite();
  const { title } = metadata;

  const latestFivePosts = Array.isArray(recentPosts) ? recentPosts.slice(0, 5) : [];
  const hasRecentPosts = latestFivePosts.length > 0;

  // Hardcoded 5 categories list
  const fixedCategories = [
    { name: 'AI', slug: 'ai' },
    { name: 'Celebs', slug: 'celebs' },
    { name: 'Marvel', slug: 'marvel' },
    { name: 'DC', slug: 'dc' },
    { name: 'Gadgets', slug: 'gadgets' },
  ];

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

            {/* Column 3: Categories (Fixed 5 Line-by-Line Links) */}
            <li>
              <Link href="/categories/" className={styles.footerMenuTitle}>
                <strong>Categories</strong>
              </Link>
              <ul className={styles.footerMenuItems}>
                {fixedCategories.map((category) => (
                  <li key={category.slug}>
                    <Link href={categoryPathBySlug(category.slug)}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
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
