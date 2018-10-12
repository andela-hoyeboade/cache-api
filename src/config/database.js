import mongoose from 'mongoose';
import constants from './constants';

try {
    mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true })
} catch (err) {
    mongoose.createConnection(constants.MONGO_URL)
}
mongoose.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
    throw e;
});