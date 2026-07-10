import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Search,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { getSupabaseImageUrl, supabase } from "../lib/supabase";

const filters = [
  "All",
  "Web Apps",
  "Websites",
  "Mobile",
  "UI/UX",
  "3D",
];

type ProjectItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  github_url: string | null;
  live_url: string | null;
  technologies: string[] | null;
  cover_image: string | null;
  created_at: string | null;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200";

const Portfolio = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("projects")
        .select(
          "id,title,slug,description,category,github_url,live_url,technologies,cover_image,created_at",
        )
        .order("created_at", { ascending: false });

      if (error) {
        setError("Unable to load projects right now.");
        setProjects([]);
        setLoading(false);
        return;
      }

      setProjects((data ?? []) as ProjectItem[]);
      setLoading(false);
    };

    void loadProjects();
  }, []);

  return (
    <main className="bg-rose-50 text-neutral-900 min-h-screen">
      {/* Hero */}

      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-200/30 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.4em] text-orange-500"
          >
            Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-6xl lg:text-7xl font-black mt-6"
          >
            Selected Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-lg mt-8 max-w-3xl leading-8"
          >
            A collection of web applications, websites, UI designs and 3D visuals built with modern technologies and attention to detail.
          </motion.p>
        </div>
      </section>

      {/* Search */}

      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-between mb-12">
          <div className="relative w-full lg:w-96">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />

            <input
              placeholder="Search project..."
              className="w-full rounded-2xl bg-white border border-orange-200 pl-14 pr-5 py-4 outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                className="px-5 py-3 rounded-full border border-orange-200 bg-white hover:bg-orange-500 hover:text-white transition"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}

      <section className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          <p className="text-gray-600">Loading projects...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-600">No projects have been published yet.</p>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const projectImage = getSupabaseImageUrl("project-images", project.cover_image) ?? fallbackImage;
              const technologies = project.technologies ?? [];

              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12 }}
                  className="group rounded-3xl overflow-hidden border border-orange-200 bg-white"
                >
                  <div className="relative overflow-hidden h-72">
                    <img
                      src={projectImage}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />

                    <div className="absolute top-5 right-5">
                      <span className="bg-black/60 backdrop-blur px-4 py-2 rounded-full text-sm">
                        {project.category ?? "Project"}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                    <p className="text-gray-400 mb-8 leading-7">
                      {project.description ?? "A recent project built with modern tools and thoughtful design."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm px-3 py-1 rounded-full bg-orange-100 text-orange-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <a
                        href={project.live_url ?? project.github_url ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-orange-500 hover:gap-4 transition-all"
                      >
                        View Project
                        <ArrowRight size={18} />
                      </a>

                      <div className="flex gap-4">
                        {project.github_url ? (
                            <a href={project.github_url} target="_blank" rel="noreferrer" className="hover:text-orange-500">
                            <FaGithub size={20} />
                          </a>
                        ) : null}

                        {project.live_url ? (
                          <a href={project.live_url} target="_blank" rel="noreferrer" className="hover:text-orange-500">
                            <ExternalLink size={20} />
                          </a>
                        ) : null}
                      </div>
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

export default Portfolio;