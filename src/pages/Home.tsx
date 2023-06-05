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
import car from "../assets/image/car/bg-car.png";
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
          <div className="container-listcar">
            <Heading
              title="Danh sách xe cho thuê"
              subtitle="Là công ty hoạt động nhiều năm trong lĩnh vực thuê xe, Công ty X cam kết gửi đến quý khách hàng những dịch vụ tuyệt vời nhất, uy tín nhất, chất lượng nhất"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="h6"
                mb={1}
                sx={{ fontSize: "16px", textAlign: "left" }}
              >
                Tổng số:{total}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <TextField
                  label="Tìm kiếm"
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
              {cars.length > 0
                ? cars.map((car: Icar) => {
                    return <CarItem car={car} />;
                  })
                : null}
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
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    height: "60vh",
    padding: "6rem 0 8rem",
  },
} as const;
export default Home;
