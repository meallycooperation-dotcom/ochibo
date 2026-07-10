import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { getSupabaseImageUrl, supabase } from "../lib/supabase";

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

const Projects = () => {
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
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        setError("Unable to load featured projects right now.");
        setProjects([]);
        setLoading(false);
        return;
      }

      setProjects((data ?? []) as ProjectItem[]);
      setLoading(false);
    };

    void loadProjects();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading featured projects...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (projects.length === 0) {
    return <p className="text-gray-400">No featured projects available yet.</p>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {projects.map((project, index) => {
        const projectImage = getSupabaseImageUrl("project-images", project.cover_image) ?? fallbackImage;
        const technologies = project.technologies ?? [];

        return (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            className="overflow-hidden rounded-3xl border border-orange-200 bg-white"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={projectImage}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-black/60 px-3 py-1 text-sm backdrop-blur">
                {project.category ?? "Project"}
              </span>
            </div>

            <div className="p-7">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-400">
                {project.description ?? "A recent project built with modern tools and thoughtful design."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <a
                  href={project.live_url ?? project.github_url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-orange-500 transition hover:gap-4"
                >
                  View Project
                  <ArrowRight size={16} />
                </a>

                <div className="flex gap-3">
                  {project.github_url ? (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="hover:text-orange-500">
                      <FaGithub size={18} />
                    </a>
                  ) : null}

                  {project.live_url ? (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="hover:text-orange-500">
                      <ExternalLink size={18} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default Projects;
