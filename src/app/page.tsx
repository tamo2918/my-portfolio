"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Twitter, Mail, ExternalLink, Calendar, Clock, Phone, MapPin, Linkedin, Send, Star, Zap, Code, Palette } from "lucide-react";
import Image from "next/image";
import { AnimatedBackground, FloatingElements } from "@/components/AnimatedBackground";

// 型定義
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  liveUrl?: string;
  featured: boolean;
  status: string;
  color: string;
  icon: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  url: string;
  color: string;
}

// プロジェクトデータ
const projects: Project[] = [
  {
    id: "1",
    title: "BranchDo",
    description: "AIがタスクを細分化",
    longDescription: "AI技術を活用してタスクを効率的に細分化し、生産性向上をサポートするアプリケーション。SwiftUIで開発された直感的なインターフェースが特徴。",
    technologies: ["SwiftUI", "AI", "Core ML", "CloudKit"],
    liveUrl: "https://apps.apple.com/app/branchdo",
    featured: true,
    status: "正式版",
    color: "from-blue-500 to-purple-600",
    icon: "🌳",
  },
  {
    id: "2",
    title: "Lala",
    description: "画像・テキストから問題を自動生成",
    longDescription: "画像やテキストを入力するだけで、自動的に学習問題を生成するAIアプリケーション。SwiftUIで作られた使いやすいインターフェースで学習をサポート。",
    technologies: ["SwiftUI", "Vision", "Natural Language", "Core ML"],
    liveUrl: "https://example.com/lala",
    featured: true,
    status: "開発中",
    color: "from-green-500 to-teal-600",
    icon: "📚",
  },
  {
    id: "3",
    title: "Mojisu",
    description: "ただ文字をカウントするだけ",
    longDescription: "シンプルで高精度な文字カウントアプリ。SwiftUIで作られたミニマルなデザインで、必要な機能だけに特化した実用的なツール。",
    technologies: ["SwiftUI", "Foundation", "UserDefaults"],
    liveUrl: "https://apps.apple.com/app/mojisu",
    featured: true,
    status: "正式版",
    color: "from-orange-500 to-red-600",
    icon: "🔢",
  },
];

