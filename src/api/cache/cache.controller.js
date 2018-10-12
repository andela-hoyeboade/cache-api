import cacheRouteDefinitions from "./cache.routes.definitions";
import Cache from './cache';

const cache = new Cache({ ttl: 500000});

export default class CacheController {

    static getAll(req, res) {
        cache.getAll().then((docs) => {
            res.json({results: docs})
        }).catch((err) => {
            res.json({err}).status(400);
        })
    };

    static getOne(req, res) {
        cache.get(req.params.key).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json({err}).status(400);
        })
    };

    static create(req, res) {
        cache.set(req.params.key).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json({err}).status(400);
        })
    }

    static updateData(req, res) {
        cache.set(req.params.key).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json({err}).status(400);
        })
    }

    static deleteAll(req, res) {
        cache.deleteAll().then(() => {
            res.status(204).json()
        }).catch((err) => {
            res.json({err}).status(400);
        })
    }

    static deleteOne(req, res) {
        cache.delete(req.params.key).then(() => {
            res.status(204).json()
        }).catch((err) => {
            res.json({err}).status(400);
        })
    }

    static notFound(req, res) {
        res.json({
            message: 'Route/method not found. See available routes and methods...',
            routes: cacheRouteDefinitions
        });
    }
}