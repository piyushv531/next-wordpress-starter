import { getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export default function Category({ category, posts = [] }) {
  // Agar category na mile toh white screen ki jagah yeh message dikhega
  if (!category) {
    return (
      <div style={{ padding: '5rem 1rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Category Not Found</h1>
        <p style={{ color: '#666' }}>WordPress se is category ka data fetch nahi ho pa raha hai. Kripya check karein ki slug sahi hai ya nahi.</p>
        <p style={{ marginTop: '2rem' }}>
          <a href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>Go back home</a>
        </p>
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
  console.log("Requested Slug from URL:", params?.slug);

  const response = await getCategoryBySlug(params?.slug);
  console.log("WordPress Response:", JSON.stringify(response, null, 2));

  const { category } = response || {};

  if (!category) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { posts } = (await getPostsByCategoryId({
    categoryId: category.databaseId,
    queryIncludes: 'archive',
  })) || {};

  return {
    props: {
      category,
      posts: Array.isArray(posts) ? posts : [],
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
