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
            title="Various Car Models"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
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
