import React, { useEffect, useState } from "react";
import { getCar } from "../redux/action/carAction";
import { useAppDispatch } from "../redux/hook/hook";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { Await, Link } from "react-router-dom";
import { DatePicker } from "antd";
import Button from "@mui/material/Button";
import { Icar } from "../interfaces/interface";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import moment from "moment";
import car from "../assets/image/car/bg-home.jpg";
import Navigation from "../components/component/Navigation";
import { LIMIT } from "../constains/url";
import SelectSort from "../components/component/SelectSort";
import { TextField } from "@mui/material";
import CarouselImage from "../components/component/CarouselImage";
import Awards from "./home/awards/Award";
import Award from "./home/awards/Award";
import Model from "./home/models/Model";
import CarItem from "./home/cars/CarItem";
import Heading from "./common/Heading";
const Home: React.FC = () => {
  const { RangePicker } = DatePicker;
  const cars = useSelector((state: RootState) => state.car.cars);
  const total = useSelector((state: RootState) => state.car.total);
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [page, setPage] = React.useState(1);
  const [option, setOption] = React.useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getCar({
        page: page,
        limit: LIMIT,
        sort: option,
        search: value,
      })
    );
  }, [page, dispatch, option, value]);
  return (
    <Box>
      <Box>
        <Box style={styles.bg_img}>
          <Typography
            variant="h1"
            mb={1}
            sx={{
              fontSize: "2.25rem",
              textAlign: "center",
              lineHeight: "50px",
              fontWeight: 700,
              color: "#4b4d52",
            }}
          >
            AUTO-MOTIVE: CÙNG BẠN TRÊN MỌI HÀNH TRÌNH
          </Typography>
        </Box>
      </Box>
      <Box>
        <CarouselImage />
      </Box>
      <Box>
        <section className="recent padding">
          <div className="container">
            <Heading
              title="Recent Property Listed"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                mb={1}
                sx={{ fontSize: "16px", textAlign: "left" }}
              >
                Total:{total}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <TextField
                  label="Enter text"
                  value={value}
                  onChange={handleChange}
                />
                <SelectSort
                  option={option}
                  setOption={setOption}
                  page={page}
                  setPage={setPage}
                />
              </Box>
            </Box>
            <Box className="content grid3 mtop">
              {cars.map((car: Icar) => {
                return <CarItem car={car} />;
              })}
            </Box>
          </div>
        </section>
      </Box>

      <Navigation page={page} setPage={setPage} total={total} />
      <Award />
      <Model />
    </Box>
  );
};
const styles = {
  bg_img: {
    backgroundImage: "url(" + car + ")",
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    position: "relative",
    height: "400px",
    padding: "6rem 0 8rem",
  },
} as const;
export default Home;