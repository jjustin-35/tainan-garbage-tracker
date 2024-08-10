const env = import.meta.env.DEV ? 'development' : 'production';

const config = {
  development: {
    HOST: 'http://localhost:3000',
    TAINAN_API_URL: 'https://data.tainan.gov.tw',
  },
  production: {
    HOST: 'https://api.example.com',
    TAINAN_API_URL: 'https://data.tainan.gov.tw',
  },
} as const;

export default config[env];