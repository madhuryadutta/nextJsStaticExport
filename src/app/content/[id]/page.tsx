import { Post } from "@/types";
import { Metadata } from "next";
const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

// ✅ Fetch a single post
async function getPost(id: string): Promise<Post> {
    const res = await fetch(`${apiUrl}/posts/${id}`);
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
        <div className="max-w-3xl mx-auto py-10 px-4">
            {/* ✅ Blog Header */}
            <BlogHeader title={post.title} />

            {/* ✅ Author & Meta Info */}
            <AuthorSection author="John Doe" date="Feb 18, 2025" />

            {/* ✅ Blog Content */}
            <BlogContent body={post.body} />

            {/* ✅ Tags */}
            <TagList tags={post.tags} />

            {/* ✅ Related Posts Placeholder */}
            <RelatedPosts />
        </div>
    );
}


// Blog Header
function BlogHeader({ title }: { title: string }) {
    return <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>;
}

// Author Section
function AuthorSection({ author, date }: { author: string; date: string }) {
    return (
        <div className="text-gray-600 text-sm mb-6">
            <p>
                By <span className="font-medium text-gray-900">{author}</span> • {date}
            </p>
        </div>
    );
}

// Blog Content
function BlogContent({ body }: { body: string }) {
    return (
        <div className="text-gray-700 leading-relaxed text-lg bg-white p-6 rounded-xl shadow-md">
            <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
    );
}

// Tags List
function TagList({ tags }: { tags: string[] }) {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

// Related Posts Placeholder
function RelatedPosts() {
    return (
        <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Posts</h3>
            <p className="text-gray-500">More posts will be displayed here...</p>
        </div>
    );
}

// ✅ Generate Static Paths for Build-Time Export
export async function generateStaticParams() {

    const res = await fetch(apiUrl + "/posts");
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
