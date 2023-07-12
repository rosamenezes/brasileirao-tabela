import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './user.routes';
import matchesRouter from './match.routes';

const router = Router();

router.use('/', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
