import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPostBySlug, getRelatedPosts, getCategoryBySlug } from 'lib/posts';
import { categoryPathBySlug, postPathBySlug } from 'lib/categories';
import { formatDate } from 'lib/datetime';
import { articleSchema } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import ContentBox from 'components/ContentBox';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ post, socialImage, related }) {
  const {
    title,
    metadata,
    content,
    date,
    modified,
    categories,
    isSticky = false,
  } = post;

  const { title: statsTitle, image: statsImage } = metadata || {};

  const relatedCategory = related?.posts?.[0]?.categories?.[0];
  const relatedPostsList = related?.posts || [];

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Read ${title}`} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Header>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.postMetadata}>
          <time dateTime={date}>{formatDate(date)}</time>
          {Array.isArray(categories) && categories.length > 0 && (
            <span>
              {' '}
              in{' '}
              {categories.map((category, index) => (
                <span key={category.slug}>
                  <Link href={categoryPathBySlug(category.slug)}>{category.name}</Link>
                  {index < categories.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          )}
        </p>
      </Header>

      <ContentBox>
        <Section>
          <Container>
            <div className={styles.postLayout}>
              {/* Main Article Content */}
              <article className={styles.mainArticle}>
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              </article>

              {/* Sidebar with Search Bar & Related Posts */}
              <aside className={styles.sidebar}>
                {/* Search Bar Widget */}
                <div className={styles.widget}>
                  <form action="/search" method="get" className={styles.searchForm}>
                    <input
                      type="search"
                      name="q"
                      placeholder="Search posts..."
                      className={styles.searchInput}
                      required
                    />
                    <button type="submit" className={styles.searchButton}>
                      Search
                    </button>
                  </form>
                </div>

                {/* Related Posts Widget */}
                <div className={styles.widget}>
                  <h3 className={styles.widgetTitle}>
                    {relatedCategory?.name ? `More from ${relatedCategory.name}` : 'Related Posts'}
                  </h3>
                  {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 ? (
                    <ul className={styles.widgetList}>
                      {relatedPostsList.map((relatedPost) => (
                        <li key={relatedPost.title}>
                          <Link href={postPathBySlug(relatedPost.slug)}>{relatedPost.title}</Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No related posts available.</p>
                  )}
                </div>
              </aside>
            </div>
          </Container>
        </Section>
      </ContentBox>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const { categories, id } = post;

  const relatedCategory = categories?.[0];
  const related = await getRelatedPosts(relatedCategory, id);

  return {
    props: {
      post,
      related,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
