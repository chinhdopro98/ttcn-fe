import React from "react";
import Heading from "../../common/Heading";
import "./models.css";
import { models } from "../../../constains/data";
const Model = () => {
  return (
    <>
      <section className="location padding">
        <div className="container">
          <Heading
            title="Các mẫu xe khác nhau"
            subtitle="Xe có đầy đủ các tiện nghi, chắc chắn sẽ mang đến cho bạn cảm giác thoải mái, thư thái khi sử dụng dịch vụ của chúng tôi."
          />

          <div className="content grid3 mtop">
            {models.map((item, index) => (
              <div className="box" key={index}>
                <img
                  src={require(`../../../assets/image/home/${item.cover}`)}
                  alt=""
                />
                <div className="overlay">
                  <h5>{item.name}</h5>
                  <p>
                    <label>{item.Country}</label>
                    <label>{item.Offices}</label>
                    <label>{item.Apartments}</label>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Model;
