"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Send } from "lucide-react";

export default function Contact() {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            プロジェクトのご相談やご質問など、<br />
            お気軽にお声かけください。
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* お問い合わせフォーム */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-2xl font-semibold mb-8"
              >
                お問い合わせ
              </motion.h2>
              
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-colors"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-colors"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-colors resize-none"
                    placeholder="ご用件をお聞かせください..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-8 py-3 bg-foreground text-background rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full mr-2"
                      />
                      送信中...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      メッセージを送信
                    </>
                  )}
                </button>
                
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200"
                  >
                    メッセージが送信されました。ありがとうございます！
                  </motion.div>
                )}
              </motion.form>
            </motion.div>

            {/* 連絡先情報 */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="lg:pl-8"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-2xl font-semibold mb-8"
              >
                連絡先
              </motion.h2>
              
              <motion.div
                variants={fadeInUp}
                className="space-y-6 mb-12"
              >
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
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg font-semibold mb-6">SNS</h3>
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
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                className="mt-12 p-6 bg-muted rounded-lg"
              >
                <h3 className="font-semibold mb-2">レスポンス時間</h3>
                <p className="text-sm text-muted-foreground">
                  通常24時間以内にご返信いたします。
                  お急ぎの場合は、SNSでのDMもご利用ください。
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
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
    <div className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg transition-colors hover:bg-muted">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
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
      className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg transition-all duration-300 hover:bg-muted hover:scale-105"
      whileHover={{ y: -2 }}
    >
      <div className="text-muted-foreground mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </motion.a>
  );
} 