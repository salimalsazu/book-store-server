import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import {
  ILoginUser,
  ILoginUserResponse,
  IMyProfile,
  IRefreshTokenResponse,
} from "./user.constant";
import { IUser } from "./user.interface";
import { User } from "./user.modal";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const createUserService = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);


  return result;
};

const loginService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const { _id, email: userEmail } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userEmail, _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userEmail, _id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  const userInfo = {
    _id: isUserExist._id,
    email: isUserExist.email,
    name: isUserExist.name,
  };

  return {
    accessToken,
    refreshToken,
    user: userInfo,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userEmail } = verifiedToken;

  console.log(verifiedToken);

  const isUserExist = await User.isUserExist(userEmail);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      name: isUserExist.name,
      _id: isUserExist._id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const myProfileService = async (
  userData: JwtPayload
): Promise<IMyProfile | null> => {
  const result = await User.findOne(
    { _id: userData._id },
    {
      name: 1,
      email: 1,
    }
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not Found !!");
  }

  return result;
};

export const UserService = {
  createUserService,
  loginService,
  refreshToken,
  myProfileService,
};
