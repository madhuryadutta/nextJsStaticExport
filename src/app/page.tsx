import Link from "next/link";
import { Post } from "@/types/post";

// ✅ Fetch all posts at build time
async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  return data.posts;
}

// ✅ Home Page Component
export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/content/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
