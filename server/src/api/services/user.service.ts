import { UserDocument, UserModel as User } from '../models/user.model';

const selectString = '_id username email password role avatar createdAt updatedAt';

type SignInDocument = Pick<UserDocument, "email" | "password">




export const signUpOneUserService = async (requestBody: UserDocument): Promise<UserDocument> => {
  const user = new User({
    username: requestBody.username,
    email: requestBody.email,
    password: requestBody.password,
    avatar: requestBody.avatar,
  });
  const save = await user.save();
  return save;
};

export const signInOneUserService = async (requestBody: SignInDocument) => {
  const {email, password} = requestBody;
  // check if email and password was provided
  if (!email && !password){
    throw new Error("Please provide email and password");
  }
  // check if the user is registered in the database
  const user = await User.findOne({email});
  if(!user){
    throw new Error("invalid email or password");
  }
  // check if correct password was provided
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect) {
    throw new Error("invalid email or password");
  }
  return user;
};

export const getAllUsersService = async () => {
  const query = await User.find().select(selectString).exec();
  return query;
};

export const getOneUserService = async (paramsId: string) => {
  const query = await User.findById(paramsId).select(selectString).exec();
  if(!query){
    throw new Error('No record found for provided ID');
  }
  return query;
};

export const updateOneUserPropertyService = async (paramsId: string, requestBody: { propName: string, value: string }[]) => {
  const query = await User.findById(paramsId).select(selectString).exec();
  if(!query){
    throw new Error('No record found for provided ID');
  }

  for (const ops of requestBody) {
    if(!(ops.propName in query)){
      throw new Error(`invalid property: ${ops.propName}`);
    }
    query[ops.propName as keyof UserDocument] = ops.value as never;
  }

  const updatedQuery = await query.save();
  return updatedQuery;
};


export const updateOneUserPropertiesService = async (paramsId: string, requestBody: UserDocument) => {
  const query = await User.findById(paramsId).select(selectString).exec();
  if(!query){
    throw new Error('No record found for provided ID');
  }

  query.username = requestBody.username;
  query.email = requestBody.email;
  query.password = requestBody.password;
  query.avatar = requestBody.avatar;

  const updatedQuery = await query.save();
  return updatedQuery;
};


export const deleteOneUserService = async (paramsId: string) => {
  const query = await User.findOneAndDelete({ _id: paramsId }).exec();
  if(!query){
    throw new Error('No record found for provided ID');
  }
  return query;
};


////////////////////////////////////////////////////////////
export const deleteAllUserService = async () => {
  const query = await User.deleteMany().exec();
  return query;
}
////////////////////////////////////////////////////////////