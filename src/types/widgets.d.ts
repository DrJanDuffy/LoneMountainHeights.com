interface RealScoutConfig {
  apiKey: string;
  accountId: string;
}

interface HomebotConfig {
  apiKey: string;
  accountId: string;
}

interface CloudCMAConfig {
  apiKey: string;
}

interface PercyConfig {
  apiKey: string;
  region?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': {
        'agent-encoded-id': string;
        'sort-order': string;
        'listing-status': string;
        'property-types': string;
        'price-min': string;
        'price-max': string;
      };
    }
  }
}

export {}; 