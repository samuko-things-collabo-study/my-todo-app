import { Request, Response} from 'express';

import {
  signUpOneUserService,
  signInOneUserService,
  getAllUsersService,
  getOneUserService,
  updateOneUserPropertyService,
  updateOneUserPropertiesService,
  deleteOneUserService,
} from '../services/user.service';

import { success, error } from '../../../node-mongo-helpers';


export const signUpOneUserController = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    const response = {
      success: false,
      error: `${err}`,
      message: `ERROR: User registration not successful`,
    };
    error(response.message);
    res.status(500).json(response);
  }
}


export const signInOneUserController = async (req: Request, res: Response) => {
  try {
    const doc = await signInOneUserService(req.body);
    const token = doc.generateToken();
    const response = {
      success: true,
      data: {token: token},
      message: `SUCCESS: User successfully logged in`,
    };
    success(response.message);
    return res.status(201).json(response);
  } catch (err) {
    const response = {
      success: false,
      error: `${err}`,
      message: `ERROR: User could not be logged in`,
    };
    error(response.message);
    res.status(500).json(response);
  }
}



export const getAllUsersController = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    const response = {
      success: false,
      error: `${err}`,
      message: `ERROR: Error Retrieveing all users`,
    };
    error(response.message);
    res.status(500).json(response);
  }
}


export const getOneUserController = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    const response = {
      success: false,
      error: `${err}`,
      message: `ERROR: Error Retrieveing user`,
    };
    error(response.message);
    res.status(500).json(response);
  }
}


export const updateOneUserPropertyController = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    const response = {
      success: false,
      error: `${err}`,
      message: `ERROR: Error Updating user property`,
    };
    error(response.message);
    res.status(500).json(response);
  }
}


export const updateOneUserPropertiesController = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    const response = {
      success: false,
      error: `${err}`,
      message: `ERROR: Error updating user properties`,
    };
    error(response.message);
    res.status(500).json(response);
  }
}


export const deleteOneUserController = async (req: Request, res: Response) => {
  try {
    // await deleteOneUserService(req.params.userId);
    await deleteOneUserService(req.user._id);
    const response = {
      success: true,
      data: {},
      message: `SUCCESS: User successfully deleted`,
    };
    success(response.message);
    return res.status(201).json(response);
  } catch (err) {
    const response = {
      success: false,
      error: err,
      message: `ERROR: Delete operation not successful`,
    };
    error(response.message);
    return res.status(500).json(response);
  }
};




/////////////////////////////////////////////////////
import {
  deleteAllUserService,
} from '../services/user.service';

export const deleteAllUserController = async (req: Request, res: Response) => {
  try {
    const doc = await deleteAllUserService();
    const response = {
      success: true,
      data: {},
      message: `All ${doc.deletedCount} users deleted successfully!`,
    };
    success(response.message);
    return res.status(201).json(response);
  } catch (err) {
    const response = {
      success: false,
      error: err,
      message: `ERROR: Delete operation not successful`,
    };
    error(response.message);
    return res.status(500).json(response);
  }
};
////////////////////////////////////////////////////////