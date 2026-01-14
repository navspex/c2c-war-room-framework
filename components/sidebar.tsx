"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  Target,
  BookOpen,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "War Room", href: "#war-room" },
  { icon: Users, label: "Council of 7", href: "#council", badge: 7 },
  { icon: BookOpen, label: "Modules", href: "#modules", badge: 5 },
  { icon: Target, label: "Objectives", href: "#objectives" },
  { icon: FileText, label: "Documents", href: "#documents" },
  { icon: Settings, label: "Settings", href: "#settings" },
];

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg glass text-emerald-500 hover:bg-slate-800 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 glass border-r border-slate-800 z-50 flex flex-col"
            >
              <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  C2C Framework
                </h1>
                <p className="text-xs text-slate-400 mt-1">Multi-Window Course Platform</p>
              </div>

              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.label;

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.label);
                        if (window.innerWidth < 1024) {
                          setIsOpen(false);
                        }
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "text-slate-300 hover:bg-slate-800/50 hover:text-emerald-400"
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {item.badge}
                        </span>
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-800 space-y-3">
                <div className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800">
                  <p className="text-xs text-slate-400">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-emerald-400 font-medium">Operational</span>
                  </div>
                </div>
                <Link href="/" className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 hover:border-emerald-500/50"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className={`hidden lg:block fixed left-0 top-0 h-full w-64 glass border-r border-slate-800 z-30`}>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            C2C Framework
          </h1>
          <p className="text-xs text-slate-400 mt-1">Multi-Window Course Platform</p>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-240px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.label;

            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.label);
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-emerald-400"
                  }
                `}
              >
                <Icon size={20} />
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </motion.a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur space-y-3">
          <div className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <p className="text-xs text-slate-400">Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-emerald-400 font-medium">Operational</span>
            </div>
          </div>
          <Link href="/" className="block">
            <Button
              variant="outline"
              className="w-full bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 hover:border-emerald-500/50"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
