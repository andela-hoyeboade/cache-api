import faker from 'faker';

import { cacheModel } from '../../models';


const TTL = 3600000; // 3600000 milliseconds i.e 1 hour
const MAX_CACHE_ITEMS = 10;

export default class Cache {
    constructor() {
    }

    get(key) {
        /**
        Returns the cached data for a given key
         */
        return cacheModel.findOne({key: key}).select('data -_id')
    }

    set(key) {
        /**
        Creates or updates the data for a given key
         */
        return cacheModel.findOneAndUpdate({key: key}, {data: faker.lorem.sentence()},
            {upsert: true, new: true, runValidators: true, fields: { key:1, data: 1, _id: 0 }})
    }

    delete(key) {
        /**
         * Removes a given key from the cache
         */
        return cacheModel.deleteOne({ key: key })
    }

    getAll() {
        /**
         * Return a list of keys found in the cache
         */
        return cacheModel.find().select('key -_id')
    }

    deleteAll() {
        /**
         * Removes all keys from the cache
         */
        return cacheModel.deleteMany({});
    }
}