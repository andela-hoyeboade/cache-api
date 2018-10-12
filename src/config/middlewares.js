import morgan from 'morgan';

const isDev = process.env.NODE_ENV === 'development';

export default app => {
    if (isDev) {
        app.use(morgan('dev'));
    }
};