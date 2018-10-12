import express from 'express';

import constants from './config/constants';
import middlewareConfig from './config/middlewares';

import './config/database';

const app = express();

middlewareConfig(app);

app.use(express.urlencoded({extended: true}));

app.listen(constants.PORT, console.log(`App running on port ${constants.PORT}`));
