import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import GitHubContributions from "../components/GitHubContributions";
import Footer from "../components/Footer";
import heroImage from "../assets/ochibo_converted.webp";

const Home = () => {
  return (
    <div className="bg-rose-50 text-neutral-900 min-h-screen overflow-x-hidden">

      {/* ========================= */}
      {/* Hero */}
      {/* ========================= */}
      <Hero />

      {/* ========================= */}
      {/* About Image */}
      {/* ========================= */}
      <section className="container mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-300/20 to-rose-300/20 blur-3xl"></div>

            <img
              src={heroImage}
              alt="Brian Ochieng"
              className="relative rounded-3xl object-cover w-full h-[600px]"
            />
          </div>

          {/* Text */}
          <div>

            <p className="text-orange-500 uppercase tracking-widest mb-3">
              About Me
            </p>

            <h2 className="text-5xl font-bold mb-8 leading-tight">
              I build premium digital experiences.
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              I'm Brian Ochieng, a Full Stack Developer, Motion Designer,
              and 3D Artist passionate about building beautiful websites,
              scalable web applications, and cinematic visuals.
            </p>

            <p className="text-gray-600 leading-8">
              I specialize in React, TypeScript, Node.js, Supabase,
              Blender, and After Effects, combining design and engineering
              into one seamless experience.
            </p>

          </div>

        </div>
      </section>

      {/* ========================= */}
      {/* GitHub Contributions */}
      {/* ========================= */}
      <section className="py-16">
        <GitHubContributions />
      </section>

      {/* ========================= */}
      {/* Tech Stack */}
      {/* ========================= */}
        <TechStack />

      {/* ========================= */}
      {/* Featured Projects */}
      {/* ========================= */}
      <section className="py-24">

        <div className="container mx-auto px-6">

          <div className="flex justify-between items-end mb-16">

            <div>
              <p className="text-orange-500 uppercase tracking-widest">
                Portfolio
              </p>

              <h2 className="text-5xl font-bold mt-3">
                Recent Projects
              </h2>
            </div>

            <Link
              to="/portfolio"
              className="border border-neutral-300 px-6 py-3 rounded-full hover:bg-neutral-900 hover:text-white transition"
            >
              View All
            </Link>

          </div>

          <Projects />

        </div>

      </section>

      {/* ========================= */}
      {/* Testimonials */}
      {/* ========================= */}
      <section className="py-24 bg-white">

        <div className="container mx-auto px-6">

          <div className="text-center mb-16">

            <p className="text-orange-500 uppercase tracking-widest">
              Testimonials
            </p>

            <h2 className="text-5xl font-bold mt-3">
              What Clients Say
            </h2>

            <p className="text-gray-600 mt-6 max-w-xl mx-auto">
              Feedback from clients and collaborators I've worked with.
            </p>

          </div>

          <Testimonials />

        </div>

      </section>

      {/* ========================= */}
      {/* CTA */}
      {/* ========================= */}
      <section className="py-28">

        <div className="container mx-auto px-6">

          <div className="rounded-3xl bg-gradient-to-r from-orange-400 to-rose-400 p-16 text-center">

            <h2 className="text-5xl font-bold text-white">
              Let's Build Something Amazing
            </h2>

            <p className="mt-6 text-lg text-white max-w-2xl mx-auto">
              Looking for a developer who combines beautiful design,
              performance, and modern technologies? Let's talk.
            </p>

            <Link
              to="/contact"
              className="mt-10 inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
            >
              Contact Me
            </Link>

          </div>

        </div>

      </section>

      {/* ========================= */}
      {/* Footer */}
      {/* ========================= */}
      <Footer />

    </div>
  );
};

export default Home;