import { createClient } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// asynchronous to collect data
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
    },
  };
}

// Any data added inside of the props object is passed to the BlogPosts component
export default function BlogPosts({ blogPosts }) {
  return (
    <div className="blog-post-list">
      <h1 className="title">Featured articles</h1>
      {blogPosts.map((posts, index) => {
        return (
          <div key={index} className="blog-posts-container">
            <Link href={"/blog-posts/" + posts.fields.slug}>
              <a key={index} className="blog-title">
                {posts.fields.title}
              </a>
            </Link>
            <h3 className="brief-description">
              {posts.fields.briefDescription}
            </h3>
            <p className="blog-author">By {posts.fields.author}</p>
            <p className="blog-date-created">{posts.fields.dateCreated}</p>
          </div>
        );
      })}
    </div>
  );
}

// figure out how to convert rich text from markdown
