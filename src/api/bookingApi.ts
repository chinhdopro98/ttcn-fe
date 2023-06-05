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
  statusPayment,
  approve,
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
      statusPayment,
      approve,
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
export const updateStatusBookingApi = async ({
  _id,
  approve,
}: UpdateStatus) => {
  try {
    const response = await instance.post(URL.UPDATE_STATUS, {
      _id,
      approve,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updateStatusApproveApi = async ({
  _id,
  approve,
}: UpdateStatus) => {
  try {
    const response = await instance.post(URL.STATUS_APPROVE, {
      _id,
      approve,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const getAllBookingOwnerApi = async () => {
  try {
    const response = await instance.get(URL.GET_BOOKING_OWNER);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateBookingApi = async ({
  _id,
  bookedTimeSlots,
  totalHours,
  totalMoney,
  driverRequired,
}: IBooking) => {
  try {
    const response = await instance.post(`${URL.UPDATE_BOOKING}`, {
      _id,
      bookedTimeSlots,
      totalHours,
      totalMoney,
      driverRequired,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const deleteBookingApi = async (_id: string) => {
  try {
    const response = await instance.post(URL.DELETE_BOOKING, {
      _id: _id,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const chartApi = async () => {
  try {
    const response = await instance.get(URL.CHART_BOOKING);
    return response;
  } catch (err) {
    console.log(err);
  }
};
