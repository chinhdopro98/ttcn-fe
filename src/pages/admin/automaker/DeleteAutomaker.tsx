import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IAutoMaker } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import { deleteAutomaker } from "../../../redux/action/autoMakerAction";
interface Iprops {
  automaker: IAutoMaker;
}
const DeleteAutomaker: React.FC<Iprops> = (props) => {
  const { automaker } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => setOpen(true);
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    setOpen(false);
    await dispatch(deleteAutomaker(automaker));
  };
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
              Delete Automaker: {automaker.name_automaker} !
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

export default DeleteAutomaker;
