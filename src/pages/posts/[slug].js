import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPostBySlug, getRelatedPosts } from 'lib/posts';
import { categoryPathBySlug, postPathBySlug } from 'lib/categories';
import { formatDate } from 'lib/datetime';
import { articleSchema } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ post = {}, related = {} }) {
  const {
    title,
    content,
    date,
    categories,
    og,
  } = post;

  const helmetTitle = title ? `${title}` : 'Post';
  const relatedCategory = related?.posts?.[0]?.categories?.[0];
  const relatedPostsList = related?.posts || [];

  return (
    <Layout>
      <Helmet>
        <title>{helmetTitle}</title>
        <meta name="description" content={`Read ${title || ''}`} />
        {og?.imageUrl && <meta property="og:image" content={og.imageUrl} />}
        {og?.imageWidth && <meta property="og:image:width" content={og.imageWidth} />}
        {og?.imageHeight && <meta property="og:image:height" content={og.imageHeight} />}
        <meta property="og:title" content={title || ''} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Header>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.postMetadata}>
          {date && <time dateTime={date}>{formatDate(date)}</time>}
          {Array.isArray(categories) && categories.length > 0 && (
            <span>
              {' '}
              in{' '}
              {categories.map((category, index) => (
                <span key={category.slug || index}>
                  <Link href={categoryPathBySlug(category.slug)}>{category.name}</Link>
                  {index < categories.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          )}
        </p>
      </Header>

      <Section>
        <Container>
          <div className={styles.postLayout}>
            {/* Main Article Content */}
            <article className={styles.mainArticle}>
              {content && (
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              )}
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
                      <li key={relatedPost.slug || relatedPost.title}>
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
      related: related || {},
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
