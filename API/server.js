import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './src/routes/userRoute';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).send({ message: 'Hello World' }));

app.use('/api/v1/auth', userRoute);

// Handle non existing routes
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page not found',
}));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`app running on port ${port}`);
