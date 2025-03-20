interface WidgetConfig {
  apiKey: string;
  accountId?: string;
  region?: string;
}

export const widgetConfig = {
  realscout: {
    apiKey: process.env.NEXT_PUBLIC_REALSCOUT_API_KEY || '',
    accountId: process.env.NEXT_PUBLIC_REALSCOUT_ACCOUNT_ID || '',
  },
  homebot: {
    apiKey: process.env.NEXT_PUBLIC_HOMEBOT_API_KEY || '',
    accountId: process.env.NEXT_PUBLIC_HOMEBOT_ACCOUNT_ID || '',
  },
  cloudcma: {
    apiKey: process.env.NEXT_PUBLIC_CLOUDCMA_API_KEY || '',
  },
  percy: {
    apiKey: process.env.NEXT_PUBLIC_PERCY_API_KEY || '',
    region: process.env.NEXT_PUBLIC_PERCY_REGION || 'us',
  },
} as const;

// Widget initialization functions
export const initializeWidgets = () => {
  // RealScout
  if (typeof window !== 'undefined' && window.RealScout) {
    window.RealScout.init({
      apiKey: widgetConfig.realscout.apiKey,
      accountId: widgetConfig.realscout.accountId,
    });
  }

  // Homebot
  if (typeof window !== 'undefined' && window.Homebot) {
    window.Homebot.init({
      apiKey: widgetConfig.homebot.apiKey,
      accountId: widgetConfig.homebot.accountId,
    });
  }

  // CloudCMA
  if (typeof window !== 'undefined' && window.CloudCMA) {
    window.CloudCMA.init({
      apiKey: widgetConfig.cloudcma.apiKey,
    });
  }

  // Percy.ai
  if (typeof window !== 'undefined' && window.Percy) {
    window.Percy.init({
      apiKey: widgetConfig.percy.apiKey,
      region: widgetConfig.percy.region,
    });
  }
}; 