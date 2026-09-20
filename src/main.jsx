import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/components/query-provider';
import { CookieConsentProvider } from '@/features/cookie-consent';
import App from './App';
import '@/app/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <CookieConsentProvider>
          <Toaster />
          <App />
        </CookieConsentProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);

