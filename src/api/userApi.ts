import instance from "./axios";
import { URL } from "../constains/url";
import { IRegister, IUser, IUserData } from "../interfaces/interface";

export const loginApi = async ({ username, password }: IUser) => {
  try {
    const response = await instance.post(URL.LOGIN, {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const registerApi = async ({
  firstname,
  lastname,
  username,
  password,
  email,
  phone,
  role,
}: IRegister) => {
  try {
    const response = await instance.post(URL.REGISTER, {
      firstname,
      lastname,
      username,
      password,
      email,
      phone,
      role,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getAllUserApi = async () => {
  try {
    const response = await instance.get(URL.ALL_USER);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateUserApi = async ({
  firstname,
  lastname,
  username,
  password,
  email,
  phone,
  role,
  _id,
}: IUserData) => {
  try {
    const response = await instance.post(URL.UPDATE_USER, {
      firstname,
      lastname,
      username,
      password,
      email,
      phone,
      role,
      _id,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const deleteUserApi = async (data: IUserData) => {
  try {
    const response = await instance.post(URL.DELETE_USER, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
