import {Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { error } from '../../../node-mongo-helpers';
import { UserRole } from '../models/user.model';


export const verifyUserWithJWT = async (req: Request, res: Response, next:NextFunction) => {
  // check header if it starts with bearer
  const reqAuthorizationHeader = req.headers.authorization;

  if(!reqAuthorizationHeader || !reqAuthorizationHeader.startsWith("Bearer ")) {
    throw new Error ("User could not be verified because authorization header bearer not found");
  }

  const userToken = reqAuthorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(userToken, `${process.env.JWT_SECRET}`);
    const payload = decoded as JwtPayload;
    const {_id, username, role} = payload;

    req.user = {_id: _id, username: username, role: role};

    return next();

  } catch (err) {
    error(`AUTHORIZATION ERROR: ${err}`);
    res.status(500).json({
      message: 'AUTHORIZATION ERROR',
      error: `${err}`,
    });
  }
}



export const verifyUserRoles = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next:NextFunction) => {
    try {
      const {role} = req.user;

      const roleIsVerified = allowedRoles.includes(role);  
   
      if (roleIsVerified){
        return next();
      }
      
      throw new Error (`only ${allowedRoles} have access to this route`);
      
    } catch (err) {
      error(`AUTHORIZATION ERROR: ${err}`);
      res.status(500).json({
        message: 'AUTHORIZATION ERROR',
        error: `${err}`,
      });
    }
      
  }
}