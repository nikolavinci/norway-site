'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../shared/utils/supabase';
import Script from 'next/script';

export default function Analytics() {
  const [gaId, setGaId] = useState<string | null>(null);
  const [gscId, setGscId] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      // Assuming a table called 'site_settings' exists with rows: key, value
      const { data, error } = await supabase.from('site_settings').select('*');
      if (!error && data) {
        const gaSetting = data.find((row) => row.key === 'google_analytics_id');
        const gscSetting = data.find((row) => row.key === 'google_search_console_id');
        
        if (gaSetting?.value) setGaId(gaSetting.value);
        if (gscSetting?.value) setGscId(gscSetting.value);
      }
    }
    loadSettings();
  }, []);

  return (
    <>
      {gscId && (
        <meta name="google-site-verification" content={gscId} />
      )}
      
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
