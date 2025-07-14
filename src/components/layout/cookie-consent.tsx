
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
    // Check for consent on the client side only
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === null) { // Only show if consent has not been given
      setShowConsent(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, String(accepted));
    setShowConsent(false);
    if (accepted && typeof window.gtag === 'function') {
      // If gtag is already loaded (e.g., from a previous session), update consent
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
    // No reload needed, Analytics component will react to changes or on next page view.
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
              <Button onClick={() => handleConsent(true)} size="sm">Accept</Button>
              <Button onClick={() => handleConsent(false)} variant="outline" size="sm">Decline</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
