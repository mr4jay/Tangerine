
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getKeyTakeaways } from '@/ai/flows/key-takeaways-flow';
import { Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const KeyTakeaways = ({ content }: { content: string }) => {
  const [takeaways, setTakeaways] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTakeaways = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await getKeyTakeaways({ content });
        setTakeaways(result.takeaways);
      } catch (e) {
        console.error("Failed to fetch key takeaways:", e);
        setError("Sorry, I couldn't generate the key takeaways for this post at the moment.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTakeaways();
  }, [content]);

  return (
    <motion.div 
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-secondary/50 border-border/60">
        <CardHeader className="flex flex-row items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-headline">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div key="loading" exit={{ opacity: 0 }} className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-3/4" />
              </motion.div>
            )}
            {error && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
            {!isLoading && !error && takeaways.length > 0 && (
              <motion.ul 
                key="takeaways" 
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {takeaways.map((takeaway, index) => (
                  <motion.li key={index} className="flex items-start gap-3" variants={itemVariants}>
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90">{takeaway}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KeyTakeaways;
