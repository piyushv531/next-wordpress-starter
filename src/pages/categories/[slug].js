import { getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export default function Category({ category, posts = [] }) {
  // If category is not found, display a fallback message instead of crashing
  if (!category) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>Category Not Found</h1>
        <p>Sorry, we could not find this category or fetch posts from the server.</p>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>Back to Home</a>
      </div>
    );
  }

  const { name = '', description = '', slug = '' } = category;
  const safePosts = Array.isArray(posts) ? posts : [];

  const { metadata } = usePageMetadata({
    metadata: {
      ...category,
      description: description || category?.og?.description || `Read ${safePosts.length} posts from ${name}`,
    },
  });

  return (
    <TemplateArchive 
      title={name} 
      Title={<Title title={name} />} 
      posts={safePosts} 
      slug={slug} 
      metadata={metadata} 
    />
  );
}

export async function getStaticProps({ params = {} } = {}) {
  try {
    const data = await getCategoryBySlug(params?.slug);
    const category = data?.category;

    if (!category) {
      return {
        props: {},
        notFound: true,
      };
    }

    const postsData = await getPostsByCategoryId({
      categoryId: category.databaseId,
      queryIncludes: 'archive',
    });

    const posts = postsData?.posts;

    return {
      props: {
        category,
        posts: Array.isArray(posts) ? posts : [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return {
      props: {
        category: null,
        posts: [],
      },
      revalidate: 10,
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'movies' } },
      { params: { slug: 'tv' } },
      { params: { slug: 'reviews' } },
      { params: { slug: 'box-office' } },
      { params: { slug: 'gaming' } },
      { params: { slug: 'tech' } },
    ],
    fallback: 'blocking',
  };
}
