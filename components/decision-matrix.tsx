"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface ScoreCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  score: number;
  weight: number;
}

interface DecisionMatrixProps {
  nicheIdea: string;
  onComplete: (totalScore: number, verdict: string) => void;
}

export function DecisionMatrix({ nicheIdea, onComplete }: DecisionMatrixProps) {
  const [categories, setCategories] = useState<ScoreCategory[]>([
    {
      id: "profitability",
      name: "Profitability",
      icon: TrendingUp,
      description: "Revenue potential and monetization viability",
      score: 5,
      weight: 0.4,
    },
    {
      id: "competition",
      name: "Competition Level",
      icon: Users,
      description: "Market saturation and competitive intensity (10 = low competition)",
      score: 5,
      weight: 0.3,
    },
    {
      id: "urgency",
      name: "Market Urgency",
      icon: Zap,
      description: "How urgent is the problem this solves",
      score: 5,
      weight: 0.3,
    },
  ]);

  const handleScoreChange = (categoryId: string, newScore: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, score: newScore } : cat
      )
    );
  };

  const calculateTotalScore = () => {
    return categories.reduce((total, cat) => total + cat.score * cat.weight, 0);
  };

  const getVerdict = (score: number) => {
    if (score >= 8) return "HIGHLY RECOMMENDED";
    if (score >= 6.5) return "RECOMMENDED";
    if (score >= 5) return "PROCEED WITH CAUTION";
    return "NOT RECOMMENDED";
  };

  const getVerdictColor = (score: number) => {
    if (score >= 8) return "text-emerald-400";
    if (score >= 6.5) return "text-emerald-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  const totalScore = calculateTotalScore();
  const verdict = getVerdict(totalScore);

  return (
    <div className="space-y-6">
      <div className="glass border border-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-slate-100 mb-2">
          Decision Matrix for: <span className="text-emerald-400">{nicheIdea}</span>
        </h3>
        <p className="text-sm text-slate-400">
          Rate each category based on AI feedback from the Council of 7
        </p>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass border-slate-800 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Icon className="text-emerald-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-lg font-semibold text-slate-100">
                        {category.name}
                      </h4>
                      <span className="text-2xl font-bold text-emerald-400">
                        {category.score.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{category.description}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Weight: {(category.weight * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Slider
                    value={[category.score]}
                    onValueChange={(value) => handleScoreChange(category.id, value[0])}
                    min={0}
                    max={10}
                    step={0.5}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Low (0)</span>
                    <span>Medium (5)</span>
                    <span>High (10)</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="glass border-2 border-emerald-500/30 rounded-xl p-8 bg-gradient-to-br from-emerald-500/5 to-transparent"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">
              Validation Score
            </h3>
            <p className="text-slate-400">Weighted average based on AI insights</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-emerald-400 mb-1">
              {totalScore.toFixed(1)}
            </div>
            <div className="text-sm text-slate-500">out of 10.0</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${
                totalScore >= 8
                  ? "bg-emerald-500"
                  : totalScore >= 6.5
                  ? "bg-emerald-600"
                  : totalScore >= 5
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${(totalScore / 10) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            {totalScore >= 6.5 ? (
              <CheckCircle2 className={getVerdictColor(totalScore)} size={32} />
            ) : (
              <AlertCircle className={getVerdictColor(totalScore)} size={32} />
            )}
            <div>
              <p className="text-sm text-slate-400">Verdict</p>
              <p className={`text-xl font-bold ${getVerdictColor(totalScore)}`}>
                {verdict}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onComplete(totalScore, verdict)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-6 text-lg"
        >
          Complete Validation
        </Button>
      </motion.div>
    </div>
  );
}
