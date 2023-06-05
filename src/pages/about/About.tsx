import Back from "../common/Back";
import Heading from "../common/Heading";
import "./about.css";
import img from "../../assets/image/about.jpg";
import img2 from "../../assets/image/about2.jpg";
const About = () => {
  return (
    <>
      <section className="about">
        <Back
          name="Về chúng tôi"
          title="Về chúng tôi - Chúng tôi là ai?"
          cover={img}
        />
        <div className="container flex mtop about-content">
          <div className="left row width-50">
            <Heading
              title="Thuê xe"
              subtitle="Check out our company story and work process"
            />
            <p>
              được đánh giá xứng đáng. "Chúng ta đang chứng kiến một trong những
              điều rất đặc biệt", Horner nói với báo chí sau chặng Grand Prix
              Mexico. "Đôi khi, tôi nghĩ thành tích của Max không nhận được sự
              ghi nhận xứng đáng. Tôi nghĩ những gì chúng ta chứng kiến mùa này
              là màn trình diễn xuất chúng của một tay đua, người đang ở đỉnh
              cao phong độ".
            </p>
            <p>
              Horner cho rằng nỗ lực của Verstappen không được ghi nhận một cách
              xứng đáng. Ảnh: XPB. Horner cho rằng nỗ lực của Verstappen không
              được ghi nhận một cách xứng đáng. Ảnh: XPB.
            </p>
            <button className="btn2">More About Us</button>
          </div>
          <div className="right row">
            <img src={img2} alt="" />
          </div>
        </div>

        <div className="container flex mtop">
          <div className="left row rleft-30px">
            <img src={img2} alt="" />
          </div>
          <div className="right row width-50">
            <Heading
              title="Tin tức về chúng tôi"
              subtitle="Check out our company story and work process"
            />
            <p>
              được đánh giá xứng đáng. "Chúng ta đang chứng kiến một trong những
              điều rất đặc biệt", Horner nói với báo chí sau chặng Grand Prix
              Mexico. "Đôi khi, tôi nghĩ thành tích của Max không nhận được sự
              ghi nhận xứng đáng. Tôi nghĩ những gì chúng ta chứng kiến mùa này
              là màn trình diễn xuất chúng của một tay đua, người đang ở đỉnh
              cao phong độ".
            </p>
            <p>
              Horner cho rằng nỗ lực của Verstappen không được ghi nhận một cách
              xứng đáng. Ảnh: XPB. Horner cho rằng nỗ lực của Verstappen không
              được ghi nhận một cách xứng đáng. Ảnh: XPB.
            </p>
            <button className="btn2">More About Us</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
