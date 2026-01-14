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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="glass border-slate-800 p-6 h-full flex flex-col hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${member.color}-500`} />
                <h3 className="text-lg font-semibold text-slate-100">
                  {member.name}
                </h3>
              </div>
              <span className="text-xs text-slate-500">#{index + 1}</span>
            </div>

            <div className="flex-1 mb-4">
              <Textarea
                value={member.prompt}
                readOnly
                rows={6}
                className="bg-slate-950/50 border-slate-700 text-slate-300 text-sm font-mono resize-none focus:border-emerald-500"
              />
            </div>

            <Button
              onClick={() => handleCopy(member.id, member.prompt)}
              variant="outline"
              size="sm"
              className="w-full bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
            >
              {copiedId === member.id ? (
                <>
                  <Check size={16} className="mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} className="mr-2" />
                  Copy Prompt
                </>
              )}
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
