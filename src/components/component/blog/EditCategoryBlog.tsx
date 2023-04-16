import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { BlogCategory } from "../../../interfaces/interface";
import Avatar from "@mui/material/Avatar";
import { useAppDispatch } from "../../../redux/hook/hook";
import { updateBlogCategory } from "../../../redux/action/blogAction";
interface Iprops {
  blogCategory: BlogCategory;
}
const EditCategoryBlog: React.FC<Iprops> = (props) => {
  const { blogCategory } = props;
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const {
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlogCategory>({});
  const onSubmit = async (data: BlogCategory) => {
    await dispatch(
      updateBlogCategory({
        _id: blogCategory._id,
        title: data.title,
        description: data.description,
        image: data.image,
      })
    );
    await setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
    reset({
      title: blogCategory.title,
      description: blogCategory.description,
    });
  };

  type FileInputProps = {
    control: any;
    name: string;
  };
  function FileInput({ control, name }: FileInputProps) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <input
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.files && event.target.files[0]) {
                  onChange(event.target.files[0]);
                }
              }}
              onBlur={onBlur}
            />
            {value ? (
              <img
                className="image-blog"
                src={URL.createObjectURL(value)}
                alt="Selected Image"
                width={150}
                height={150}
              />
            ) : (
              <img
                className="image-blog"
                src={`http://localhost:5000/${blogCategory.image}`}
                alt="Default Image"
                width={150}
                height={150}
              />
            )}
          </>
        )}
      />
    );
  }
  return (
    <div>
      <Button onClick={handleOpen}>
        <i className="fa-solid fa-pen-to-square"></i>
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
            width: { sm: 600, xs: "90%" },
            p: "24px",
            borderRadius: "4px",
            bgcolor: "#ffffff",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "10px" }}
            fontSize={"20px"}
            lineHeight={"26px"}
          >
            Edit
          </Typography>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                name="title"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Title"
                      style={{ width: "100%", marginBottom: "25px" }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                    />
                  );
                }}
                control={control}
                defaultValue={blogCategory.title}
              />
              <Controller
                name="description"
                control={control}
                defaultValue={blogCategory.description}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    style={{ width: "100%", marginBottom: "25px" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    minRows={4}
                    maxRows={10}
                  />
                )}
              />
              <FileInput control={control} name="image" />
            </Box>
            <Box sx={{ float: "right" }}>
              <Button
                type="button"
                onClick={handleClose}
                variant="contained"
                sx={{
                  backgroundColor: "#FFFFFF",
                  textTransform: "capitalize",
                  color: "#000000",
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
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditCategoryBlog;
