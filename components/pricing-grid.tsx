"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for individuals getting started with AI-assisted learning",
    icon: Zap,
    color: "emerald",
    features: [
      "Access to 3 Council Members",
      "5 modules per month",
      "Basic validation engine",
      "Community support",
      "Course templates"
    ]
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For serious creators building multiple courses",
    icon: Crown,
    color: "blue",
    featured: true,
    features: [
      "Full Council of 7 access",
      "Unlimited modules",
      "Advanced validation engine",
      "Priority support",
      "Custom templates",
      "Analytics dashboard",
      "Export to multiple formats"
    ]
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For teams and organizations at scale",
    icon: Rocket,
    color: "purple",
    features: [
      "Everything in Professional",
      "Team collaboration tools",
      "White-label options",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security features"
    ]
  }
];

export function PricingGrid() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {plans.map((plan, index) => {
        const Icon = plan.icon;
        return (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={plan.featured ? "lg:scale-105" : ""}
          >
            <Card className={`glass border-slate-800 p-8 hover:border-${plan.color}-500/30 transition-all h-full flex flex-col ${plan.featured ? "border-emerald-500/50 shadow-lg shadow-emerald-500/20" : ""}`}>
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg bg-${plan.color}-500/10 border border-${plan.color}-500/20`}>
                  <Icon className={`text-${plan.color}-400`} size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <p className="text-slate-400 mt-2">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1">
                      <Check className="text-emerald-400" size={18} />
                    </div>
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleGetStarted}
                className={`w-full ${
                  plan.featured
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-100"
                } transition-all`}
                size="lg"
              >
                Get Started
              </Button>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
