import '@babel/polyfill';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import Debug from 'debug';
import logger from 'morgan';
import swaggerDocument from './swagger.json';
import router from './src/routes';
import models from './src/database/models';
import { serverErrorResponse, developmentServerErrorResponse } from './src/helper/responseHandler';

if (process.env.NODE_ENV !== 'production') dotenv.config();

const app = express();
const { sequelize } = models;
const isProduction = process.env.NODE_ENV === 'production';
const debug = Debug(process.env.DEBUG);

app.use(cors());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(router);
app.use(express.json());

process.on('uncaughtException', (err) => {
  debug(err.stack);
  process.exit(1);
});
if (!isProduction) {
  app.use(developmentServerErrorResponse);
}
app.use(serverErrorResponse);

// Handle non existing routes
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page not found',
}));


(async () => {
  await sequelize.sync();
})();

const server = app.listen(process.env.PORT || 5500, () => {
  debug(`Listening on port ${server.address().port}`);
});


export default app;
