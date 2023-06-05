import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chart from "./admin/chart/Chart";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hook/hook";
import { getTotalData } from "../redux/action/carAction";
import ChartColumn from "./admin/chart/ChartColumn";

const AdminHome = () => {
  const totalData = useSelector((state: RootState) => state.car.totalData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTotalData());
  }, [dispatch]);
  return (
    <Box sx={{ padding: "40px 50px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        mb={1}
        sx={{
          fontSize: "32px",
          textAlign: "left",
          color: "#BE2586",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        WELLCOME TO ADMIN
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "50px",
        }}
      >
        <Box sx={{ width: "24%", height: "150px", background: "#fc53c5" }}>
          <Typography
            variant="h6"
            mb={1}
            sx={{
              fontSize: "30px",
              color: "#fff",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            SỐ XE
          </Typography>
          <Box
            className="total-data"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className="fa-solid fa-car"></i>
            <Typography
              variant="h6"
              mb={1}
              sx={{
                fontSize: "40px",
                marginBottom: "0",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {totalData.totalCar}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: "24%", height: "150px", background: "#25d5e8" }}>
          <Typography
            variant="h6"
            mb={1}
            sx={{
              fontSize: "30px",
              color: "#fff",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            NGƯỜI DÙNG
          </Typography>
          <Box
            className="total-data"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className="fa-solid fa-user"></i>
            <Typography
              variant="h6"
              mb={1}
              sx={{
                fontSize: "40px",
                marginBottom: "0",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {totalData.totalUser}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "24%", height: "150px", background: "#45c112" }}>
          <Typography
            variant="h6"
            mb={1}
            sx={{
              fontSize: "30px",
              color: "#fff",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            ĐẶT XE
          </Typography>
          <Box
            className="total-data"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className="fa-solid fa-car"></i>
            <Typography
              variant="h6"
              mb={1}
              sx={{
                fontSize: "40px",
                marginBottom: "0",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {totalData.totalBooking}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "24%", height: "150px", background: "#fc5e3a" }}>
          <Typography
            variant="h6"
            mb={1}
            sx={{
              fontSize: "30px",
              color: "#fff",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            TIN TỨC
          </Typography>
          <Box
            className="total-data"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className="fa-solid fa-newspaper"></i>
            <Typography
              variant="h6"
              mb={1}
              sx={{
                fontSize: "40px",
                marginBottom: "0",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {totalData.totalBlog}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginBottom: "50px" }}>
        <Typography
          variant="h6"
          mb={1}
          sx={{
            fontSize: "26px",
            textAlign: "left",
            marginBottom: "20px",
          }}
        >
          Thống kê đơn đặt xe
        </Typography>
        <Chart />
      </Box>
      <Box>
        <Typography
          variant="h6"
          mb={1}
          sx={{
            fontSize: "26px",
            textAlign: "left",
            marginBottom: "20px",
          }}
        >
          Thống kê doanh thu
        </Typography>
        <ChartColumn />
      </Box>
    </Box>
  );
};

export default AdminHome;
