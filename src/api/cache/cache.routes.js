import express from 'express';
import cacheController from "./cache.controller";
const router = express.Router([]);

router.get('/cache/keys/', cacheController.getAll);
router.delete('/cache/keys/', cacheController.deleteAll);

router.get('/cache/:key/', cacheController.getOne);
router.post('/cache/:key/', cacheController.create);
router.put('/cache/:key/', cacheController.updateData);
router.delete('/cache/:key/', cacheController.deleteOne);

router.get('/cache/**', cacheController.notFound);

export default router;