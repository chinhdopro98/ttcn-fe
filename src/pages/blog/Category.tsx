import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./category.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext, MdOutlineNavigateNext } from "react-icons/md";
import { categorys } from "../../constains/data";
import { BlogCategory } from "../../interfaces/interface";
import { URL_LOCAL } from "../../constains/url";
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <MdOutlineNavigateNext className="icon" />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <GrFormPrevious className="icon" />
      </button>
    </div>
  );
};
interface Iprops {
  blogCategorys: BlogCategory[];
}
const Category: React.FC<Iprops> = (props) => {
  const { blogCategorys } = props;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <section className="category">
        <div className="content">
          <Slider {...settings}>
            {blogCategorys.map((item) => (
              <div className="boxs">
                <div className="box" key={item._id}>
                  <img src={`${URL_LOCAL}${item.image}`} alt="cover" />
                  <div className="overlay">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Category;
