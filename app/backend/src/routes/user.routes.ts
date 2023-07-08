import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import UserModel from '../models/UserModel';
import Encrypter from '../utils/Encrypter';
import Token from '../utils/JWT';
import Validations from '../middlewares/Validations';

const userModel = new UserModel();
const encrypter = new Encrypter();
const token = new Token();
const userService = new UserService(userModel, encrypter, token);
const userController = new UserController(userService, userModel);

const router = Router();

router.post('/login', Validations.validateLogin, (req, res) => userController.login(req, res));

router.get(
  '/login/role',
  Validations.TokenValidation,
  async (req, res) => userController.getRole(req, res),
);

export default router;
