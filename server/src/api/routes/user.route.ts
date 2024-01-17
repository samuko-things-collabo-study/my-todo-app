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
router.get('/auth/get-one', verifyUserWithJWT, verifyUserRoles([UserRole.User]), getOneUserController);

router.patch('/auth/update-one-prop', verifyUserWithJWT, verifyUserRoles([UserRole.User]), updateOneUserPropertyController);
router.put('/auth/update-all-prop', verifyUserWithJWT, verifyUserRoles([UserRole.User]), updateOneUserPropertiesController);

router.delete('/auth/delete-one', verifyUserWithJWT, verifyUserRoles([UserRole.User]), deleteOneUserController);


///////////////////////////////////////////////////////////
import {
  deleteAllUserController,
} from '../controllers/user.controller';


router.delete('/delete-all', deleteAllUserController);
//////////////////////////////////////////////////////////


export { router };
