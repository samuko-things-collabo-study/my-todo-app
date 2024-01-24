import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../models/user.model';
import { UnAuthorizedError } from '../exceptions/errors/UnAuthorizedError';


export const verifyUserWithJWT = async (req: Request, res: Response, next: NextFunction) => {
  // check header if it starts with bearer
  const reqAuthorizationHeader = req.headers.authorization;

  if (!reqAuthorizationHeader || !reqAuthorizationHeader.startsWith("Bearer ")) {
    throw new UnAuthorizedError("User could not be verified because authorization header bearer not found");
  }

  const userToken = reqAuthorizationHeader.split(" ")[1];

  const decoded = jwt.verify(userToken, `${process.env.JWT_SECRET}`);
  const payload = decoded as JwtPayload;
  const { _id, username, role } = payload;

  req.user = { _id: _id, username: username, role: role };

  return next();
}


export const verifyUserRoles = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    const roleIsVerified = allowedRoles.includes(role);

    if (roleIsVerified) {
      return next();
    }

    throw new UnAuthorizedError(`only ${allowedRoles} have access to this route`);

  }
}