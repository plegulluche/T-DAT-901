const express = require("express");
const bodyParser = require('body-parser');
const { requireAuth, checkUser } = require('./middleware/auth.middleware')
const cookieParser = require('cookie-parser');
require('./config/db');
const cors = require('cors');

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const userPreferencesRoutes = require("./routes/userPreferences.routes");
const userRolesRoutes = require("./routes/userRole.routes");
const userKeywordsRoutes = require("./routes/userKeywords.routes");
const keywordsRoutes = require("./routes/keywords.routes");
const userCryptoListRoutes = require("./routes/userCryptoList.routes");
const cryptoCoinsRoutes = require("./routes/cryptoCoins.routes");
const popularCryptoRoutes = require("./routes/popularCrypto.routes");

const testRoutes = require("./routes/test.routes");

const app = express();
const paginate = require('express-paginate');


//const binanceWebsocket = require('./crypto-api/binance/binance.WEBSOCKET.api-connector');

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
    './routes/popularCrypto.routes.js',
    './routes/test.routes.js'
];

const doc = {
    info: {
      title: 'Count of Money API',
    },
    host: process.env.WEBSITE_HOSTNAME + '/api',
    schemes: ['http', 'https'],
    apis: endpointsFiles,
  };


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');
});

app.use('/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);

const corsOptions = {
    origin: [process.env.CLIENT_URL],
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})
app.use(paginate.middleware(10, 50));
//routes
app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/user-preferences/', userPreferencesRoutes);
app.use('/api/user-roles/', userRolesRoutes);
app.use('/api/user-keywords/', userKeywordsRoutes);
app.use('/api/keywords/', keywordsRoutes);
app.use('/api/user-crypto-list/', userCryptoListRoutes);
app.use('/api/crypto-coins/', cryptoCoinsRoutes);
app.use('/api/popular-crypto/', popularCryptoRoutes);
app.use('/api/test/', testRoutes);

//server
app.listen(process.env.PORT, () => console.log('serveur started :' + process.env.PORT));
