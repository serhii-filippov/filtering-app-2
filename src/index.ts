import 'module-alias/register'

import helmet from 'helmet';
import {connect} from 'mongoose';

import {AppContainer} from '@/application/app';
import {MONGODB_URI, PORT} from '@/application/config/environment';
import {StartProjectInit} from '@tsclean/core';
import bodyParser from 'body-parser';


run()
    .catch((err) => console.error('Error during server start up: ', err))

async function run(): Promise<void> {
    await connect(MONGODB_URI);
    console.log('DB Mongo connected')
    const app = await StartProjectInit.create(AppContainer);
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    await app.listen(PORT, () => console.log('Running on port: ' + PORT));
}