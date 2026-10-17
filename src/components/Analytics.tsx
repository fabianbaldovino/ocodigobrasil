"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Registra no GA4 cada clique que leva ao checkout da Hotmart e ao WhatsApp.
function useOutboundClicks() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || !window.gtag) return;
      const href = link.href;
      const params = { link_url: href, page_path: window.location.pathname };
      if (href.includes('pay.hotmart.com')) {
        window.gtag('event', 'clique_comprar', params);
      } else if (href.includes('wa.me/')) {
        window.gtag('event', 'clique_whatsapp', params);
      }
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
}

export default function Analytics() {
  useOutboundClicks();
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { allow_google_signals: false, allow_ad_personalization_signals: false });`}
      </Script>
    </>
  );
}
