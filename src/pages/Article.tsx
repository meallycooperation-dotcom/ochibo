import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock3,
  Eye,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

import { supabase, getSupabaseImageUrl } from "../lib/supabase";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string |null;
  cover_image: string | null;
  tags: string[] | null;
  reading_time: number | null;
  views: number | null;
  created_at: string | null;
};

const fallback =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600";

const contentHasHtml = (text: string) => /<[a-z][\s\S]*>/i.test(text);

const plainToHtml = (text: string) => {
  const blocks = text.split(/\n\s*\n/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      return `<p>${trimmed}</p>`;
    })
    .join("\n");
};

const Article = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState<Blog | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        setError("Article not found.");
        setLoading(false);
        return;
      }

      setBlog(data);

      await supabase
        .from("blogs")
        .update({
          views: (data.views ?? 0) + 1,
        })
        .eq("id", data.id);

      setLoading(false);
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-rose-50 flex justify-center items-center">
        <p className="text-xl">Loading article...</p>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-rose-50 flex justify-center items-center">
        <p className="text-red-500 text-xl">{error}</p>
      </main>
    );
  }

  const image =
    getSupabaseImageUrl("blog-images", blog.cover_image) ??
    fallback;

  return (
    <main className="bg-rose-50 min-h-screen">

      {/* HERO */}

      <section className="relative h-[70vh] overflow-hidden">

        <img
          src={image}
          className="absolute inset-0 h-full w-full object-cover"
          alt={blog.title}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col justify-end pb-20 text-white">

          <Link
            to="/blog"
            className="flex items-center gap-2 mb-8 text-orange-300 hover:text-white transition"
          >
            <ArrowLeft size={18} />

            Back to Articles
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black max-w-5xl"
          >
            {blog.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            className="mt-8 text-xl text-gray-200 max-w-3xl"
          >
            {blog.excerpt}
          </motion.p>

          <div className="flex flex-wrap gap-8 mt-10 text-sm">

            <div className="flex items-center gap-2">
              <Calendar size={18} />

              {blog.created_at
                ? new Date(blog.created_at).toLocaleDateString()
                : ""}
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />

              {blog.reading_time ?? 5} min read
            </div>

            <div className="flex items-center gap-2">
              <Eye size={18} />

              {blog.views ?? 0} views
            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="py-24">

        <div className="max-w-4xl mx-auto px-6">

          {blog.tags && (

            <div className="flex flex-wrap gap-3 mb-12">

              {blog.tags.map((tag) => (

                <span
                  key={tag}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600"
                >
                  <Tag size={15} />

                  {tag}
                </span>

              ))}

            </div>

          )}

          <article
            className="
            prose
            prose-lg
            prose-neutral
            max-w-none
            prose-headings:text-neutral-900
            prose-p:text-neutral-700
            prose-p:leading-9
            prose-img:rounded-3xl
            prose-a:text-orange-500
            "
            dangerouslySetInnerHTML={{
              __html: blog.content
                ? contentHasHtml(blog.content)
                  ? blog.content
                  : plainToHtml(blog.content)
                : "",
            }}
          />

        </div>

      </section>

    </main>
  );
};

export default Article;