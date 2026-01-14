"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Users, Target, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidationEngine } from "@/components/validation-engine";

export default function Home() {
  const [showModule3, setShowModule3] = useState(false);

  const stats = [
    { icon: Activity, label: "Active Sessions", value: "12", color: "emerald" },
    { icon: Users, label: "Council Members", value: "7", color: "blue" },
    { icon: Target, label: "Objectives", value: "24", color: "purple" },
    { icon: BookOpen, label: "Modules", value: "5", color: "orange" },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            War Room Command Center
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Orchestrating AI-assisted learning and development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass border-slate-800 p-6 hover:border-emerald-500/30 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-emerald-400 mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <Icon className="text-emerald-400" size={24} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass border border-slate-800 rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
            <h2 className="text-2xl font-bold text-slate-100">
              System Overview
            </h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Welcome to the C2C Multi-Window Course Framework. This command center provides a
            comprehensive platform for managing AI-assisted learning modules, coordinating with
            the Council of 7, and tracking your development objectives.
          </p>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-emerald-400 font-medium">
                All systems operational
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="space-y-6"
        >
          <div className="glass border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowModule3(!showModule3)}
              className="w-full p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <span className="text-sm font-bold text-emerald-400">Module 3</span>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-100">
                    Blitz Validation Engine
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Validate niche ideas with AI-powered research and decision matrix
                  </p>
                </div>
              </div>
              {showModule3 ? (
                <ChevronUp className="text-emerald-400" size={24} />
              ) : (
                <ChevronDown className="text-emerald-400" size={24} />
              )}
            </button>

            {showModule3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-slate-800 p-6"
              >
                <ValidationEngine />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
