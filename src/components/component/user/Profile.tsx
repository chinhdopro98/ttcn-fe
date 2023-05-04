import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IUserData } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import { updateProfile } from "../../../redux/action/userAction";
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
  width: "700px",
  padding: "24px",
  borderRadius: "4px",
  bgcolor: "#ffffff",
  height: "500px",
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
  height: "500px",
  zIndex: "999",
};
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>({});
  useEffect(() => {
    reset({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  }, []);
  const handleOpen = async () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    reset({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  };
  const handleUpdate = (data: IUserData) => {
    dispatch(
      updateProfile({
        _id: user._id,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        phone: data.phone,
      })
    );
    setOpen(false);
  };
  return (
    <>
      <Box>
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{
            textTransform: "capitalize",
            width: "100%",
            border: "none",
          }}
        >
          Hồ sơ
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
                  sx={{ fontSize: "22px", textAlign: "center" }}
                >
                  Thông tin cá nhân
                </Typography>
              </Box>
              <form
                action=""
                autoComplete="off"
                onSubmit={handleSubmit(handleUpdate)}
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
                    <LabelIput>First name*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="firstname"
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label="First name"
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
                    <LabelIput>Last name*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="lastname"
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label="Last name"
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
                    <LabelIput>Điện thoại*</LabelIput>
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
                      Hủy
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
                      Lưu
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

export default Profile;
