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
        className="blog-image"
        src={`https:${thumbnail.fields.file.url}`}
        alt={thumbnail.fields.title}
        width={430}
        height={322}
      />
      <Link href={"/blog-posts/" + slug}>
        <a className="blog-title">{title}</a>
      </Link>
      <p className="brief-description">{briefDescription}</p>
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
      <p className="blog-date-created">{dateCreated}</p>
    </div>
  );
}
