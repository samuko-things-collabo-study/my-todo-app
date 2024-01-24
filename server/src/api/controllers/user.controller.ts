import { Request, Response } from 'express';

import {
  signUpOneUserService,
  signInOneUserService,
  getAllUsersService,
  getOneUserService,
  updateOneUserPropertyService,
  updateOneUserPropertiesService,
  deleteOneUserService,
} from '../services/user.service';

import { success } from '../../../node-mongo-helpers';


export const signUpOneUserController = async (req: Request, res: Response) => {
  const doc = await signUpOneUserService(req.body);
  const token = doc.generateToken();
  const response = {
    success: true,
    data: {
      user: {
        _id: doc._id,
        username: doc.username,
        email: doc.email,
        role: doc.role,
        avatar: doc.avatar,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      token: token
    },
    message: `SUCCESS: User registration successfull`,
  };
  success(response.message);
  return res.status(201).json(response);
}


export const signInOneUserController = async (req: Request, res: Response) => {
  const doc = await signInOneUserService(req.body);
  const token = doc.generateToken();
  const response = {
    success: true,
    data: { token: token },
    message: `SUCCESS: User successfully logged in`,
  };
  success(response.message);
  return res.status(201).json(response);
}


export const getAllUsersController = async (req: Request, res: Response) => {
  const docs = await getAllUsersService();
  const response = {
    success: true,
    data: {
      count: docs.length,
      users: docs.map(doc => {
        return {
          _id: doc._id,
          username: doc.username,
          email: doc.email,
          role: doc.role,
          avatar: doc.avatar,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }
      })
    },
    message: `SUCCESS: All users succesfully retrieved`,
  };
  success(response.message);
  return res.status(200).json(response);
}


export const getOneUserController = async (req: Request, res: Response) => {
  // const doc = await getOneUserService(req.params.userId);
  const doc = await getOneUserService(req.user._id);
  const response = {
    success: true,
    data: {
      user: {
        _id: doc._id,
        username: doc.username,
        email: doc.email,
        role: doc.role,
        avatar: doc.avatar,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      }
    },
    message: `SUCCESS: User succesfully retrieved`,
  };
  success(response.message);
  return res.status(200).json(response);
}


export const updateOneUserPropertyController = async (req: Request, res: Response) => {
  // const doc = await updateOneUserPropertyService(req.params.userId, req.body);
  const doc = await updateOneUserPropertyService(req.user._id, req.body);
  const response = {
    success: true,
    data: {
      user: {
        _id: doc._id,
        username: doc.username,
        email: doc.email,
        role: doc.role,
        avatar: doc.avatar,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      }
    },
    message: `SUCCESS: User property succesfully updated`,
  };
  success(response.message);
  return res.status(200).json(response);
}


export const updateOneUserPropertiesController = async (req: Request, res: Response) => {
  // const doc = await updateOneUserPropertiesService(req.params.userId, req.body);
  const doc = await updateOneUserPropertiesService(req.user._id, req.body);
  const response = {
    success: true,
    data: {
      user: {
        _id: doc._id,
        username: doc.username,
        email: doc.email,
        role: doc.role,
        avatar: doc.avatar,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      }
    },
    message: `SUCCESS: User properties succesfully updated`,
  };
  success(response.message);
  return res.status(200).json(response);
}


export const deleteOneUserController = async (req: Request, res: Response) => {
  await deleteOneUserService(req.params.userId);
  // await deleteOneUserService(req.user._id);
  const response = {
    success: true,
    data: {},
    message: `SUCCESS: User successfully deleted`,
  };
  success(response.message);
  return res.status(201).json(response);
};




/////////////////////////////////////////////////////
import {
  deleteAllUserService,
} from '../services/user.service';

export const deleteAllUserController = async (req: Request, res: Response) => {
  const doc = await deleteAllUserService();
  const response = {
    success: true,
    data: {},
    message: `${doc.deletedCount} user(s) deleted successfully!`,
  };
  success(response.message);
  return res.status(201).json(response);
};
////////////////////////////////////////////////////////