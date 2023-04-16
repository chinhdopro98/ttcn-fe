import React, { useState } from "react";
import { Blog } from "../../../interfaces/interface";
import Typography from "@mui/material/Typography";
import BalanceIcon from "@mui/icons-material/Balance";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../redux/hook/hook";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteBlog } from "../../../redux/action/blogAction";
interface Iprops {
  blog: Blog;
}
const Delete: React.FC<Iprops> = (props) => {
  const { blog } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => setOpen(true);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteBlog(blog._id));
    setOpen(false);
  };
  return (
    <>
      <MenuItem sx={{ padding: "0", width: "120px" }}>
        <Button
          type="button"
          sx={{
            padding: "0 0 0 40px",
            lineHeight: "40px",
            width: "100%",
            display: "block",
            justifyContent: "left",
            textTransform: "Capitalize",
            height: "40px",
            textAlign: "left",
          }}
          onClick={handleClick}
        >
          {" "}
          <i className="fa-sharp fa-solid fa-trash"></i>
        </Button>
      </MenuItem>
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
            <DeleteForeverIcon sx={{ color: "#fb483a", fontSize: "80px" }} />
            <Typography
              variant="h4"
              sx={{ fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}
              gutterBottom
            >
              Are you sure?
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "16px" }}>
              Delete Blog : {blog.title} !
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

export default Delete;
