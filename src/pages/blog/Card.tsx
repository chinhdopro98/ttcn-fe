import React from "react";
import { blog } from "../../constains/data";
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import "./blog.css";
import { Link } from "react-router-dom";
const Card = () => {
  return (
    <>
      <section className="blog">
        <div className="container grid3-blog">
          {blog.map((item) => (
            <div className="box boxItems" key={item.id}>
              <div className="img">
                <img
                  src={require(`../../assets/image/blog/${item.cover}`)}
                  alt=""
                />
              </div>
              <div className="details">
                <div className="tag">
                  <AiOutlineTags className="icon" />
                  <a href="/">#{item.category}</a>
                </div>
                <Link to={`/details/${item.id}`} className="link">
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.desc.slice(0, 180)}...</p>
                <div className="date">
                  <AiOutlineClockCircle className="icon" />{" "}
                  <label htmlFor="">{item.date}</label>
                  <AiOutlineComment className="icon" />{" "}
                  <label htmlFor="">27</label>
                  <AiOutlineShareAlt className="icon" />{" "}
                  <label htmlFor="">SHARE</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Card;
