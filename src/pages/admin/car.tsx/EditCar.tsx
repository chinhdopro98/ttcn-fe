import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AddCar, UpdateCar, Icar } from "../../../interfaces/interface";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { getAllAutoMaker } from "../../../redux/action/autoMakerAction";
import { useAppDispatch } from "../../../redux/hook/hook";
import Typography from "@mui/material/Typography";
import { RootState } from "../../../redux/store/store";
import { editCar } from "../../../redux/action/carAction";
const LabelIput = styled.div`
  font-size: 14px;
  color: #000;
  display: flex;
  height: 100%;
  align-items: center;
`;
interface Iprops {
  car: Icar;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "70vw",
  width: "1350px",
  padding: "24px",
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
const EditCar: React.FC<Iprops> = (props) => {
  const dispatch = useAppDispatch();
  const { car } = props;
  const [open, setOpen] = useState(false);
  const automakers = useSelector(
    (state: RootState) => state.automaker.automakers
  );
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

  useEffect(() => {
    reset({
      name: car.name,
      image: car.image,
      capacity: +car.capacity,
      fuelType: car.fuelType,
      yearCreated: +car.yearCreated,
      autoMarket: car.autoMarket,
      price: +car.price,
      status: car.status,
      numbereatSeats: +car.numbereatSeats,
      origin: car.origin,
      colorOutSide: car.colorOutSide,
      colorInSide: car.colorInSide,
      consumeFuel: car.consumeFuel,
      doorNumber: +car.doorNumber,
      popular: car.popular,
      gear: +car.gear,
      note: car.note,
    });
  }, [car]);
  const handleUpdate = async (data: UpdateCar) => {
    setOpen(false);
    const newcar: UpdateCar = {
      _id: car._id,
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
    await dispatch(editCar(newcar));
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          textTransform: "capitalize",
          marginBottom: "10px",
        }}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{ height: "430px", overflowY: "scroll", paddingTop: "55px" }}
          >
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
                Edit: {car?.name}
              </Typography>
            </Box>
            <form
              action=""
              autoComplete="off"
              onSubmit={handleSubmit(handleUpdate)}
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
                          rows={4}
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

export default EditCar;
