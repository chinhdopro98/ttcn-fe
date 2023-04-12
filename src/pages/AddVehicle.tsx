import React, { useEffect } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../redux/hook/hook";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../redux/action/userAction";
import { AddCar, IRegister } from "../interfaces/interface";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { getAllAutoMaker } from "../redux/action/autoMakerAction";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import { createCar } from "../redux/action/carAction";
const HomeLogin = styled.div`
  width: 100% !importand;
  height: 100vh;
  bacground-image;
`;
const LabelIput = styled.div`
  font-size: 15px;
  color: #000;
  display: flex;
  height: 100%;
  align-items: center;
`;
const AddVehicle = () => {
  const dispatch = useAppDispatch();
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
  useEffect(() => {
    dispatch(getAllAutoMaker());
  }, [dispatch]);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCar>({});
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
      numbereatSeats: +data.numbereatSeats,
      origin: data.origin,
      colorOutSide: data.colorOutSide,
      colorInSide: data.colorInSide,
      consumeFuel: data.consumeFuel,
      doorNumber: +data.doorNumber,
      popular: data.popular,
      gear: +data.gear,
      note: data.note,
    };
    await dispatch(createCar(newcar));
  };
  return (
    <div>
      <HomeLogin>
        <form
          action=""
          autoComplete="off"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Project Name*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="name"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Name Car"
                      style={{ width: "100%", marginBottom: "10px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Capacity Car*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="capacity"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Capacity Car"
                      type="number"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue={0}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Fuel Type*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="fuelType"
                defaultValue={0}
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="level-label"
                    {...field}
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value={0}>Petrol</MenuItem>
                    <MenuItem value={1}>Oil</MenuItem>
                    <MenuItem value={1}>Electricity</MenuItem>
                  </Select>
                )}
              />
            </Grid>
            {/* <FormHelperText error={true}>
              {errors.level?.message}
            </FormHelperText> */}
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Create Year*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="yearCreated"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Create Year"
                      type="number"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue={2023}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Auto Market*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="autoMarket"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="level-label"
                    label="Choose a auto maker..."
                    style={{
                      width: "100%",
                      marginBottom: "10px",
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
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Price*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="price"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Price"
                      type="number"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue={0}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Origin Country*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="origin"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Origin Country"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Status Car*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="status"
                defaultValue={0}
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="level-label"
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      textAlign: "left",
                    }}
                    {...field}
                  >
                    <MenuItem value={0}>New</MenuItem>
                    <MenuItem value={1}>Old</MenuItem>
                  </Select>
                )}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Color Outsite*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="colorOutSide"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Color Outside"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Color Insite*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="colorInSide"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Color Inside"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Consume Fuel*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="consumeFuel"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Consume Fuel"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Door Number*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="doorNumber"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Door Number"
                      type="number"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue={0}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Image*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="image"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Image"
                      type="string"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue={""}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Gear Number*</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="gear"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Gear"
                      type="number"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue={0}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Note</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
                name="note"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Note"
                      multiline
                      rows={3}
                      maxRows={4}
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                      required
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ marginBottom: { xs: "10px", sm: 0 } }}
            >
              <LabelIput>Is Popular</LabelIput>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Controller
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
              />
            </Grid>
          </Grid>
          <Box>
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
        </form>
      </HomeLogin>
    </div>
  );
};

export default AddVehicle;
