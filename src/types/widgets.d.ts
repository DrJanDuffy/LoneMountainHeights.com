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
  interface Window {
    RealScout?: {
      init: (config: RealScoutConfig) => void;
    };
    Homebot?: {
      init: (config: HomebotConfig) => void;
    };
    CloudCMA?: {
      init: (config: CloudCMAConfig) => void;
    };
    Percy?: {
      init: (config: PercyConfig) => void;
    };
  }
} 