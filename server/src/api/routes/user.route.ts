import express, { IRouter } from 'express';
import {
  signUpOneUserController,
  signInOneUserController,
  getAllUsersController,
  getOneUserController,
  updateOneUserPropertyController,
  updateOneUserPropertiesController,
  deleteOneUserController,
} from '../controllers/user.controller';

import { UserRole } from '../models/user.model';

import { verifyUserWithJWT, verifyUserRoles } from '../middleware/authorization.middleware';

const router: IRouter = express.Router();

router.post('/auth/signup', signUpOneUserController);
router.post('/auth/signin', signInOneUserController);

router.get('/get-all', getAllUsersController);
router.get('/auth/get-profile', verifyUserWithJWT, verifyUserRoles([UserRole.User]), getOneUserController);

router.put('/auth/update-profile', verifyUserWithJWT, verifyUserRoles([UserRole.User]), updateOneUserPropertiesController);
router.patch('/auth/update-profile-one', verifyUserWithJWT, verifyUserRoles([UserRole.User]), updateOneUserPropertyController);

router.delete('/auth/delete-profile', verifyUserWithJWT, verifyUserRoles([UserRole.User]), deleteOneUserController);


///////////////////////////////////////////////////////////
import {
  deleteAllUserController,
} from '../controllers/user.controller';


router.delete('/delete-all', deleteAllUserController);
//////////////////////////////////////////////////////////


export { router };
