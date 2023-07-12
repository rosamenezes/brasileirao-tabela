import { Router } from 'express';

import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req, res) => matchController.getAllMatches(req, res));

router.patch('/:id/finish', Validations.TokenValidation, (req, res) =>
  matchController.finishMatch(req, res));

router.patch('/:id', Validations.TokenValidation, (req, res) =>
  matchController.updateMatch(req, res));

router.post('/', Validations.TokenValidation, Validations.MatchValidations, (req, res) =>
  matchController.createMatch(req, res));

export default router;
