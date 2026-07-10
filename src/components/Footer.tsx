import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  ArrowUp,
  MapPin,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaBehance,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-white border-t border-orange-200 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-200/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black">
              Brian<span className="text-orange-500">.</span>
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Full Stack Developer creating premium web
              applications, cinematic visuals and digital
              experiences that people love.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="https://github.com/meallycooperation-dotcom"
                target="_blank"
                rel="noreferrer"
                className="h-11 w-11 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="h-11 w-11 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://x.com/wipedlensproduction"
                target="_blank"
                rel="noreferrer"
                className="h-11 w-11 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="https://www.instagram.com/wiped_lens_production/"
                target="_blank"
                rel="noreferrer"
                className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 transition"
              >
                <FaInstagram size={18} />
              </a>

            </div>

          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: .1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">
              Navigation
            </h3>

            <div className="space-y-4">

              <Link to="/" className="block text-gray-400 hover:text-cyan-400">
                Home
              </Link>

              <Link
                to="/portfolio"
                className="block text-gray-400 hover:text-cyan-400"
              >
                Portfolio
              </Link>

              <Link
                to="/blog"
                className="block text-gray-400 hover:text-cyan-400"
              >
                Blog
              </Link>

              <Link
                to="/reviews"
                className="block text-gray-400 hover:text-cyan-400"
              >
                Reviews
              </Link>

              <Link
                to="/contact"
                className="block text-gray-400 hover:text-cyan-400"
              >
                Contact
              </Link>

            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">
              Services
            </h3>

            <div className="space-y-4 text-gray-400">

              <p>Website Development</p>

              <p>Web Applications</p>

              <p>UI / UX Design</p>

              <p>Motion Graphics</p>

              <p>3D Visualization</p>

              <p>SEO Optimization</p>

            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: .3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>+254 112 224 991</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <span>meallycooperation@gmail.com</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Nairobi, Kenya</span>
              </div>

            </div>

            <a
              href="https://www.behance.net/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-cyan-400 hover:text-white transition"
            >
              <FaBehance />
              Behance Portfolio
            </a>

          </motion.div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-gray-500 text-sm text-center md:text-left">
            © {year} Brian Ochieng. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-white/5 hover:bg-cyan-500 px-5 py-3 rounded-full transition"
          >
            <ArrowUp size={18} />
            Back to Top
          </button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
