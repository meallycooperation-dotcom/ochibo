import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Search,
  Star,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ReviewModal({
  open,
  onClose,
}: Props) {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [projectCode, setProjectCode] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);

  const [projectName, setProjectName] = useState("");

  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const resetState = () => {
    setVerified(false);
    setLoading(false);
    setVerifyError(null);
    setProjectCode("");
    setProjectId(null);
    setProjectName("");
    setClientName("");
    setCompany("");
    setCountry("");
    setRating(5);
    setReviewText("");
    setSubmitting(false);
    setFeedback(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const verifyProject = async () => {
    if (!projectCode.trim()) return;
    setLoading(true);
    setVerifyError(null);

    const { data, error } = await supabase
      .from("projects")
      .select("id, title")
      .eq("project_code", projectCode.trim())
      .single();

    if (error || !data) {
      setVerifyError("Invalid project code. Please check and try again.");
      setLoading(false);
      return;
    }

    setProjectId(data.id);
    setProjectName(data.title);
    setVerified(true);
    setLoading(false);
  };

  const submitReview = async () => {
    if (!clientName.trim() || !reviewText.trim() || !projectId) return;
    setSubmitting(true);
    setFeedback(null);

    const { data: existing, error: checkError } = await supabase
      .from("reviews")
      .select("id")
      .eq("project_id", projectId)
      .maybeSingle();

    if (checkError) {
      setFeedback("Unable to verify your review right now.");
      setSubmitting(false);
      return;
    }

    if (existing) {
      setFeedback("A review has already been submitted for this project.");
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from("reviews").insert([
      {
        client_name: clientName.trim(),
        company: company.trim() || null,
        country: country.trim() || null,
        project_id: projectId,
        rating,
        review: reviewText.trim(),
      },
    ]);

    if (insertError) {
      setFeedback("Unable to submit your review right now.");
      setSubmitting(false);
      return;
    }

    setFeedback("success");
    setSubmitting(false);
  };

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-5"
        >

          <motion.div
            initial={{
              scale: .9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: .9,
              opacity: 0,
            }}
            className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden"
          >

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-orange-100 px-8 py-6">

              <div>

                <h2 className="text-3xl font-black">
                  Leave a Review
                </h2>

                <p className="text-gray-500 mt-1">
                  Thank you for working with me
                </p>

              </div>

              <button
                onClick={handleClose}
              >
                <X />
              </button>

            </div>

            {/* BODY */}

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">

              {/* VERIFY */}

              {!verified && (

                <>

                  <div>

                    <label className="font-medium">

                      Project Code

                    </label>

                    <input
                      value={projectCode}
                      onChange={(e) =>
                        setProjectCode(e.target.value)
                      }
                      placeholder="Example: KODI-2026-001"
                      className="mt-3 w-full rounded-xl border border-orange-200 p-4 outline-none focus:border-orange-500"
                    />

                  </div>

                  {verifyError && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {verifyError}
                    </div>
                  )}

                  <button
                    onClick={verifyProject}
                    disabled={loading}
                    className="w-full bg-orange-500 text-white rounded-xl py-4 flex justify-center items-center gap-3 hover:bg-orange-600"
                  >

                    {loading ? (
                      <>
                        <Loader2
                          className="animate-spin"
                          size={20}
                        />

                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search size={18} />

                        Verify Project
                      </>
                    )}

                  </button>

                </>

              )}

              {/* VERIFIED */}

              {verified && (

                <>

                  <div className="rounded-2xl bg-green-50 border border-green-300 p-5 flex gap-4">

                    <CheckCircle2
                      className="text-green-600"
                    />

                    <div>

                      <h3 className="font-bold">

                        Project Verified

                      </h3>

                      <p className="text-gray-500">

                        {projectName}

                      </p>

                    </div>

                  </div>

                  {/* NAME */}

                  <div>

                    <label>

                      Your Name

                    </label>

                    <input
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-orange-200 p-4 outline-none focus:border-orange-500"
                    />

                  </div>

                  {/* COMPANY */}

                  <div>

                    <label>

                      Company (Optional)

                    </label>

                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-orange-200 p-4 outline-none focus:border-orange-500"
                    />

                  </div>

                  {/* COUNTRY */}

                  <div>

                    <label>

                      Country (Optional)

                    </label>

                    <input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-orange-200 p-4 outline-none focus:border-orange-500"
                    />

                  </div>

                  {/* RATING */}

                  <div>

                    <label>

                      Rating

                    </label>

                    <div className="flex gap-2 mt-4">

                      {[1,2,3,4,5].map((star)=>(
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                        >
                          <Star
                            size={35}
                            fill={
                              star <= rating
                                ? "#f97316"
                                : "transparent"
                            }
                            color="#f97316"
                          />
                        </button>
                      ))}

                    </div>

                  </div>

                  {/* REVIEW */}

                  <div>

                    <label>

                      Review

                    </label>

                    <textarea
                      rows={6}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Tell others what it was like working with Brian..."
                      className="mt-2 w-full rounded-xl border border-orange-200 p-4 resize-none outline-none focus:border-orange-500"
                    />

                  </div>

                  {/* BUTTON */}

                  {feedback && (
                    <p className={feedback === "success" ? "text-green-600" : "text-red-600"}>
                      {feedback === "success" ? "Review submitted successfully!" : feedback}
                    </p>
                  )}

                  <button
                    onClick={submitReview}
                    disabled={submitting}
                    className="w-full rounded-xl bg-orange-500 py-4 text-white font-semibold hover:bg-orange-600 transition disabled:cursor-not-allowed disabled:opacity-70 flex justify-center items-center gap-3"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}

                  </button>

                </>

              )}

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}
