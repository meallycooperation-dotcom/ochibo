import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
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

const fallbackAvatar = "https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg";

const Testimonials = () => {
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
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        setError("Unable to load testimonials right now.");
        setReviews([]);
        setLoading(false);
        return;
      }

      setReviews((data ?? []) as ReviewItem[]);
      setLoading(false);
    };

    void loadReviews();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading testimonials...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-gray-400">No testimonials available yet.</p>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {reviews.map((review, index) => {
        const reviewImage = getSupabaseImageUrl("review-images", review.avatar) ?? fallbackAvatar;
        const rating = review.rating ?? 5;

        return (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-orange-200 bg-white p-8"
          >
            <Quote className="mb-6 text-orange-500" size={30} />

            <p className="text-neutral-800 leading-8">“{review.review}”</p>

            <div className="mt-6 flex gap-1">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} size={16} fill="#f97316" color="#f97316" />
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <img
                src={reviewImage}
                alt={review.client_name}
                className="h-14 w-14 rounded-full border border-orange-500 object-cover"
              />

              <div>
                <h3 className="font-semibold text-neutral-900">{review.client_name}</h3>
                <p className="text-sm text-gray-600">
                  {review.company ?? review.position ?? "Client"}
                </p>
                <p className="text-sm text-orange-500">{review.country ?? "Worldwide"}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Testimonials;
