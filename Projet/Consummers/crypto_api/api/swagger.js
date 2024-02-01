const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const userPreferencesRoutes = require("./routes/userPreferences.routes");
const userKeywordsRoutes = require("./routes/userKeywords.routes");
const keywordsRoutes = require("./routes/keywords.routes");
const userCryptoListRoutes = require("./routes/userCryptoList.routes");
const cryptoCoinsRoutes = require("./routes/cryptoCoins.routes");
const popularCryptoRoutes = require("./routes/popularCrypto.routes");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/auth.routes.js', 
    './routes/user.routes.js', 
    './routes/userPreferences.routes.js', 
    './routes/userKeywords.routes.js', 
    './routes/keywords.routes.js', 
    './routes/userCryptoList.routes.js', 
    './routes/cryptoCoins.routes.js', 
    './routes/popularCrypto.routes.js'
];

const doc = {
    info: {
      title: 'Count of Money API',
    },
    host: process.env.WEBSITE_HOSTNAME + '/api',
    schemes: ['https'],
    apis: endpointsFiles,
  };


swaggerAutogen(outputFile, endpointsFiles, doc);