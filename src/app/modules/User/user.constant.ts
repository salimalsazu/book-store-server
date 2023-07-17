export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  user: {
    name?: string;
    email?: string;
  };
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IMyProfile = {
  password?: string;
  name: string;
  email: string;
};
