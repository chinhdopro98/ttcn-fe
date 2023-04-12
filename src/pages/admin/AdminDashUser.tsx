import React from "react";
import AdminUser from "./user/AdminUser";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useAppDispatch } from "../../redux/hook/hook";
import { closeSnackBar } from "../../redux/reducer/carSlice";
import Typography from "@mui/material/Typography";
import AddUser from "./user/AddUser";
const AdminDashUser = () => {
  const labelSuccess = useSelector(
    (state: RootState) => state.user.labelSuccess
  );
  const labelError = useSelector((state: RootState) => state.user.error);
  const openSnackbar = useSelector(
    (state: RootState) => state.user.openSnackbar
  );
  const dispatch = useAppDispatch();
  const handleCloseSnackBar = () => {
    dispatch(closeSnackBar());
  };
  return (
    <div>
      <Typography
        variant="h2"
        mb={1}
        p={2}
        sx={{ fontSize: "25px", textAlign: "center" }}
      >
        Manager User
      </Typography>
      <AddUser />
      <AdminUser />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        autoHideDuration={1000}
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
    </div>
  );
};

export default AdminDashUser;
