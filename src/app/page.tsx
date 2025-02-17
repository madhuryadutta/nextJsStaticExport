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
    // <div>
    //   <h1>Blog Posts</h1>
    //   <ul>
    //     {posts.map((post) => (
    //       <li key={post.id}>
    //         <Link href={`/content/${post.id}`}>{post.title}</Link>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="max-w-4xl mx-auto py-10">
      {/* ✅ Page Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Blog Posts</h1>

      {/* ✅ Blog List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/content/${post.id}`} className="block">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              {/* ✅ Blog Title */}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>

              {/* ✅ Blog Preview */}
              <p className="text-gray-600 text-sm">{post.body.slice(0, 100)}...</p>

              {/* ✅ Read More */}
              <div className="mt-4">
                <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
