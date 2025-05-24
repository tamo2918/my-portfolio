"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Next.js 14とApp Routerで作るモダンWebアプリケーション",
    excerpt: "Next.js 14の新機能とApp Routerを活用したWebアプリケーション開発のベストプラクティスについて解説します。",
    content: "",
    date: "2024-01-15",
    readTime: 8,
    tags: ["Next.js", "React", "TypeScript"],
    featured: true,
  },
  {
    id: "2",
    title: "Framer Motionで作る美しいUIアニメーション",
    excerpt: "Framer Motionを使ってユーザー体験を向上させるアニメーションの実装方法を詳しく紹介します。",
    content: "",
    date: "2024-01-10",
    readTime: 6,
    tags: ["Framer Motion", "React", "Animation"],
    featured: true,
  },
  {
    id: "3",
    title: "Tailwind CSSのカスタムテーマ設計",
    excerpt: "プロジェクトに合わせたTailwind CSSのカスタムテーマの作成とベストプラクティスについて。",
    content: "",
    date: "2024-01-05",
    readTime: 5,
    tags: ["Tailwind CSS", "CSS", "Design"],
    featured: false,
  },
  {
    id: "4",
    title: "TypeScriptで型安全なReactコンポーネント設計",
    excerpt: "TypeScriptを活用してより保守性の高いReactコンポーネントを設計する方法について。",
    content: "",
    date: "2023-12-28",
    readTime: 7,
    tags: ["TypeScript", "React", "Architecture"],
    featured: false,
  },
  {
    id: "5",
    title: "モダンフロントエンド開発環境の構築",
    excerpt: "効率的な開発のためのツール選択とセットアップ方法について詳しく解説します。",
    content: "",
    date: "2023-12-20",
    readTime: 10,
    tags: ["Development", "Tools", "Setup"],
    featured: false,
  },
];

export default function Blog() {
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

  const featuredPosts = blogPosts.filter(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            開発に関する学びや考察、技術的な知見を<br />
            シンプルな言葉で綴っています。
          </p>
        </motion.div>

        {/* フィーチャード投稿 */}
        {featuredPosts.length > 0 && (
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
              Featured Posts
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.id} post={post} />
              ))}
            </div>
          </motion.section>
        )}

        {/* 最新投稿 */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-semibold mb-8"
          >
            Recent Posts
          </motion.h2>
          <div className="space-y-8">
            {otherPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group cursor-pointer"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}分で読める</span>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3 group-hover:text-muted-foreground transition-colors">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
            続きを読む
            <ArrowRight className="ml-1 w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group cursor-pointer"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
            <h3 className="text-lg font-semibold mb-2 md:mb-0 group-hover:text-muted-foreground transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}分</span>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-3 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
} 