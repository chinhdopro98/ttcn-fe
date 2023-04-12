import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  Category,
  CreateAutoMaker,
  IAutoMaker,
} from "../../../interfaces/interface";
import { Controller, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch } from "../../../redux/hook/hook";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import {
  createAutomaker,
  getAllCategory,
} from "../../../redux/action/autoMakerAction";
const LabelIput = styled.div`
  font-size: 14px;
  color: #000;
  display: flex;
  height: 100%;
  align-items: center;
`;
const CreateAutomaker: React.FC = () => {
  const dispatch = useAppDispatch();
  const categorys = useSelector(
    (state: RootState) => state.automaker.categorys
  );
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAutoMaker>({});
  const handleCreate = async (data: CreateAutoMaker) => {
    await dispatch(
      createAutomaker({
        name_automaker: data.name_automaker,
        id_category: data.id_category,
      })
    );
  };
  return (
    <Box sx={{ width: "700px", paddingLeft: "20px" }}>
      <Typography
        variant="h6"
        mb={1}
        sx={{ fontSize: "18px", textAlign: "left" }}
      >
        ADD AUTOMAKER
      </Typography>
      <form action="" autoComplete="off" onSubmit={handleSubmit(handleCreate)}>
        <Grid container sx={{ marginBottom: { xs: "10px", sm: "10px" } }}>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            sx={{ marginBottom: { xs: "10px", sm: 0 } }}
          >
            <LabelIput>Name *</LabelIput>
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <Controller
              name="name_automaker"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Name"
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
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  ))}
                </Select>
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
    </Box>
  );
};

export default CreateAutomaker;
