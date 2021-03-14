import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import 'express-async-errors';

import logex from './utils/logex';
import routes from './routes';
dotenv.config({path: __dirname + '/../.env'});

const app: express.Application = express();
app.disable('etag').disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())

logex()
routes(app);

const port = 4080;
app.listen(port, () => console.log(`Server listening at port ${port}`));