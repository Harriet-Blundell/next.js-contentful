import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

// Next.js is generating a static page for every single path at build time
export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: "blogPosts",
  });

  const paths = res.items.map((post) => {
    return {
      params: {
        slug: post.fields.slug,
      },
    };
  });

  // Next.js uses the array of objects to build static pages for each path
  return {
    paths,
    fallback: false,
  };
}

// Every time getStaticPaths() is run and it generates the individual paths for the pages
// passes in a context object (params property) to getStaticProps every time the function runs
// the slug field will allow us to limit the request to just get the individual post
// we want the field of slug to match the value of slug - unique field (contentful)
export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "blogPosts",
    "fields.slug": params.slug,
  });

  return {
    props: {
      blog: items[0],
      revalidate: 10,
    },
  };
}

export default function BlogPostDetails({ blog }) {
  const { title, author, thumbnail, avatar, mainBlogContent } = blog.fields;
  return (
    <div className="blog-post-details-container">
      <h1>{title}</h1>
      <div className="blog-author-container">
        <Image
          className="avatar"
          src={`https:${avatar.fields.file.url}`}
          alt={avatar.fields.description}
          width={40}
          height={40}
        />
        <p className="blog-author">By {author}</p>
      </div>
      <Image
        className="image"
        src={`https:${thumbnail.fields.file.url}`}
        alt={thumbnail.fields.title}
        width={550}
        height={322}
      />
      <div className="content-container">
        {mainBlogContent?.content?.map((content, index) => {
          return <p key={index}>{documentToReactComponents(content)}</p>;
        })}
      </div>
    </div>
  );
}
