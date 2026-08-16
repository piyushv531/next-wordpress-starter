import Link from 'next/link';

import useSite from 'hooks/use-site';
import { postPathBySlug } from 'lib/posts';

import Section from 'components/Section';
import Container from 'components/Container';

import styles from './Footer.module.scss';

const Footer = () => {
  const { metadata = {}, recentPosts = [] } = useSite();
  const { title } = metadata;

  const latestFivePosts = Array.isArray(recentPosts) ? recentPosts.slice(0, 5) : [];
  const hasRecentPosts = latestFivePosts.length > 0;

  // Categories list for the dropdown in the 4th column
  const categories = [
    { label: 'Movies', slug: 'movies' },
    { label: 'TV', slug: 'tv' },
    { label: 'Reviews', slug: 'reviews' },
    { label: 'Box Office', slug: 'box-office' },
    { label: 'Gaming', slug: 'gaming' },
    { label: 'Tech', slug: 'tech' },
  ];

  const handleCategoryChange = (e) => {
    const slug = e.target.value;
    if (slug) {
      window.location.href = `/categories/${slug}`;
    }
  };

  return (
    <footer className={styles.footer}>
      <Section className={styles.footerMenu}>
        <Container>
          {/* 4 columns layout with equal width using repeat(4, 1fr) */}
          <ul className={styles.footerMenuColumns} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            
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

            {/* Column 3: More (RSS & Sitemap) */}
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

            {/* Column 4: Categories Dropdown */}
            <li>
              <p className={styles.footerMenuTitle}>
                <strong>Categories</strong>
              </p>
              <div style={{ marginTop: '1rem' }}>
                <select 
                  onChange={handleCategoryChange} 
                  defaultValue=""
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    color: '#333',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
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
