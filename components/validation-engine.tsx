"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ProgressStepper } from "@/components/progress-stepper";
import { ClipboardManager } from "@/components/clipboard-manager";
import { DecisionMatrix } from "@/components/decision-matrix";
import { councilOf7Prompts, generatePrompt } from "@/lib/prompts";

const steps = [
  {
    id: 1,
    title: "Niche Idea",
    description: "Define your concept",
  },
  {
    id: 2,
    title: "AI Research",
    description: "Council analysis",
  },
  {
    id: 3,
    title: "Decision Matrix",
    description: "Score & validate",
  },
];

export function ValidationEngine() {
  const [currentStep, setCurrentStep] = useState(0);
  const [nicheIdea, setNicheIdea] = useState("");
  const [nicheDescription, setNicheDescription] = useState("");
  const [validationComplete, setValidationComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalVerdict, setFinalVerdict] = useState("");

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = (score: number, verdict: string) => {
    setFinalScore(score);
    setFinalVerdict(verdict);
    setValidationComplete(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setNicheIdea("");
    setNicheDescription("");
    setValidationComplete(false);
    setFinalScore(0);
    setFinalVerdict("");
  };

  const keyPrompts = councilOf7Prompts.filter((p) => p.id === 1 || p.id === 5);

  return (
    <div className="space-y-6">
      {!validationComplete ? (
        <>
          <ProgressStepper steps={steps} currentStep={currentStep} />

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="glass border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <Lightbulb className="text-emerald-400" size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-100">
                        Step 1: Define Your Niche Idea
                      </h2>
                      <p className="text-slate-400">
                        Enter the niche or business idea you want to validate
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Niche Idea *
                      </label>
                      <Input
                        value={nicheIdea}
                        onChange={(e) => setNicheIdea(e.target.value)}
                        placeholder="e.g., AI-powered meal planning for busy professionals"
                        className="bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Description (Optional)
                      </label>
                      <Textarea
                        value={nicheDescription}
                        onChange={(e) => setNicheDescription(e.target.value)}
                        placeholder="Provide additional context about your idea, target audience, or unique value proposition..."
                        rows={4}
                        className="bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </Card>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    disabled={!nicheIdea.trim()}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                    size="lg"
                  >
                    Continue to AI Research
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="glass border-slate-800 p-8">
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">
                    Step 2: Council of 7 Research
                  </h2>
                  <p className="text-slate-400 mb-6">
                    Copy these prompts to the specified AI platforms and gather insights
                  </p>

                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 mb-6">
                    <p className="text-sm text-emerald-400">
                      <strong>Focus on Window 1 (Perplexity)</strong> for market gaps and{" "}
                      <strong>Window 5 (Grok)</strong> for X/Twitter trends. These provide
                      critical validation data.
                    </p>
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {keyPrompts.map((prompt) => (
                    <ClipboardManager
                      key={prompt.id}
                      prompt={prompt}
                      generatedPrompt={generatePrompt(prompt.promptTemplate, nicheIdea)}
                    />
                  ))}
                </div>

                <Card className="glass border-slate-800 p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">
                    Additional Council Members (Optional)
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {councilOf7Prompts
                      .filter((p) => p.id !== 1 && p.id !== 5)
                      .map((prompt) => (
                        <ClipboardManager
                          key={prompt.id}
                          prompt={prompt}
                          generatedPrompt={generatePrompt(prompt.promptTemplate, nicheIdea)}
                        />
                      ))}
                  </div>
                </Card>

                <div className="flex justify-between">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-slate-700 hover:bg-slate-800"
                    size="lg"
                  >
                    <ArrowLeft className="mr-2" size={20} />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                    size="lg"
                  >
                    Proceed to Scoring
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="glass border-slate-800 p-8">
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">
                    Step 3: Decision Matrix
                  </h2>
                  <p className="text-slate-400">
                    Rate each category based on the AI feedback you received
                  </p>
                </Card>

                <DecisionMatrix nicheIdea={nicheIdea} onComplete={handleComplete} />

                <div className="flex justify-start">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-slate-700 hover:bg-slate-800"
                    size="lg"
                  >
                    <ArrowLeft className="mr-2" size={20} />
                    Back to Research
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass border-2 border-emerald-500/50 p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-emerald-400" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-100 mb-2">
                Validation Complete!
              </h2>
              <p className="text-slate-400">Your niche has been analyzed</p>
            </div>

            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-800 mb-6">
              <p className="text-lg text-slate-300 mb-2">
                <strong className="text-emerald-400">{nicheIdea}</strong>
              </p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div>
                  <p className="text-sm text-slate-500">Final Score</p>
                  <p className="text-3xl font-bold text-emerald-400">{finalScore.toFixed(1)}</p>
                </div>
                <div className="w-px h-12 bg-slate-700" />
                <div>
                  <p className="text-sm text-slate-500">Verdict</p>
                  <p className="text-lg font-bold text-emerald-400">{finalVerdict}</p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleReset}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
              size="lg"
            >
              Validate Another Idea
            </Button>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
