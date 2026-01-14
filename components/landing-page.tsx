"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, Target, BookOpen, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PricingGrid } from "@/components/pricing-grid";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Council of 7",
      description: "Seven specialized AI agents working together to create your perfect course"
    },
    {
      icon: Target,
      title: "Validation Engine",
      description: "Validate your niche ideas with AI-powered research and decision matrices"
    },
    {
      icon: BookOpen,
      title: "Course Framework",
      description: "Complete multi-module system for building production-ready courses"
    },
    {
      icon: Sparkles,
      title: "AI-Assisted Creation",
      description: "Leverage cutting-edge AI to accelerate your course development"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-24 space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <Sparkles className="text-emerald-400" size={18} />
              <span className="text-emerald-400 text-sm font-medium">
                AI-Powered Course Creation Platform
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              Build Recession-Proof
              <br />
              Info Products
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Harness the power of seven specialized AI agents to research, validate, and create
              high-converting courses in record time.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-6 text-lg"
              size="lg"
            >
              Launch War Room
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="glass border-slate-800 p-6 hover:border-emerald-500/30 transition-all h-full">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit mb-4">
                    <Icon className="text-emerald-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Select the perfect plan for your course creation journey
            </p>
          </div>

          <PricingGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass border border-slate-800 rounded-xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-slate-100 mb-4">
            Ready to Build Your Empire?
          </h3>
          <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of creators who are building recession-proof businesses with AI-powered course creation.
          </p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-6 text-lg"
            size="lg"
          >
            Get Started Now
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
