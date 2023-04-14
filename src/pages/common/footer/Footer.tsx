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
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <button className="btn5">
              <Link to="/app/contact">Contact Us Today</Link>
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
              <h2>Do You Need Help With Anything?</h2>
              <p>
                Receive updates, hot deals, tutorials, discounts sent straignt
                in your inbox every month
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
