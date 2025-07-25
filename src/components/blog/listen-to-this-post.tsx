
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { textToSpeech } from '@/ai/flows/tts-flow';
import { Volume2, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const ListenToPost = ({ content }: { content: string }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateAudio = async () => {
    try {
      setIsLoading(true);
      setAudioUrl(null); // Reset previous audio if any
      const result = await textToSpeech({ text: content.substring(0, 4000) }); // Limit text length for API
      setAudioUrl(result.audio);
    } catch (e) {
      console.error("Failed to generate audio:", e);
      toast({
        variant: "destructive",
        title: "Audio Generation Failed",
        description: "There was an error generating the audio for this post. Please try again later.",
      })
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClosePlayer = () => {
    setAudioUrl(null);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <h3 className="text-2xl font-bold font-headline text-primary flex items-center gap-2 mb-4">
            <Volume2 className="h-6 w-6" />
            Listen to this Post
        </h3>
        <AnimatePresence mode="wait">
            {!audioUrl && (
                 <motion.div 
                    key="button" 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                 >
                    <Button onClick={handleGenerateAudio} variant="outline" disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating audio...
                        </>
                      ) : (
                        <>
                          Generate Audio
                        </>
                      )}
                    </Button>
                </motion.div>
            )}
            
            {audioUrl && (
                <motion.div 
                    key="player" 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                     <Card className="bg-card/50 border-border/60">
                        <CardContent className="p-4 flex items-center gap-4">
                           <audio controls src={audioUrl} className="w-full h-10" autoPlay>
                                Your browser does not support the audio element.
                            </audio>
                            <Button variant="ghost" size="icon" onClick={handleClosePlayer} aria-label="Close audio player">
                                <X className="h-5 w-5" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
  );
};

export default ListenToPost;
