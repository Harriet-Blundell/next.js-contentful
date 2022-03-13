import React from "react";
import Image from "next/image";
import Link from "next/link";

// Image component auto optimises images from an external website
// Specify which domains are allowed to be optimised

export default function BlogCard({ post }) {
  const {
    slug,
    title,
    briefDescription,
    author,
    dateCreated,
    thumbnail,
    avatar,
  } = post.fields;
  return (
    <div className="blog-posts-container">
      <Image
        class="blog-image"
        src={`https:${thumbnail.fields.file.url}`}
        alt={thumbnail.fields.title}
        width={430}
        height={322}
      />
      <Link href={"/blog-posts/" + slug}>
        <a className="blog-title">{title}</a>
      </Link>
      <h3 className="brief-description">{briefDescription}</h3>
      <div className="blog-author-container">
        <Image
          class="avatar"  
          src={`https:${avatar.fields.file.url}`}
          alt={avatar.fields.description}
          width={40}
          height={40}
        />
        <p className="blog-author">By {author}</p>
      </div>
      <p className="blog-date-created">{dateCreated}</p>
    </div>
  );
}
