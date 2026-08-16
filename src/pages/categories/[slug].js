import { getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export default function Category({ category, posts = [] }) {
  // Safety check agar category undefined/null mile
  if (!category) {
    return null;
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
  const { category } = (await getCategoryBySlug(params?.slug)) || {};

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
    revalidate: 60, // Server response fail-safe optimization
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
