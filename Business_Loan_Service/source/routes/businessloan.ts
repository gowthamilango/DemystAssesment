import express from 'express';
import controller from '../controllers/business-loan.controller';

const router = express.Router();

router.get('/balanceSheet/:id', controller.getBalSheet);
router.post('/init', controller.initAppln);
router.post('/outcome', controller.finalOutcome);

export default router;
