import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Globe,
  Smartphone,
  GitBranch,
  Terminal,
  Cloud,
  Palette,
  Box,
  Layers,
} from "lucide-react";

const techStack = [
  {
    name: "React",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "TypeScript",
    icon: Code2,
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "Node.js",
    icon: Server,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Express",
    icon: Terminal,
    color: "from-neutral-600 to-neutral-800",
  },
  {
    name: "Supabase",
    icon: Database,
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    color: "from-sky-500 to-blue-700",
  },
  {
    name: "Tailwind CSS",
    icon: Palette,
    color: "from-cyan-400 to-sky-500",
  },
  {
    name: "Framer Motion",
    icon: Layers,
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "Git",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Docker",
    icon: Box,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Cloud",
    icon: Cloud,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Responsive UI",
    icon: Smartphone,
    color: "from-yellow-500 to-orange-500",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const TechStack = () => {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <p className="uppercase tracking-[0.3em] text-orange-500 text-sm">
            My Toolbox
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Technologies I Love
          </h2>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto leading-8">
            These are the technologies I use to design,
            develop, deploy and maintain modern,
            scalable web applications.
          </p>

        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >

          {techStack.map((tech) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.name}
                variants={card}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                }}
                className="relative overflow-hidden rounded-3xl border border-orange-200 bg-white p-8 group cursor-pointer"
              >

                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-15 transition duration-500`}
                />

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color}
                  flex items-center justify-center mb-6 shadow-lg`}
                >
                  <Icon size={30} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3">
                  {tech.name}
                </h3>

                {/* Description */}
                

                {/* Floating Circle */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${tech.color} blur-3xl opacity-10`}
                />

              </motion.div>
            );
          })}

        </motion.div>

      </div>

    </section>
  );
};

export default TechStack;