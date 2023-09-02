import express from 'express';
import businessloan from './businessloan';

const router = express.Router();

router.use('/business-loan', businessloan);

export default router;