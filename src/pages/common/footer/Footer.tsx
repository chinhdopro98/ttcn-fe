import React from "react";

import "./footer.css";
import { footer } from "../../../constains/data";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className="footerContact">
        <div className="container">
          <div className="send flex">
            <div className="text">
              <h1>Bạn có câu hỏi ?</h1>
              <p>Chúng tôi sẽ giúp bạn phát triển sự nghiệp và phát triển.</p>
            </div>
            <button className="btn5">
              <Link to="/app/contact">Liên hệ</Link>
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <Box sx={{ height: "70px", width: 120 }}>
                <img
                  src={require(`../../../assets/image/car/auto-car.jpg`)}
                  alt=""
                  className="carimg w-full h-full"
                />
              </Box>
              <h2>Bạn có cần giúp đỡ với bất cứ điều gì??</h2>
              <p>
                Nhận thông tin cập nhật, giao dịch hấp dẫn, hướng dẫn, giảm giá
                được gửi thẳng trong hộp thư đến của bạn mỗi tháng
              </p>

              <div className="input flex">
                <input type="text" placeholder="Email Address" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className="box">
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
