import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.iattv7.vinscantest',
  appName: 'VIN Scan Test',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
