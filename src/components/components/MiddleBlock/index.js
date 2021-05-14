import { lazy } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import {useStore } from '../../../context/GlobalState';
import sectionImage from '../../images/ghc-section.png'
import * as S from "./styles";
import './style.modules.css';

const Button = lazy(() => import("../../common/Button"));

const MiddleBlock = ({ title, content, button, t }) => {
  const [{GHCBalance},dispatch] = useStore();
  console.log("This is GHC Balance",GHCBalance);
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center" align="middle">
        <Fade bottom>
          <S.ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6 style={{ color: "#38aea0" }}>{t(title)}</h6>
              <S.Content>{t(content)}</S.Content>
              {button ? (
                // <a style={{textDecoration:'none',color:"white"}} href="https://drive.google.com/file/d/1yWyBo6rsl8WpQ5roawC5yG0osm4vEotY/view?usp=sharing" target="_blank">
                // <Button
                //   name="submit"
                //   type="submit"
                //   // onClick={() => scrollTo("mission")}
                // >
                //   Read White Paper

                // </Button>
                //                   </a>
                <div style={{display:'flex'}}>
                <img
                  src={sectionImage}
                  className="about-block-image"
                  width="100%"
                  height="200px"
                  className="middle-image1"
                />
                     {/* <img
                  src={image2}
                  className="about-block-image"
                  width="33%"
                  height="200px"
                  className="middle-image2"

                />
                     <img
                  src={image3}
                  className="about-block-image"
                  width="33%"
                  height="200px"
                  className="middle-image3"

                /> */}
                </div>

              ) : (
                ""
              )}
                 {/* <div style={{display:'flex'}}>
            <img
              src={image1}
              className="about-block-image"
              width="33%"
              height="200px"
            />
                 <img
              src={image2}
              className="about-block-image"
              width="33%"
              height="200px"
            />
                 <img
              src={image3}
              className="about-block-image"
              width="33%"
              height="200px"
            />
            </div> */}
            </Col>
          </S.ContentWrapper>
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default withTranslation()(MiddleBlock);
