"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CouncilMember {
  id: string;
  name: string;
  prompt: string;
  color: string;
}

interface CouncilGridProps {
  members: CouncilMember[];
}

export function CouncilGrid({ members }: CouncilGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {members.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="glass border-slate-800 p-4 h-full flex flex-col hover:border-emerald-500/30 transition-all bg-slate-950/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full bg-${member.color}-500`} />
                <h3 className="text-base font-semibold text-slate-100">
                  {member.name}
                </h3>
              </div>
              <span className="text-xs text-slate-500">#{index + 1}</span>
            </div>

            <div className="flex-1 mb-3">
              <Textarea
                value={member.prompt}
                readOnly
                rows={8}
                className="bg-slate-950/70 border-slate-700 text-slate-300 text-xs font-mono resize-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <Button
              onClick={() => handleCopy(member.id, member.prompt)}
              variant="outline"
              size="sm"
              className="w-full bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 text-xs py-2"
            >
              {copiedId === member.id ? (
                <>
                  <Check size={14} className="mr-1.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} className="mr-1.5" />
                  Copy
                </>
              )}
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
