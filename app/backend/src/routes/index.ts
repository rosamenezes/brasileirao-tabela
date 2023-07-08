import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/', userRouter);
router.use('/teams', teamsRouter);

export default router;
