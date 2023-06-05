import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { RootState } from "../../../redux/store/store";
import { useAppDispatch } from "../../../redux/hook/hook";
import { AddCar } from "../../../interfaces/interface";
import { getAllProvider } from "../../../redux/action/providerAction";
import { createCarFormdata } from "../../../redux/action/carAction";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "70vw",
  width: "1350px",
  padding: "24px 40px",
  borderRadius: "4px",
  bgcolor: "#ffffff",
  height: "90%",
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  padding: "20px",
  borderRadius: "10px",
  bgcolor: "#ffffff",
  height: "430px",
  zIndex: "999",
};
const GroupInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const CreateCarAdmin = () => {
  const providers = useSelector((state: RootState) => state.provider.providers);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  useEffect(() => {
    dispatch(getAllProvider());
  }, []);
  const handleOpen = async () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCar>({});
  type FileInputProps = {
    control: any;
    name: string;
  };
  const createCar = async (data: AddCar) => {
    const newcar: AddCar = {
      name: data.name,
      image: data.image,
      capacity: +data.capacity,
      fuelType: data.fuelType,
      yearCreated: +data.yearCreated,
      autoMarket: data.autoMarket,
      price: +data.price,
      status: data.status,
      // numbereatSeats: +data.numbereatSeats,
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
    await setOpen(false);
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
    <Box>
      <Button
        className="dashbord-header-btn"
        variant="contained"
        onClick={handleOpen}
      >
        <i className="fa-solid fa-plus"></i>
        <span>New</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ height: "95%", overflowY: "scroll", paddingTop: "55px" }}>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                padding: "10px 25px",
                backgroundColor: "#fff",
                left: 0,
                width: "100%",
                zIndex: "999",
                boxShadow:
                  " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;",
              }}
            >
              <Typography
                variant="h6"
                mb={1}
                sx={{ fontSize: "18px", textAlign: "left" }}
              >
                THÊM XE MỚI
              </Typography>
            </Box>
            <form
              action=""
              autoComplete="off"
              onSubmit={handleSubmit(createCar)}
            >
              <GroupInput>
                <Controller
                  name="name"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Tên xe"
                        required
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Nhiên liệu
                  </InputLabel>
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
                        style={{ width: "100%", marginRight: "70px" }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        required
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tình trạng
                  </InputLabel>
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
                  name="colorOutSide"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Màu ngoại thất"
                        style={{ width: "100%", marginRight: "70px" }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        required
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />

                <Controller
                  name="colorInSide"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Màu nội thất"
                        style={{ width: "100%" }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        required
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
              </GroupInput>
              <GroupInput>
                <Controller
                  name="consumeFuel"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Mức tiêu thụ"
                        style={{ width: "100%", marginRight: "70px" }}
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
                        style={{ width: "100%", marginRight: "70px" }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        required
                      />
                    );
                  }}
                  control={control}
                  defaultValue={null}
                />{" "}
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
                          <MenuItem value={provider._id}>
                            {provider?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </GroupInput>
              <GroupInput>
                <Controller
                  name="address"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Địa chỉ"
                        style={{ width: "100%" }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        required
                      />
                    );
                  }}
                  control={control}
                  defaultValue={""}
                />
              </GroupInput>
              <GroupInput>
                <Controller
                  name="note"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Note"
                        multiline
                        rows={3}
                        maxRows={3}
                        style={{ width: "100%" }}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        required
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
              </GroupInput>
              <FileInput control={control} name="image" />
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
              >
                <Box sx={{ float: "right" }}>
                  <Button
                    type="button"
                    onClick={handleClose}
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      textTransform: "capitalize",
                      color: "#000000",
                      marginRight: "15px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#f24b50",
                      textTransform: "capitalize",
                      margin: "0 5px",
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateCarAdmin;
