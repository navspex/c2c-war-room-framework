"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const stepNumber = index + 1;

          return (
            <div key={step.id} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  {index > 0 && (
                    <div className="absolute right-1/2 top-1/2 w-full h-0.5 -translate-y-1/2">
                      <motion.div
                        className={`h-full ${
                          isCompleted ? "bg-emerald-500" : "bg-slate-800"
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isCompleted ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformOrigin: "right" }}
                      />
                    </div>
                  )}

                  <motion.div
                    className={`
                      relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                      border-2 transition-all
                      ${
                        isCompleted
                          ? "bg-emerald-500 border-emerald-500"
                          : isCurrent
                          ? "bg-emerald-500/20 border-emerald-500"
                          : "bg-slate-900 border-slate-700"
                      }
                    `}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isCurrent ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="text-white" size={24} />
                      </motion.div>
                    ) : (
                      <span
                        className={`
                          font-bold text-lg
                          ${isCurrent ? "text-emerald-400" : "text-slate-500"}
                        `}
                      >
                        {stepNumber}
                      </span>
                    )}
                  </motion.div>

                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-1/2 w-full h-0.5 -translate-y-1/2">
                      <motion.div
                        className={`h-full ${
                          isCompleted ? "bg-emerald-500" : "bg-slate-800"
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isCompleted ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center max-w-[120px]">
                  <p
                    className={`
                      text-sm font-semibold
                      ${isCurrent ? "text-emerald-400" : isCompleted ? "text-emerald-500" : "text-slate-500"}
                    `}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
