import { Post } from "@/types";
import { Metadata } from "next";

// ✅ Fetch a single post
async function getPost(id: string): Promise<Post> {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
}

// ✅ Ensure `params` is properly awaited
export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // if (!params?.id) return <p>Error: Invalid post ID.</p>;
    if (!id) return <p>Error: Invalid post ID.</p>;

    const post = await getPost(id);

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}

// ✅ Generate Static Paths for Build-Time Export
export async function generateStaticParams() {
    const res = await fetch("https://dummyjson.com/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data = await res.json();

    return data.posts.map((post: Post) => ({
        id: post.id.toString(), // Convert ID to string for static paths
    }));
}

// ✅ Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;

    const post = await getPost(id);
    return {
        title: post.title,
        description: post.body.slice(0, 100), // First 100 characters
    };
}
