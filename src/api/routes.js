import express from "express";

import cacheRouter from './cache/cache.routes';
import {BaseController} from "./controllers";

const router = express.Router([]);

router.get('/', BaseController.index);
router.get('**', BaseController.notFound);

export default [cacheRouter, router]