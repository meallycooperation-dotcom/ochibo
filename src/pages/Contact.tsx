import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
import { supabase } from "../lib/supabase";

type FormState = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        subject: form.subject.trim() || null,
        message: form.message.trim(),
      },
    ]);

    if (error) {
      setFeedback("Unable to send your message right now. Please try again later.");
      setSubmitting(false);
      return;
    }

    setFeedback("Your message has been sent successfully.");
    setForm(initialFormState);
    setSubmitting(false);
  };
  return (
    <main className="min-h-screen bg-rose-50 text-neutral-900">

      {/* Hero */}

      <section className="relative py-32 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-orange-200/30 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="uppercase tracking-[0.4em] text-orange-500"
          >
            Contact
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-7xl font-black mt-5"
          >
            Let's Work Together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            className="mt-8 max-w-3xl text-lg text-gray-600 leading-8"
          >
            Whether you need a website, a web application,
            UI/UX design, or 3D visuals, I'd love to hear
            about your project.
          </motion.p>

        </div>

      </section>

      {/* Contact Section */}

      <section className="max-w-7xl mx-auto px-6 pb-32">

        <div className="grid lg:grid-cols-5 gap-12">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >

            <div className="rounded-3xl bg-white border border-orange-200 p-8">

              <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm">
                ● Available for Freelance
              </span>

              <h2 className="text-3xl font-bold mt-6">
                Get in Touch
              </h2>

              <p className="text-gray-600 mt-5 leading-8">
                Feel free to reach out for collaborations,
                freelance work or just to say hello.
              </p>

            </div>

            <div className="rounded-3xl bg-white border border-orange-200 p-8 space-y-6">

              <div className="flex items-center gap-4">

                <Mail className="text-orange-500" />

                <div>

                  <p className="text-gray-600 text-sm">
                    Email
                  </p>

                  <p className="text-neutral-900">
                    meallycooperation@gmail.com
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <Phone className="text-orange-500" />

                <div>

                  <p className="text-gray-600 text-sm">
                    Phone
                  </p>

                  <p className="text-neutral-900">
                    +254 112 224 991
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <MapPin className="text-orange-500" />

                <div>

                  <p className="text-gray-600 text-sm">
                    Location
                  </p>

                  <p className="text-neutral-900">
                    Nairobi, Kenya
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <Clock className="text-orange-500" />

                <div>

                  <p className="text-gray-600 text-sm">
                    Working Hours
                  </p>

                  <p className="text-neutral-900">
                    Mon - Sat | 8:00 AM - 6:00 PM
                  </p>

                </div>

              </div>

            </div>

            {/* Socials */}

            <div className="flex gap-4">

              <button className="w-12 h-12 rounded-full bg-white border border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition flex items-center justify-center">
                <FaGithub />
              </button>

              <button className="w-12 h-12 rounded-full bg-white border border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition flex items-center justify-center">
                <FaLinkedin />
              </button>

              <button className="w-12 h-12 rounded-full bg-white border border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition flex items-center justify-center">
                <FaXTwitter />
              </button>

              <button className="w-12 h-12 rounded-full bg-white border border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition flex items-center justify-center">
                <FaInstagram />
              </button>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-3xl border border-orange-200 bg-white p-10"
          >

            <h2 className="text-3xl font-bold mb-8">
              Send a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="bg-white rounded-xl border border-orange-200 px-5 py-4 text-neutral-900 outline-none focus:border-orange-500"
                />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="bg-white rounded-xl border border-orange-200 px-5 py-4 text-neutral-900 outline-none focus:border-orange-500"
                />

              </div>

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company (Optional)"
                className="w-full bg-white rounded-xl border border-orange-200 px-5 py-4 text-neutral-900 outline-none focus:border-orange-500"
              />

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full bg-white rounded-xl border border-orange-200 px-5 py-4 text-neutral-900 outline-none focus:border-orange-500"
              />

              <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project..."
                className="w-full bg-white rounded-xl border border-orange-200 px-5 py-4 text-neutral-900 outline-none focus:border-orange-500 resize-none"
              />

              {feedback ? (
                <p className={feedback.includes("success") ? "text-green-600" : "text-red-600"}>
                  {feedback}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={18} />
                {submitting ? "Sending..." : "Send Message"}
              </button>

            </form>

          </motion.div>

        </div>

      </section>

    </main>
  );
};

export default Contact;