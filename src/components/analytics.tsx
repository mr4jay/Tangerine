
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"; // Replace with your GA ID
const COOKIE_CONSENT_KEY = 'cookie_consent_is_true';

const Analytics = () => {
  const [consent, setConsent] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const consentValue = localStorage.getItem(COOKIE_CONSENT_KEY) === 'true';
    setConsent(consentValue);
  }, []);

  useEffect(() => {
    if (consent && pathname) {
      const url = pathname + (searchParams ? searchParams.toString() : '');
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
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

            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
          `,
        }}
      />
    </>
  );
};

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
    if (typeof window.gtag !== 'function') {
        return;
    }
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};


export default Analytics;
