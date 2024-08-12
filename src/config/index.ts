const env = import.meta.env.DEV ? 'development' : 'production';

const config = {
  development: {
    HOST: 'http://localhost:3000',
    TAINAN_API_URL: 'https://data.tainan.gov.tw',
    TAINAN_API_ID: 'ae3a8531-2ee2-48fb-bb97-05e34d39a7ab'
  },
  production: {
    HOST: 'https://api.example.com',
    TAINAN_API_URL: 'https://data.tainan.gov.tw',
    TAINAN_API_ID: 'ae3a8531-2ee2-48fb-bb97-05e34d39a7ab'
  },
} as const;

export default config[env];