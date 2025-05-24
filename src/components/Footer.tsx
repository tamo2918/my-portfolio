"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://github.com",
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
    },
    {
      href: "https://twitter.com",
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
    },
    {
      href: "mailto:contact@example.com",
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container">
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
          >
            {/* 左側：名前とコピーライト */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg mb-2">Tatsuki Morita</h3>
              <p className="text-sm text-muted-foreground">
                © {currentYear} All rights reserved.
              </p>
            </div>

            {/* 中央：クレジット */}
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>using Next.js & Tailwind CSS</span>
            </div>

            {/* 右側：ソーシャルリンク */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 