import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './user.routes';
import matchesRouter from './match.routes';
import leaderBoardRouter from './leaderbord.routes';

const router = Router();

router.use('/', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
