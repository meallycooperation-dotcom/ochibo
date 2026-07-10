import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Reviews", path: "/reviews" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-orange-200 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-black tracking-wide"
          >
            Brian<span className="text-orange-500">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">

            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition ${
                    isActive
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-neutral-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}

                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-orange-500 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

          </nav>

          {/* Hire Me */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 transition font-semibold text-white"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            {mobileOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>

        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-rose-50 lg:hidden"
          >
            <div className="pt-28 px-8 flex flex-col gap-8">

              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `text-3xl font-semibold ${
                      isActive
                        ? "text-orange-500"
                        : "text-neutral-900"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-6 bg-orange-500 text-white text-center py-4 rounded-xl font-semibold"
              >
                Hire Me
              </Link>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
};

export default Header;