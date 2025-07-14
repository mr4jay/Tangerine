
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie_consent_is_true';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent !== 'true') {
      setShowConsent(true);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setShowConsent(false);
    // You might want to reload or trigger analytics initialization here
    window.location.reload(); 
  };
  
  const declineConsent = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'false');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-[100] w-auto max-w-md p-6 rounded-lg shadow-2xl bg-card border border-border/60"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie Consent"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Cookie className="h-8 w-8 text-primary flex-shrink-0" />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold font-headline text-foreground">We use cookies</h3>
              <p className="text-sm text-muted-foreground mt-1">
                This website uses cookies to enhance the user experience and analyze performance and traffic on our website.
              </p>
            </div>
            <div className="flex gap-2 self-start sm:self-center flex-shrink-0">
              <Button onClick={acceptConsent} size="sm">Accept</Button>
              <Button onClick={declineConsent} variant="outline" size="sm">Decline</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
