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

  return (
    <footer className={styles.footer}>
      <Section className={styles.footerMenu}>
        <Container>
          {/* Ab yahan sirf 3 columns rahenge, CSS grid/flex inka size barabar kar dega */}
          <ul className={styles.footerMenuColumns} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            
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

            {/* Column 3: More (Purana 4th column ab 3rd ban gaya hai) */}
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
