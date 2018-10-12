const commonConfig = {
    PORT: 5000,
    MONGO_URL: 'mongodb://localhost/cacheapi',
};

const devConfig = {};
const testConfig = {};
const prodConfig = {};

function envConfig() {
     switch (process.env.NODE_ENV) {
         case 'production':
             return prodConfig;
         case 'development':
             return devConfig;
         case 'test':
             return testConfig;
         default:
             return devConfig;
     }
 }

export default { ...commonConfig, ...envConfig()}