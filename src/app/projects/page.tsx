"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description: "モダンな管理画面UIの設計と実装",
    longDescription: "React、TypeScript、Tailwind CSSを使用したレスポンシブなEコマース管理画面。データビジュアライゼーション、フィルタリング機能、直感的なUXを重視した設計。",
    image: "/api/placeholder/600/400",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "2",
    title: "AI Chat Application",
    description: "リアルタイムAIチャットインターフェース",
    longDescription: "OpenAI APIを活用したリアルタイムチャットアプリケーション。WebSocketを使用したリアルタイム通信、メッセージの永続化、美しいUIアニメーション。",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "Socket.io", "OpenAI API", "Prisma"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "ミニマルデザインのポートフォリオサイト",
    longDescription: "Next.js 14、Framer Motion、Tailwind CSSを使用したモダンなポートフォリオサイト。ダークモード対応、スムーズなアニメーション、SEO最適化。",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "4",
    title: "Task Management App",
    description: "チーム向けタスク管理ツール",
    longDescription: "コラボレーション機能を備えたタスク管理アプリケーション。ドラッグ&ドロップ、リアルタイム更新、権限管理システムを実装。",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com",
    featured: false,
  },
];

export default function Projects() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            これまでに手掛けたプロジェクトの一部をご紹介します。<br />
            技術的チャレンジとクリエイティブな解決策を追求しています。
          </p>
        </motion.div>

        {/* フィーチャード・プロジェクト */}
        {featuredProjects.length > 0 && (
          <motion.section
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl font-semibold mb-8"
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </motion.section>
        )}

        {/* その他のプロジェクト */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-semibold mb-8"
          >
            Other Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group cursor-pointer"
    >
      <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        {/* プロジェクト画像 */}
        <div className="relative h-48 md:h-56 bg-muted overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-muted-foreground/10 to-muted-foreground/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground">
              {project.title.charAt(0)}
            </span>
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            )}
          </div>
        </div>

        {/* プロジェクト詳細 */}
        <div className="p-6">
          <h3 className={`font-semibold mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {featured ? project.longDescription : project.description}
          </p>
          
          {/* 技術スタック */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, featured ? 4 : 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (featured ? 4 : 3) && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{project.technologies.length - (featured ? 4 : 3)} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 