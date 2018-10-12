import mongoose from 'mongoose'
// import mongoose from '../mongoose'
// TODO: Verify which is working/acceptable

const Schema = mongoose.Schema;

let CacheSchema = new Schema({
    key: {type: String, required: [true, 'cache key is required'], unique: true, trim: true, max: 100},
    data: {type: String, required: true},
});

export default mongoose.model('Cache', CacheSchema);