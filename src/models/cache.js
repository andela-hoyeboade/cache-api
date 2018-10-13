import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate';

const MAX_CACHE_ITEMS = 10;
const TIME_TO_LIVE = 3600000; // 3600000 milliseconds i.e 1 hour
const Schema = mongoose.Schema;

const getCacheExpireTime = () => {
    /**
     * Return new expire date for cache based on value of TIME_TO_LIVE;
     * @type {Date}
     */
    const currentDate = new Date();
    return new Date(currentDate.getTime() + TIME_TO_LIVE);
};

const CacheSchema = new Schema({
    key: {type: String, required: [true, 'cache key is required'], unique: true, trim: true, max: 100},
    data: {type: String, required: [true, 'cache data is required']},
    expiresAt: {type: Date, default: getCacheExpireTime}
}, {timestamps: {}});
CacheSchema.plugin(findOrCreate);

const overwriteOldRecords = (next) => {
    /**
     * Overwrite old records if maximum amount of cache items is reached
     * This would remove the minimum oldest records that leaves remaining cache items less than 10
     * e.g if there are initially 12 records, 3 oldest records would be removed. If there are 10
     * records, only one record (i.e the oldest record) would be recovered.
     * Oldest records are defined as records having the least updatedAt values
     */
    cacheModel.estimatedDocumentCount().then((totalCacheItems) => {
        if (totalCacheItems >= MAX_CACHE_ITEMS) {
            const noOfItemsToRemove = totalCacheItems > MAX_CACHE_ITEMS ? (totalCacheItems - (MAX_CACHE_ITEMS - 1)) : 1;
            cacheModel.find({}).select('_id').sort({updatedAt: 1}).limit(noOfItemsToRemove).then((docs) => {
                const docsIds = docs.map((doc) => {
                    return doc._id;
                });
                cacheModel.deleteMany({_id: {$in: docsIds}}).then(() => {
                    next()
                }).catch(err => next(err))
            }).catch(err => next(err))
        }
        next()
    }).catch((err) => next(err));
};

const updateCacheExpireTime = (doc, next) => {
    /**
     * update cache ( doc ) expire time after a successful retrieval
     */
    if (doc) {
        doc.update({
            $set: {expiresAt: getCacheExpireTime()}
        }).then(() => next()).catch((err) => next(err));
    }
    next();
};

CacheSchema.pre('save', (next) => {
    overwriteOldRecords(next);
});

CacheSchema.pre('findOneAndUpdate', (next) => {
    overwriteOldRecords(next);
});

CacheSchema.post(/^findOne/, (doc, next) => {
    updateCacheExpireTime(doc, next);
})

CacheSchema.pre(/^findOne/, (next) => {
    console.log(this);
    next()
});

const cacheModel = mongoose.model('Cache', CacheSchema);

export default cacheModel;