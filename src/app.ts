import express, { Application, json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import routes from './routes';

const app: Application = express();
const port: number = config.app.port as number;

app.use(json(), cors(), helmet(), morgan('dev'));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`The server is running on port ${port}...`);
});

export default app;
