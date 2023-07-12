import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBordController';

const router = Router();

router.get('/home', (req, res) => LeaderBoardController.boardHome(req, res));

router.get('/away', (req, res) => LeaderBoardController.boardAway(req, res));

export default router;
