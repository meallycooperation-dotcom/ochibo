import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock3,
  Search,
  Tag,
} from "lucide-react";
import { getSupabaseImageUrl, supabase } from "../lib/supabase";

const categories = [
  "All",
  "Development",
  "React",
  "TypeScript",
  "Supabase",
  "Blender",
  "Tutorials",
];

type BlogItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  tags: string[] | null;
  published: boolean | null;
  featured: boolean | null;
  reading_time: number | null;
  views: number | null;
  created_at: string | null;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("blogs")
        .select("id,title,slug,excerpt,content,cover_image,tags,published,featured,reading_time,views,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        setError("Unable to load blog posts right now.");
        setBlogs([]);
        setLoading(false);
        return;
      }

      setBlogs((data ?? []) as BlogItem[]);
      setLoading(false);
    };

    void loadBlogs();
  }, []);

  const featuredBlog = blogs.find((blog) => blog.featured) ?? blogs[0];

  return (
    <main className="min-h-screen bg-rose-50 text-neutral-900">
      {/* Hero */}

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-200/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="uppercase tracking-[0.35em] text-orange-500"
          >
            My Journal
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black mt-5"
          >
            Blogs & Tutorials
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-3xl mt-8 leading-8"
          >
            Thoughts on software development, UI/UX, React, TypeScript, Supabase, Blender and everything I learn while building products.
          </motion.p>
        </div>
      </section>

      {/* Featured */}

      <section className="max-w-7xl mx-auto px-6 mb-20">
        {featuredBlog ? (
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-orange-200 bg-white"
          >
            <img
              src={getSupabaseImageUrl("blog-images", featuredBlog.cover_image) ?? fallbackImage}
              alt={featuredBlog.title}
              className="h-full w-full object-cover"
            />

            <div className="p-10 flex flex-col justify-center">
              <span className="text-orange-500 uppercase tracking-widest text-sm">
                Featured Article
              </span>

              <h2 className="text-4xl font-bold mt-5">{featuredBlog.title}</h2>

              <p className="text-gray-600 mt-6 leading-8">
                {featuredBlog.excerpt ?? "A recent article from the journal."}
              </p>

              <button className="mt-10 flex items-center gap-2 text-orange-500 hover:gap-4 transition-all">
                Read Article
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </section>

      {/* Search */}

      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              placeholder="Search article..."
              className="w-full rounded-2xl border border-orange-200 bg-white py-4 pl-14 pr-5 outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full border border-orange-200 px-5 py-3 bg-white hover:bg-orange-500 hover:text-white transition"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}

      <section className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          <p className="text-gray-600">Loading articles...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-600">No blog posts have been published yet.</p>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog, index) => {
              const blogDate = blog.created_at
                ? new Date(blog.created_at).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recently published";
              const readTime = blog.reading_time ? `${blog.reading_time} min` : "Quick read";
              const tag = blog.tags?.[0] ?? "Article";
              const blogImage = getSupabaseImageUrl("blog-images", blog.cover_image) ?? fallbackImage;

              return (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="overflow-hidden rounded-3xl border border-orange-200 bg-white group"
                >
                  <div className="overflow-hidden h-64">
                    <img
                      src={blogImage}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
                      <div className="flex items-center gap-2">
                        <Calendar size={15} />
                        {blogDate}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={15} />
                        {readTime}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold leading-tight">{blog.title}</h3>

                    <p className="text-gray-600 mt-5 leading-7">
                      {blog.excerpt ?? "A new article from the journal."}
                    </p>

                    <div className="flex justify-between items-center mt-8">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Tag size={16} />
                        {tag}
                      </div>

                      <button className="flex items-center gap-2 hover:text-orange-500 transition">
                        Read
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Blog;