import { createClient } from "contentful";
import BlogCard from "../components/BlogCard";

// Environment variables are automatically grabbed by Next.js
// Adds them to the process object
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "blogPosts",
  });

  return {
    props: {
      blogPosts: res.items,
      revalidate: 1,
    },
  };
}

// Any data added inside of the props object is passed to the BlogPosts component
export default function BlogPosts({ blogPosts }) {
  return (
    <>
      <h1 className="title">Featured articles</h1>
      <div className="blog-post-list">
        {blogPosts.map((post, index) => {
          return <BlogCard key={index} post={post} />;
        })}
      </div>
    </>
  );
}
