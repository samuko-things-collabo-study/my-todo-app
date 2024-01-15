import mongoose from 'mongoose';

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface UserDocument extends mongoose.Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const collectionName = 'user';

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email",
    ]},
  password: { type: String, required: true },
  role: { type: UserRole, default: UserRole.User},
  avatar: { type: String },
},
{
  timestamps: true,
});

const UserModel = mongoose.model<UserDocument>(collectionName, UserSchema); 
export { UserModel };
