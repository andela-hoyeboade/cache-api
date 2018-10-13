import faker from 'faker';

import {cacheModel} from '../../models';


export default class Cache {
    constructor() {
    }

    get(key) {
        /**
         Returns the cached data for a given key. Create cached data if key is not found
         */
        return new Promise(function (resolve, reject) {
            cacheModel.findOrCreate({key: key}, {key: key, data: faker.lorem.sentence()})
                .then((result) => {
                    if (result.created) {
                        console.log('Cache miss');
                    } else {
                        console.log('Cache hit');
                    }
                    resolve({key: result.doc.key, data: result.doc.data, timeToLive: result.doc.timeToLive})
                })
                .catch(err => reject(err))
        });
    }

    set(key) {
        /**
         Creates or updates the data for a given key
         */
        return cacheModel.findOneAndUpdate({key: key}, {data: faker.lorem.sentence()}, {
            upsert: true, new: true, runValidators: true,
            setDefaultsOnInsert: true, fields: {key: 1, data: 1, _id: 0}
        });
    }

    delete(key) {
        /**
         * Removes a given key from the cache
         */
        return cacheModel.deleteOne({key: key})
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