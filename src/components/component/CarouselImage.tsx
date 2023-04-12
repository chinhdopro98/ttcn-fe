import React from "react";
import Box from "@mui/material/Box";
import { Paper, Button } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive, productData } from "../../constains/data";
const CarouselImage = () => {
  const automakers = productData.map((item) => (
    <div className="card">
      <img
        className="product--image"
        src={require(`../../assets/image/automaker/${item.imageurl}`)}
        alt="product image"
      />
      <p>{item.name}</p>
    </div>
  ));
  return (
    <div className="carousel-automaker">
      <h1 className="popular-name">Popular Car Brand</h1>
      <Carousel showDots={true} responsive={responsive}>
        {automakers}
      </Carousel>
    </div>
  );
};

export default CarouselImage;