// ブログ投稿データ（RSS から取得した実際の記事）
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "驚異の進化！Gensparkから自ら動くAI、Super Agent誕生",
    excerpt: "ついにあのGensparkから汎用AIエージェントが登場しました、最近話題になっていたmanusを超える機能を持つということでとても驚いています。旅の計画も、レストラン予約も、アニメ制作も——全部AIがやってくれました。",
    date: "2025-04-03",
    readTime: 5,
    tags: ["AI", "エージェント", "Genspark"],
    featured: true,
    url: "https://note.com/tamo2918/n/nc484152fa6df",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "2",
    title: "ついにZapierがMCPに対応。AI連携が\"次のフェーズ\"へ突入した",
    excerpt: "もう夢物語じゃない、AIの新しい可能性について解説します。ZapierのMCP対応により、AI連携が大きく進化しました。",
    date: "2025-03-25",
    readTime: 6,
    tags: ["Zapier", "MCP", "AI連携"],
    featured: true,
    url: "https://note.com/tamo2918/n/nfbbdaaa0030c",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "3",
    title: "PerplexityからFeloへ移行した理由",
    excerpt: "近年、AI技術の進化は目覚ましく、私たちの情報収集の方法も大きく変化しています。AI検索エンジンはその最たる例でしょう。私も以前はPerplexityというAI検索エンジンを愛用していましたが、最近Feloという新しいAI検索エンジンに移行しました。",
    date: "2025-01-22",
    readTime: 4,
    tags: ["Perplexity", "Felo", "AI検索"],
    featured: false,
    url: "https://note.com/tamo2918/n/n682e1396a338",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "4",
    title: "海外旅行で持って行ってよかったガジェットを紹介",
    excerpt: "海外旅行を快適に過ごすためには、適切なガジェット選びが重要です。今回は、実際の旅行で活躍した8つのテックアイテムをご紹介します！",
    date: "2024-11-28",
    readTime: 7,
    tags: ["ガジェット", "旅行", "レビュー"],
    featured: false,
    url: "https://note.com/tamo2918/n/nece42d8599c9",
    color: "from-green-500 to-teal-600",
  },
  {
    id: "5",
    title: "SearchGPTが発表。Googleの牙城を崩すか？驚きの新機能とその可能性",
    excerpt: "OpenAIが満を持して投入した「SearchGPT」が大きな話題を呼んでいます。Google検索に真っ向から挑戦するこの新機能は、私たちのウェブ検索の体験を一変させる可能性を秘めています。",
    date: "2024-11-01",
    readTime: 6,
    tags: ["SearchGPT", "OpenAI", "Google"],
    featured: false,
    url: "https://note.com/tamo2918/n/nbc0606196fde",
    color: "from-red-500 to-orange-600",
  },
  {
    id: "6",
    title: "革新的コンパクト設計で登場！新型M4 Mac miniが価格と性能でゲームチェンジャーに",
    excerpt: "14年ぶりの大幅リデザインとなる新型M4 Mac miniが発表されました。従来モデルの半分以下というコンパクトサイズでありながら、驚異的な性能向上を実現。9万円台からという価格設定も相まって、デスクトップMacの新時代を予感させる製品となっています。",
    date: "2024-10-30",
    readTime: 8,
    tags: ["Mac mini", "M4", "Apple"],
    featured: false,
    url: "https://note.com/tamo2918/n/example",
    color: "from-blue-500 to-purple-600",
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // フォーム送信のシミュレーション
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    
    // 3秒後にメッセージを非表示
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <FloatingElements />
      
      {/* Hero セクション */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative">
        <motion.div 
          style={{ y, opacity }}
          className="container relative z-10"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            {/* プロフィール画像 */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-background border-2 border-background overflow-hidden relative">
                    {/* プロフィール画像 */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center relative">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="text-2xl font-bold text-white">T</span>
                      </motion.div>
                      {/* 背景パターン */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 浮遊するアイコン */}
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Star className="w-4 h-4" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Code className="w-3 h-3" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-4 text-foreground"
            >
              Tatsuki Morita
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Palette className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Creative Developer</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">UI Designer</span>
              </motion.div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed text-muted-foreground"
            >
              新しい体験をコードで形にする、高校生クリエイター。
              <br />
              <span className="text-foreground font-medium">
                デザインとテクノロジーの境界で、未来を創造します。
              </span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">プロジェクトを見る</span>
                <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </motion.a>
              
              <motion.a
                href="#contact"
                className="group inline-flex items-center px-8 py-4 border-2 border-border rounded-full font-medium transition-all duration-300 hover:bg-muted backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgb(var(--foreground) / 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                お問い合わせ
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-6"
            >
              <SocialLink
                href="https://github.com"
                icon={<Github className="w-6 h-6" />}
                label="GitHub"
                color="hover:text-gray-600"
              />
              <SocialLink
                href="https://twitter.com"
                icon={<Twitter className="w-6 h-6" />}
                label="Twitter"
                color="hover:text-blue-500"
              />
              <SocialLink
                href="mailto:contact@example.com"
                icon={<Mail className="w-6 h-6" />}
                label="Email"
                color="hover:text-red-500"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 改良されたスクロールインジケーター */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center relative overflow-hidden"
          >
            <motion.div 
              className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2"
              animate={{ 
                y: [0, 10, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects セクション */}
      <section id="projects" className="py-20 bg-muted/20 relative">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              これまでに手掛けたプロジェクトの一部をご紹介します。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog セクション */}
      <section id="blog" className="py-20 relative">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Blog
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI技術やガジェット、最新テクノロジーについての知見や体験を綴っています。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact セクション */}
      <section id="contact" className="py-20 bg-muted/20 relative">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Contact
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              プロジェクトのご相談やご質問など、お気軽にお声かけください。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* コンタクトフォーム */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
              >
                <h3 className="text-2xl font-semibold mb-8">お問い合わせ</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      お名前 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="山田太郎"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      メールアドレス *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="example@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      メッセージ *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                      placeholder="ご用件をお聞かせください..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                        />
                        送信中...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        メッセージを送信
                      </>
                    )}
                  </motion.button>
                  
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200"
                    >
                      メッセージが送信されました。ありがとうございます！
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* 連絡先情報 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-8">連絡先</h3>
                <div className="space-y-6 mb-8">
                  <ContactItem
                    icon={<Mail className="w-5 h-5" />}
                    label="Email"
                    value="contact@example.com"
                    href="mailto:contact@example.com"
                  />
                  <ContactItem
                    icon={<Phone className="w-5 h-5" />}
                    label="電話"
                    value="+81 90-XXXX-XXXX"
                    href="tel:+819xxxxxxxx"
                  />
                  <ContactItem
                    icon={<MapPin className="w-5 h-5" />}
                    label="所在地"
                    value="東京, 日本"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-6">SNS</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <SocialCard
                      icon={<Github className="w-6 h-6" />}
                      label="GitHub"
                      href="https://github.com"
                    />
                    <SocialCard
                      icon={<Twitter className="w-6 h-6" />}
                      label="Twitter"
                      href="https://twitter.com"
                    />
                    <SocialCard
                      icon={<Linkedin className="w-6 h-6" />}
                      label="LinkedIn"
                      href="https://linkedin.com"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// コンポーネント
function SocialLink({ href, icon, label, color }: { href: string; icon: React.ReactNode; label: string; color: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-4 rounded-full border border-border hover:bg-muted transition-all duration-300 ${color}`}
      whileHover={{ 
        y: -5,
        scale: 1.1,
        boxShadow: "0 10px 25px rgb(var(--foreground) / 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      whileHover={{ y: -10 }}
    >
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-glow-lg hover:border-white/20">
        <div className="relative h-48 overflow-hidden">
          <motion.div 
            className={`w-full h-full bg-gradient-to-br ${project.color} opacity-80`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-6xl filter drop-shadow-lg"
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 0.5 }}
            >
              {project.icon}
            </motion.span>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </motion.a>
            )}
          </div>
          
          {/* ステータスバッジ */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
              project.status === '正式版' 
                ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                : 'bg-orange-500/20 text-orange-300 border border-orange-400/30'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech: string, i: number) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full border border-border"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 text-xs text-muted-foreground">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={() => window.open(post.url, '_blank')}
    >
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-glow hover:border-white/20">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}分</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3 group-hover:text-purple-500 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string, i: number) => (
            <motion.span
              key={tag}
              className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-500/20"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">記事を読む</span>
          <motion.div
            className="w-5 h-5 text-muted-foreground group-hover:text-purple-500 transition-colors"
            whileHover={{ x: 3 }}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <motion.div 
      className="flex items-center space-x-4 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl transition-all duration-300 hover:bg-muted/50 hover:shadow-glow"
      whileHover={{ scale: 1.02 }}
    >
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

function SocialCard({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl transition-all duration-300 hover:bg-muted/50 hover:shadow-glow"
      whileHover={{ 
        y: -5,
        scale: 1.05
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-muted-foreground mb-2">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </motion.a>
  );
}
