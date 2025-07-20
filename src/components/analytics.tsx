
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"; // Replace with your GA ID
const COOKIE_CONSENT_KEY = 'cookie_consent_is_true';

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  non_interaction?: boolean;
};

// Centralized function to send events to Google Analytics
export const trackEvent = (action: string, params: Omit<GTagEvent, 'action'>) => {
    if (typeof window.gtag !== 'function' || localStorage.getItem(COOKIE_CONSENT_KEY) !== 'true') {
        return;
    }
    window.gtag('event', action, params);
};


const Analytics = () => {
  const [consent, setConsent] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkConsent = () => {
        const consentValue = localStorage.getItem(COOKIE_CONSENT_KEY) === 'true';
        setConsent(consentValue);
    };
    
    checkConsent();

    // Listen for storage changes to update consent in real-time
    window.addEventListener('storage', checkConsent);

    return () => {
        window.removeEventListener('storage', checkConsent);
    };
  }, []);

  useEffect(() => {
    if (consent && pathname) {
      const url = pathname + (searchParams ? searchParams.toString() : '');
      if (typeof window.gtag === 'function') {
        window.gtag('config', GA_TRACKING_ID, {
          page_path: url,
        });
      }
    }
  }, [pathname, searchParams, consent]);

  if (!consent) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('js', new Date());
            
            gtag('consent', 'default', {
                'analytics_storage': 'denied'
            });

            gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
            });

            const consentGiven = localStorage.getItem('${COOKIE_CONSENT_KEY}') === 'true';
            if (consentGiven) {
              gtag('consent', 'update', {
                  'analytics_storage': 'granted'
              });
            }
          `,
        }}
      />
    </>
  );
};

export default Analytics;
