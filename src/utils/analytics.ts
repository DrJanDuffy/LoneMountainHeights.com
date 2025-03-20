declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

type EventParams = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && !window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID);
  }
};

// Track page views
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track events
export const event = ({ action, category, label, value }: EventParams) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Widget specific tracking
export const trackWidgetInteraction = (widgetName: string, action: string) => {
  event({
    action,
    category: 'Widget Interaction',
    label: widgetName,
  });
};

// Lead tracking
export const trackLeadGeneration = (source: string) => {
  event({
    action: 'Lead Generated',
    category: 'Lead Generation',
    label: source,
  });
};

// Search tracking
export const trackPropertySearch = (searchParams: string) => {
  event({
    action: 'Property Search',
    category: 'Search',
    label: searchParams,
  });
};

// Market analysis tracking
export const trackMarketAnalysis = (analysisType: string) => {
  event({
    action: 'Market Analysis',
    category: 'Analysis',
    label: analysisType,
  });
}; 