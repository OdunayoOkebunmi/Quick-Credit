import express from 'express';
import bodyParser from 'body-parser';
import router from './src/routes/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to Quick Credit!',
}));

// Handle non existing routes
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page not found',
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});


export default app;
