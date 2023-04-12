import instance from "./axios";
import { URL } from "../constains/url";
import { CreateAutoMaker, IAutoMaker } from "../interfaces/interface";

export const getAllAutoMakerApi = async () => {
  try {
    const response = await instance.get(URL.ALL_AUTOMAKER);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllCategorysApi = async () => {
  try {
    const response = await instance.get(URL.ALL_CATEGORY);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const updateAutomakerApi = async ({
  name_automaker,
  id_category,
  _id,
}: IAutoMaker) => {
  try {
    const response = await instance.post(URL.UPDATE_AUTOMAKER, {
      name_automaker,
      id_category,
      _id,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const deleteAutomakerApi = async (data: IAutoMaker) => {
  try {
    const response = await instance.post(URL.DELETE_AUTOMAKER, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const createAutomakerApi = async ({
  name_automaker,
  id_category,
}: CreateAutoMaker) => {
  try {
    const response = await instance.post(URL.CREATE_AUTOMAKER, {
      name_automaker,
      id_category,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
