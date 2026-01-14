"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { PromptWindow } from "@/lib/prompts";

interface ClipboardManagerProps {
  prompt: PromptWindow;
  generatedPrompt: string;
}

export function ClipboardManager({ prompt, generatedPrompt }: ClipboardManagerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getPlatformUrl = (platform: string) => {
    const urls: Record<string, string> = {
      "Perplexity": "https://www.perplexity.ai",
      "ChatGPT": "https://chat.openai.com",
      "Claude": "https://claude.ai",
      "Gemini": "https://gemini.google.com",
      "Grok": "https://x.com/i/grok"
    };
    return urls[platform] || "#";
  };

  return (
    <Card className="glass border-slate-800 p-6 hover:border-emerald-500/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
              Window {prompt.id}
            </span>
            <span className="text-xs text-slate-500">{prompt.platform}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-100">{prompt.name}</h3>
          <p className="text-sm text-slate-400 mt-1">{prompt.purpose}</p>
        </div>
      </div>

      <div className="bg-slate-950/50 rounded-lg p-4 mb-4 border border-slate-800">
        <p className="text-sm text-slate-300 leading-relaxed font-mono">
          {generatedPrompt}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="flex-1 bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2"
              >
                <Check size={16} />
                Copied!
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2"
              >
                <Copy size={16} />
                Copy Prompt
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        <Button
          onClick={() => window.open(getPlatformUrl(prompt.platform), "_blank")}
          variant="outline"
          size="sm"
          className="border-slate-700 hover:bg-slate-800 hover:text-emerald-400"
        >
          <ExternalLink size={16} />
        </Button>
      </div>
    </Card>
  );
}
