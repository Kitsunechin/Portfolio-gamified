"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Filter, X, Sparkles } from "lucide-react";
import Image from "next/image";
import TwinklingStars from "@/components/twinkling-stars";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  platform?: string;
}

interface ProjectSackProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export default function ProjectSack({ projects, onProjectSelect }: ProjectSackProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Extract unique tags and platforms
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));
  const platforms = Array.from(new Set(projects.map(p => p.platform).filter(Boolean)));

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === "all" || project.platform === filter || project.tags.includes(filter);
    const matchesSearch = searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Floating sack button */}
      <motion.button
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-primary bloom-soft flex items-center justify-center cursor-pointer group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Package className="w-7 h-7 text-primary-foreground" />

        {/* Badge showing project count */}
        <motion.div
          className="absolute -top-1 -right-1 w-6 h-6 bg-foreground rounded-full flex items-center justify-center text-xs font-bold text-background border-2 border-background"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          {projects.length}
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Sack modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[85vh] bg-gradient-to-br from-card to-background rounded-2xl border-2 border-primary/30 overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-6 border-b border-primary/20 overflow-hidden">
                <TwinklingStars />
                <motion.div
                  className="relative z-10 flex items-center gap-3 mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <Package className="w-6 h-6 text-primary" />
                  <h2 className="font-display uppercase tracking-[0.1em] text-2xl text-foreground">Project Sack</h2>
                  <span className="px-2 py-1 bg-primary/15 border border-primary/30 rounded-full text-xs text-foreground/80">
                    {filteredProjects.length} items
                  </span>
                </motion.div>

                {/* Filters */}
                <motion.div
                  className="space-y-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-background/50 border border-primary/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60"
                  />

                  {/* Filter buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-primary/60" />
                    <button
                      onClick={() => setFilter("all")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        filter === "all"
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-muted-foreground border border-primary/30 hover:bg-primary/20"
                      }`}
                    >
                      All
                    </button>
                    {platforms.map(platform => (
                      <button
                        key={platform}
                        onClick={() => setFilter(platform)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          filter === platform
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-muted-foreground border border-primary/30 hover:bg-primary/20"
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-colors"
                >
                  <X className="w-4 h-4 text-foreground/80" />
                </button>
              </div>

              {/* Projects grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      className="group relative bg-background/50 border border-primary/20 rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      onClick={() => {
                        onProjectSelect(project);
                        setIsOpen(false);
                      }}
                    >
                      {/* Image */}
                      <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
                        {project.image && (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-display text-sm text-foreground mb-1 line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags preview */}
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-primary/10 border border-primary/30 rounded text-xs text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 2 && (
                            <span className="px-2 py-0.5 text-xs text-muted-foreground">
                              +{project.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sparkle effect on hover */}
                      <motion.div
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                      >
                        <Sparkles className="w-4 h-4 text-primary" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="w-16 h-16 text-primary/30 mb-4" />
                    <p className="text-muted-foreground mb-2">No projects found</p>
                    <p className="text-xs text-muted-foreground/60">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function useState<T>(initialValue: T): [T, (value: T) => void] {
  return React.useState<T>(initialValue);
}
