import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Star,
  Quote,
  Filter,
  ArrowRight,
} from "lucide-react";
import { getSupabaseImageUrl, supabase } from "../lib/supabase";

type ReviewItem = {
  id: string;
  client_name: string;
  company: string | null;
  position: string | null;
  country: string | null;
  avatar: string | null;
  rating: number | null;
  review: string;
  featured: boolean | null;
  created_at: string | null;
};

const fallbackAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200";

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("reviews")
        .select("id,client_name,company,position,country,avatar,rating,review,featured,created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Unable to load reviews right now.");
        setReviews([]);
        setLoading(false);
        return;
      }

      setReviews((data ?? []) as ReviewItem[]);
      setLoading(false);
    };

    void loadReviews();
  }, []);

  const averageRating = reviews.length
    ? (reviews.reduce((total, review) => total + (review.rating ?? 0), 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <main className="bg-rose-50 text-neutral-900 min-h-screen">
      {/* Hero */}

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-200/30 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="uppercase tracking-[0.4em] text-orange-500"
          >
            Testimonials
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-7xl font-black mt-5"
          >
            Client Reviews
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg mt-8 max-w-3xl leading-8"
          >
            Every successful project is built on trust, communication and quality. Here’s what clients have to say about working with me.
          </motion.p>
        </div>
      </section>

      {/* Stats */}

      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-orange-200 bg-white p-10 text-center">
            <h2 className="text-5xl font-black text-orange-500">{averageRating}</h2>

            <div className="flex justify-center mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#f97316" color="#f97316" />
              ))}
            </div>

            <p className="text-gray-600 mt-5">Average Rating</p>
          </div>

          <div className="rounded-3xl border border-orange-200 bg-white p-10 text-center">
            <h2 className="text-5xl font-black">{reviews.length}+</h2>
            <p className="text-gray-600 mt-5">Happy Clients</p>
          </div>

          <div className="rounded-3xl border border-orange-200 bg-white p-10 text-center">
            <h2 className="text-5xl font-black">100%</h2>
            <p className="text-gray-600 mt-5">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Filter */}

      <section className="max-w-7xl mx-auto px-6 mb-14">
        <button className="flex items-center gap-3 border border-orange-200 bg-white rounded-full px-6 py-3 hover:bg-orange-500 hover:text-white transition">
          <Filter size={18} />
          Latest Reviews
        </button>
      </section>

      {/* Reviews */}

      <section className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          <p className="text-gray-600">Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-600">No reviews have been published yet.</p>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {reviews.map((review, index) => {
              const reviewImage = getSupabaseImageUrl("review-images", review.avatar) ?? fallbackAvatar;
              const rating = review.rating ?? 5;

              return (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="rounded-3xl border border-orange-200 bg-white p-8"
                >
                  <Quote className="text-orange-500 mb-6" size={34} />

                  <p className="text-gray-300 leading-8 text-lg">“{review.review}”</p>

                  <div className="flex mt-8">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#f97316" color="#f97316" />
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-10">
                    <div className="flex items-center gap-4">
                      <img
                        src={reviewImage}
                        alt={review.client_name}
                        className="w-16 h-16 rounded-full object-cover border border-orange-500"
                      />

                      <div>
                        <h3 className="font-semibold text-lg">{review.client_name}</h3>
                        <p className="text-gray-400">{review.company ?? review.position ?? "Client"}</p>
                        <p className="text-sm text-cyan-400">{review.country ?? "Worldwide"}</p>
                      </div>
                    </div>

                    <ArrowRight className="text-gray-500" size={22} />
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

export default Reviews;