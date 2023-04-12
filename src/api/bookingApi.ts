import instance from "./axios";
import { URL } from "../constains/url";
import { IBooking, UpdateStatus } from "../interfaces/interface";
import { stat } from "fs";
export const newBookingCarApi = async ({
  token,
  userid,
  carid,
  totalHours,
  totalMoney,
  driverRequired,
  bookedTimeSlots,
}: IBooking) => {
  try {
    const response = await instance.post(URL.BOOKING, {
      token,
      userid,
      carid,
      totalHours,
      totalMoney,
      driverRequired,
      bookedTimeSlots,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllBooking = async () => {
  try {
    const response = await instance.get(URL.LISTBOOKINGS);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const createBookingApi = async ({
  userid,
  carid,
  totalHours,
  totalMoney,
  driverRequired,
  bookedTimeSlots,
  statusPayment,
  approve,
}: IBooking) => {
  try {
    const response = await instance.post(URL.CREATE_BOOKING, {
      userid,
      carid,
      totalHours,
      totalMoney,
      driverRequired,
      bookedTimeSlots,
      statusPayment,
      approve,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const updateStatusBookingApi = async ({ _id, status }: UpdateStatus) => {
  try {
    const response = await instance.post(URL.UPDATE_STATUS, {
      _id,
      status,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
