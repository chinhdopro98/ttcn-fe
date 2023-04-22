import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { IUser } from "../interfaces/interface";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../redux/hook/hook";
import { userLogin } from "../redux/action/userAction";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import car from "../assets/image/car/car.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
const HomeLogin = styled.div`
  width: 100%;
  height: 100vh;
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
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const role = useSelector((state: RootState) => state.user.role);
  const handleLogin = async (data: IUser) => {
    dispatch(
      userLogin({
        username: data.username,
        password: data.password,
      })
    );
  };
  useEffect(() => {
    if ((accessToken && role === "owner") || (accessToken && role === "user")) {
      navigate("/app");
    }
    if (accessToken && role === "admin") {
      navigate("/admin");
    }
  }, [accessToken]);
  return (
    <HomeLogin className="home-form" style={styles.bg_img}>
      <BoxForm>
        <h2>Login</h2>
        <form action="" autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
          <Controller
            name="username"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Name"
                  variant="standard"
                  style={{ width: "100%", marginBottom: "25px" }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  required
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <Controller
            name="password"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="standard"
                  style={{ width: "100%", marginBottom: "25px" }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  required
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#f24b50",
              textTransform: "capitalize",
              margin: "0 5px",
            }}
          >
            Login
          </Button>
        </form>
      </BoxForm>
    </HomeLogin>
  );
};
const styles = {
  bg_img: {
    backgroundImage: "url(" + car + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
} as const;
export default Login;
