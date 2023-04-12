import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { IUserData } from "../../../interfaces/interface";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../redux/hook/hook";
import { deleteUser } from "../../../redux/action/userAction";
interface Iprops {
  user: IUserData;
}
const DeleteUser: React.FC<Iprops> = (props) => {
  const [open, setOpen] = useState(false);
  const { user } = props;
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    setOpen(false);
    await dispatch(deleteUser(user));
  };
  const handleClick = () => setOpen(true);
  return (
    <>
      <Button
        type="button"
        sx={{
          backgroundColor: "#fb483a",
          lineHeight: "36.5px",
          color: "#000",
          textTransform: "Capitalize",
          height: "36.5px",
          textAlign: "center",
        }}
        onClick={handleClick}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { sm: 400, xs: 340 },
            p: "24px",
            borderRadius: "4px",
            bgcolor: "#ffffff",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}
              gutterBottom
            >
              Are you sure?
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "16px" }}>
              Delete user: {user.username} !
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: " 20px",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                margin: "0 15px",
                backgroundColor: "#Fffff0",
                color: "#000",
                textTransform: "Capitalize",
              }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              sx={{ margin: "0 15px", textTransform: "Capitalize" }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteUser;
