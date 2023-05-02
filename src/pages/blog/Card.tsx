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
import { Blog, BlogCategory } from "../../interfaces/interface";
import { URL_LOCAL } from "../../constains/url";
interface Iprops {
  blogs: Blog[];
  blogCategorys: BlogCategory[];
}
const Card: React.FC<Iprops> = (props) => {
  const { blogs, blogCategorys } = props;
  return (
    <>
      <section className="blog">
        <div className="container grid3-blog">
          {blogs.map((item) => (
            <div className="box boxItems" key={item._id}>
              <div className="img">
                <img src={`${URL_LOCAL}${item.image}`} alt="" />
              </div>
              <div className="details-new">
                <div className="tag">
                  <AiOutlineTags className="icon" />
                  <a href="/">
                    #{" "}
                    {blogCategorys?.map((blogCategory: BlogCategory) =>
                      blogCategory._id === item.category
                        ? blogCategory.title
                        : ""
                    )}
                  </a>
                </div>
                <Link to={`${item._id}`} className="link">
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.description.slice(0, 120)}...</p>
                <div className="date">
                  <AiOutlineClockCircle className="icon" />{" "}
                  <label htmlFor="">
                    {new Date(item.createdAt).toLocaleString()}
                  </label>
                  {/* <AiOutlineComment className="icon" />{" "}
                  <label htmlFor="">27</label> */}
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
