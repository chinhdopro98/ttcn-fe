import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Back from "../common/Back";
import img from "../../assets/image/car/bg-mioto.jpg";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hook/hook";
import { RootState } from "../../redux/store/store";
import { AddCar } from "../../interfaces/interface";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { getAllAutoMaker } from "../../redux/action/autoMakerAction";
import { getAllProvider } from "../../redux/action/providerAction";
import { createCarFormdata } from "../../redux/action/carAction";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { closeSnackBar } from "../../redux/reducer/carSlice";
const LabelIput = styled.div`
  font-size: 14px;
  color: #000;
  display: flex;
  height: 100%;
  align-items: center;
`;
const GroupInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const CarOwner = () => {
  const dispatch = useAppDispatch();
  const labelSuccess = useSelector(
    (state: RootState) => state.car.labelSuccess
  );
  const labelError = useSelector((state: RootState) => state.car.error);
  const openSnackbar = useSelector(
    (state: RootState) => state.car.openSnackbar
  );
  const handleCloseSnackBar = () => {
    dispatch(closeSnackBar());
  };
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCar>({});
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  const providers = useSelector((state: RootState) => state.provider.providers);
  useEffect(() => {
    dispatch(getAllAutoMaker());
    dispatch(getAllProvider());
  }, [dispatch]);
  const handleRegister = async (data: AddCar) => {
    const newcar: AddCar = {
      name: data.name,
      image: data.image,
      capacity: +data.capacity,
      fuelType: data.fuelType,
      yearCreated: +data.yearCreated,
      autoMarket: data.autoMarket,
      price: +data.price,
      status: data.status,
      origin: data.origin,
      colorOutSide: data.colorOutSide,
      colorInSide: data.colorInSide,
      consumeFuel: data.consumeFuel,
      doorNumber: +data.doorNumber,
      popular: data.popular,
      gear: +data.gear,
      note: data.note,
      provider: data.provider,
      address: data.address,
    };
    await dispatch(createCarFormdata(newcar));
    await reset({
      name: "",
      image: "",
      capacity: 0,
      fuelType: 0,
      yearCreated: 0,
      autoMarket: "",
      price: 0,
      status: 0,
      origin: "",
      colorOutSide: "",
      colorInSide: "",
      consumeFuel: "",
      doorNumber: 0,
      gear: 0,
      note: "",
      provider: "",
      address: "",
    });
  };
  type FileInputProps = {
    control: any;
    name: string;
  };
  function FileInput({ control, name }: FileInputProps) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <input
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.files && event.target.files[0]) {
                  onChange(event.target.files[0]);
                }
              }}
              onBlur={onBlur}
            />
            {value ? (
              <img
                className="image-blog"
                src={URL.createObjectURL(value)}
                alt="Selected Image"
                width={150}
                height={150}
              />
            ) : null}
          </>
        )}
      />
    );
  }
  return (
    <section className="contacts mb">
      <Back
        name="Đăng ký cùng chúng tôi"
        title="Cho thuê xe trên Auto-Movie để gia tăng thu nhập đến 10tr/tháng !"
        cover={img}
      />

      <Box
        className="container"
        sx={{
          marginTop: "40px",
          marginBottom: "40px",
          padding: "40px 30px",
          boxShadow: "0 0 20px 0 rgb(112 121 138 / 18%)",
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: "24px",
              color: "#00a550",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            ĐĂNG KÝ XE CHO THUÊ
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", marginBottom: "30px" }}
          >
            Bạn vui lòng điền đầy đủ thông tin, Auto-Movie sẽ liên hệ với bạn
            trong vòng 1 ngày làm việc.
          </Typography>
        </Box>
        <form
          action=""
          autoComplete="off"
          onSubmit={handleSubmit(handleRegister)}
        >
          <GroupInput>
            <Controller
              name="name"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Tên xe"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                );
              }}
              control={control}
              defaultValue=""
            />

            <Controller
              name="capacity"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Dung tích"
                    type="number"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue={null}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Nhiên liệu</InputLabel>
              <Controller
                name="fuelType"
                defaultValue={null}
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Fuel Type"
                    {...field}
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value={1}>Xăng</MenuItem>
                    <MenuItem value={2}>Dầu</MenuItem>
                    <MenuItem value={3}>Điện</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </GroupInput>
          <GroupInput>
            <Controller
              name="yearCreated"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Năm sản xuất"
                    type="number"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue={null}
            />
            <Controller
              name="price"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Giá"
                    type="number"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue={null}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Dòng xe</InputLabel>
              <Controller
                name="autoMarket"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Dòng xe"
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    {...field}
                  >
                    {automakers.map((automaker) => (
                      <MenuItem value={automaker._id}>
                        {automaker?.name_automaker}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </GroupInput>
          <GroupInput>
            <Controller
              name="origin"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Nước sản xuất"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue=""
            />
            <Controller
              name="colorOutSide"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Màu ngoại thất"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue=""
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tình trạng</InputLabel>
              <Controller
                name="status"
                defaultValue={null}
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tình trạng"
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    {...field}
                  >
                    <MenuItem value={0}>Mới</MenuItem>
                    <MenuItem value={1}>Cũ</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </GroupInput>
          <GroupInput>
            <Controller
              name="colorInSide"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Màu nội thất"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue=""
            />

            <Controller
              name="consumeFuel"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Mức tiêu thụ"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue=""
            />

            <Controller
              name="doorNumber"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Số cửa"
                    type="number"
                    style={{ width: "100%" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue={null}
            />
          </GroupInput>
          <GroupInput>
            <Controller
              name="gear"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Số ghế"
                    type="number"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue={null}
            />
            <Controller
              name="address"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Địa chỉ"
                    style={{ width: "100%", marginRight: "60px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    required
                  />
                );
              }}
              control={control}
              defaultValue={""}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tỉnh - Thành phố
              </InputLabel>
              <Controller
                name="provider"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="level-label"
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    {...field}
                  >
                    {providers.map((provider) => (
                      <MenuItem value={provider._id}>{provider?.name}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </GroupInput>
          <Controller
            name="note"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Ghi chú"
                  multiline
                  rows={4}
                  maxRows={4}
                  style={{ width: "100%", marginBottom: 20 }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  required
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <FileInput control={control} name="image" />

          {/* <Controller
            name="popular"
            control={control}
            render={({ field: props }) => (
              <Checkbox
                sx={{ display: "flex", justifyContent: "left" }}
                {...props}
                checked={props.value}
                onChange={(e) => props.onChange(e.target.checked)}
              />
            )}
          /> */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "30px",
              borderRadius: "5px",
              padding: "12px 30px",
              background: "#27ae60",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Lưu
          </Button>
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              padding: "10px 25px",
              backgroundColor: "#fff",
              left: 0,
              width: "100%",
              zIndex: "999",
              boxShadow:
                " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;",
            }}
          ></Box>
        </form>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <Box>
          {labelSuccess && (
            <MuiAlert
              onClose={handleCloseSnackBar}
              variant="filled"
              severity="success"
            >
              {labelSuccess}
            </MuiAlert>
          )}
          {labelError && (
            <MuiAlert
              onClose={handleCloseSnackBar}
              variant="filled"
              severity="error"
            >
              {labelError}
            </MuiAlert>
          )}
        </Box>
      </Snackbar>
    </section>
  );
};

export default CarOwner;
