import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Category, IAutoMaker } from "../../../interfaces/interface";
import { Controller, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch } from "../../../redux/hook/hook";
import { updateAutomaker } from "../../../redux/action/autoMakerAction";
interface Iprops {
  automaker: IAutoMaker;
  categorys: Category[];
}
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
  height: "50%",
};

const EditAutomaker: React.FC<Iprops> = (props) => {
  const { automaker, categorys } = props;
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
  } = useForm<IAutoMaker>({});

  useEffect(() => {
    reset({
      name_automaker: automaker.name_automaker,
      id_category: automaker.id_category,
    });
  }, [automaker]);
  const dispatch = useAppDispatch();
  const handleUpdate = async (data: IAutoMaker) => {
    setOpen(false);
    await dispatch(
      updateAutomaker({
        _id: automaker._id,
        name_automaker: data.name_automaker,
        id_category: data.id_category,
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
          Edit
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ height: "250px", paddingTop: "55px" }}>
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
                  Edit AutoMaker: {automaker?.name_automaker}
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
                    <LabelIput>Name AutoMaker*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="name_automaker"
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            label="Full Nmae"
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
                    <LabelIput>Category*</LabelIput>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <Controller
                      name="id_category"
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
                          {categorys.map((category) => (
                            <MenuItem value={category._id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
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
    </>
  );
};

export default EditAutomaker;
