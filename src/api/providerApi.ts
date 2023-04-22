import instance from "./axios";
import { URL } from "../constains/url";
export const getAllProviderApi = async () => {
  try {
    const response = await instance.get(`${URL.GET_ALL_PROVIDER}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
