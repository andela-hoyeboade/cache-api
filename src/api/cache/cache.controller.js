import cacheRouteDefinitions from "./cache.routes.definitions";
import Cache from './cache';

const cache = new Cache();

export default class CacheController {

    static getAll(req, res) {
        cache.getAll().then((docs) => {
            res.json({results: docs})
        }).catch(() => {
            res.json({message: 'Unable to retrieve items'}).status(400);
        })
    };

    static getOne(req, res) {
        cache.get(req.params.key).then((data) => {
            res.json(data)
        }).catch(() => {
            res.json({message: 'Unable to retrieve item'}).status(400);
        })
    };

    static create(req, res) {
        cache.set(req.params.key).then((data) => {
            res.json(data)
        }).catch(() => {
            res.json({message: 'Unable to create item'}).status(400);
        })
    }

    static updateData(req, res) {
        cache.set(req.params.key).then((data) => {
            res.json(data)
        }).catch(() => {
            res.json({message: 'Unable to update item'}).status(400);
        })
    }

    static deleteAll(req, res) {
        cache.deleteAll().then(() => {
            res.status(204).json()
        }).catch(() => {
            res.json({message: 'Unable to delete items'}).status(400);
        })
    }

    static deleteOne(req, res) {
        cache.delete(req.params.key).then((writeOpResult) => {
            if (writeOpResult.n === 0) {
                res.status(404).json({message: 'Item not found'});
            } else {
                res.status(204).json()
            }
        }).catch(() => {
            res.json({message: 'Unable to delete item'}).status(400);
        })
    }

    static notFound(req, res) {
        res.json({
            message: 'Route/method not found. See available routes and methods...',
            routes: cacheRouteDefinitions
        });
    }
}