import React from "react";
import Heading from "../../common/Heading";
import "./awards.css";
import { awards } from "../../../constains/data";

const Award = () => {
  return (
    <>
      <section className="awards padding">
        <div className="container">
          <Heading
            title="
            Hơn 1000 người dùng hài lòng với chúng tôi Họ vẫn yêu thích dịch vụ của chúng tôi"
            subtitle=""
          />
          <div className="content grid4 mtop">
            {awards.map((val, index) => (
              <div className="box" key={index}>
                <div className="icon">
                  <span>{val.icon}</span>
                </div>
                <h1>{val.num}</h1>
                <p>{val.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Award;
