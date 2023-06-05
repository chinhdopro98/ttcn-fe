import React from "react";
import img from "../../assets/image/car/contact1.jpg";
import Back from "../common/Back";
import "./contact.css";

const Card = () => {
  return (
    <>
      <section className="contact mb">
        <Back
          name="Liên hệ với cúng tôi"
          title="Nhận trợ giúp &; hỗ trợ thân thiện"
          cover={img}
        />
        <div className="container">
          <form className="shadow">
            <h4>Gửi về cho chúng tôi</h4> <br />
            <div>
              <input type="text" placeholder="Tên" />
              <input type="text" placeholder="Email" />
            </div>
            <input type="text" placeholder="Nội dung" />
            <textarea cols={20} rows={5}></textarea>
            <button>Gửi</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Card;
