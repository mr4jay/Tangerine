"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const [hasCopied, setHasCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (codeRef.current?.innerText) {
      await navigator.clipboard.writeText(codeRef.current.innerText);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
        <pre ref={codeRef} className="bg-card p-4 rounded-lg overflow-x-auto text-sm my-4 border border-border/60">
            {children}
        </pre>
      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-2 right-2"
        >
             <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
                aria-label="Copy code to clipboard"
             >
                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
