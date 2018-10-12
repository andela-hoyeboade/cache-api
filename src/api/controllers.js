import routeDefinitions from './routes.definitions';

export class BaseController {
    static index(req, res) {
        res.json({
            message: 'Welcome to Cache API!. See routes...',
            routes: routeDefinitions
        });
    }

    static notFound(req,res) {
        res.json({
            message: 'Route/method not found. See available routes and methods...',
            routes: routeDefinitions
        });
    }
}