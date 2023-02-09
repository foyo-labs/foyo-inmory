import '@/styles/globals.css'
import React, { useMemo } from 'react';
import { useRouter } from "next/router";
import type { AppProps } from 'next/app'
import { IntlProvider } from "react-intl";

import EN from "../lang/en.json"
import ZH from "../lang/zh.json"
import { Locale } from "../lang"

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale }
  const messages = useMemo(() => {
    switch (locale) {
      case "zh":
        return ZH
      case "en":
        return EN
      default:
        return ZH
    }
  }, [locale])
  
  return <IntlProvider 
        locale={navigator.language}
        defaultLocale={navigator.language}
        messages={messages}>
        <Component {...pageProps} />
    </IntlProvider>
}
