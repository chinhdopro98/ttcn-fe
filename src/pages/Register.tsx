import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { IRegister } from "../interfaces/interface";
import styled from "styled-components";
import car from "../assets/image/car/car.jpg";
import { useAppDispatch } from "../redux/hook/hook";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../redux/action/userAction";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { setOpenSnackbar } from "../redux/reducer/userSlice";
const HomeLogin = styled.div`
  width: 100%;
  height: 100vh;
  bacground-image;
`;
const BoxForm = styled.div`
  padding: 20px 20px;
  position: fixed;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
`;
const Register = () => {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({});
  const showError = useSelector((state: RootState) => state.user.error);
  const labelSuccess = useSelector(
    (state: RootState) => state.user.labelSuccess
  );
  const openSnackbar = useSelector(
    (state: RootState) => state.user.openSnackbar
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setOpenSnackbar());
  };
  const navigate = useNavigate();
  if (labelSuccess !== "") {
    navigate("/app");
  }
  const handleRegister = (data: IRegister) => {
    dispatch(
      userRegister({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: "user",
      })
    );
  };

  return (
    <>
      <HomeLogin className="home-form" style={styles.bg_img}>
        <BoxForm>
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit(handleRegister)}>
              <TextField
                fullWidth
                label="First name"
                margin="normal"
                size="small"
                {...register("firstname", { required: true })}
                error={Boolean(errors.firstname)}
                helperText={errors.firstname && "First name is required"}
              />

              <TextField
                fullWidth
                label="Last name"
                margin="normal"
                size="small"
                {...register("lastname", { required: true })}
                error={Boolean(errors.lastname)}
                helperText={errors.lastname && "Last name is required"}
              />

              <TextField
                fullWidth
                label="User name"
                margin="normal"
                size="small"
                {...register("username", { required: true })}
                error={Boolean(errors.username)}
                helperText={errors.username && "User name is required"}
              />

              <TextField
                fullWidth
                label="Email"
                margin="normal"
                size="small"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                error={Boolean(errors.email)}
                helperText={errors.email && "Enter a valid email address"}
              />
              <TextField
                fullWidth
                label="Phone"
                margin="normal"
                type="phone"
                size="small"
                {...register("phone", { required: true })}
                error={Boolean(errors.phone)}
                helperText={errors.phone && "Phone is required"}
              />

              <TextField
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                size="small"
                {...register("password", { required: true })}
                error={Boolean(errors.password)}
                helperText={errors.password && "Password is required"}
              />

              <Button variant="contained" color="primary" type="submit">
                Đăng ký
              </Button>
            </form>
          </Container>
        </BoxForm>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={openSnackbar}
          autoHideDuration={500}
          onClose={handleClose}
        >
          <Box>
            {labelSuccess && (
              <MuiAlert
                onClose={handleClose}
                variant="filled"
                severity="success"
              >
                {labelSuccess}
              </MuiAlert>
            )}
            {showError && (
              <MuiAlert onClose={handleClose} variant="filled" severity="error">
                {showError}
              </MuiAlert>
            )}
          </Box>
        </Snackbar>
      </HomeLogin>
    </>
  );
};
const styles = {
  bg_img: {
    backgroundImage: "url(" + car + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
} as const;
export default Register;
