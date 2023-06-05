import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IRegister, IUserData } from "../../../interfaces/interface";
import { Controller, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch } from "../../../redux/hook/hook";
import { userRegister } from "../../../redux/action/userAction";
const LabelIput = styled.div`
  font-size: 14px;
  color: #000;
  display: flex;
  height: 100%;
  align-items: center;
`;

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
  height: "96%",
  zIndex: "999",
};
const AddUser = () => {
  const [open, setOpen] = useState(false);

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
  } = useForm<IRegister>({});
  const dispatch = useAppDispatch();
  const handleRegister = async (data: IRegister) => {
    setOpen(false);
    await dispatch(
      userRegister({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        role: data.role === 0 ? "admin" : data.role === 1 ? "owner" : "user",
      })
    );
  };
  return (
    <>
      <Box>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            textTransform: "capitalize",
            marginBottom: "10px",
          }}
        >
          New
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{ height: "96%", overflowY: "scroll", paddingTop: "55px" }}
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
                  TẠO MỚI NGƯỜI DÙNG
                </Typography>
              </Box>
              <form
                action=""
                autoComplete="off"
                onSubmit={handleSubmit(handleRegister)}
              >
                <Grid
                  container
                  sx={{ marginBottom: { xs: "10px", sm: "10px" } }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    sx={{ marginBottom: { xs: "10px", sm: 0 } }}
                  >
                    <LabelIput>First Name*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="firstname"
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label="First Name"
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
                <Grid
                  container
                  sx={{ marginBottom: { xs: "10px", sm: "10px" } }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    sx={{ marginBottom: { xs: "10px", sm: 0 } }}
                  >
                    <LabelIput>Last Name*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="lastname"
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label="Last Name"
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
                <Grid
                  container
                  sx={{ marginBottom: { xs: "10px", sm: "10px" } }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    sx={{ marginBottom: { xs: "10px", sm: 0 } }}
                  >
                    <LabelIput>User Name*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="username"
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label="User Name"
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
                <Grid
                  container
                  sx={{ marginBottom: { xs: "10px", sm: "10px" } }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    sx={{ marginBottom: { xs: "10px", sm: 0 } }}
                  >
                    <LabelIput>Password*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="password"
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            type="password"
                            label="Password"
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
                <Grid
                  container
                  sx={{ marginBottom: { xs: "10px", sm: "10px" } }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    sx={{ marginBottom: { xs: "10px", sm: 0 } }}
                  >
                    <LabelIput>Email*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="email"
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label="Email"
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
                <Grid
                  container
                  sx={{ marginBottom: { xs: "10px", sm: "10px" } }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    sx={{ marginBottom: { xs: "10px", sm: 0 } }}
                  >
                    <LabelIput>Phone*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="phone"
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label="Phone"
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
                <Grid
                  container
                  sx={{ marginBottom: { xs: "10px", sm: "10px" } }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    sx={{ marginBottom: { xs: "10px", sm: 0 } }}
                  >
                    <LabelIput>Role*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="role"
                      defaultValue={"user"}
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
                          <MenuItem value={0}>Admin</MenuItem>
                          <MenuItem value={1}>OWNER</MenuItem>
                          <MenuItem value={2}>USER</MenuItem>
                        </Select>
                      )}
                    />
                  </Grid>
                  {/* <FormHelperText error={true}>
            {errors.level?.message}
            </FormHelperText> */}
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
    </>
  );
};

export default AddUser;
