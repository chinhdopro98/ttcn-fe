import { Blog } from "../../../interfaces/interface";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Avatar from "@mui/material/Avatar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch } from "../../../redux/hook/hook";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { RootState } from "../../../redux/store/store";
import {
  getAllBlogCategory,
  updateBlog,
} from "../../../redux/action/blogAction";
import { useSelector } from "react-redux";
interface Iprops {
  blog: Blog;
}
const Edit: React.FC<Iprops> = (props) => {
  const { blog } = props;
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const blogCategories = useSelector(
    (state: RootState) => state.blog.blogCategorys
  );
  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, [dispatch]);

  const {
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Blog>({});
  const onSubmit = async (data: Blog) => {
    await dispatch(
      updateBlog({
        _id: blog._id,
        title: data.title,
        description: data.description,
        category: data.category,
        image: data.image,
      })
    );
    await setOpen(false);
  };
  useEffect(() => {
    reset({
      title: blog.title,
      description: blog.description,
      category: blog.category,
    });
  }, [blog]);
  const handleClose = () => {
    setOpen(false);
    reset({
      title: blog.title,
      description: blog.description,
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
                src={`http://localhost:5000/${blog.image}`}
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
            sx={{ marginBottom: "20px" }}
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
                defaultValue={blog.title}
              />
              <Controller
                name="description"
                control={control}
                defaultValue={blog.description}
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
              <Controller
                name="category"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Category Blog
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category Blog"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          textAlign: "left",
                        }}
                        {...field}
                      >
                        {blogCategories.map((blogCategory) => (
                          <MenuItem value={blogCategory._id}>
                            {blogCategory?.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
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

export default Edit;
