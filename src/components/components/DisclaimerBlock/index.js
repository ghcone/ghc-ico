import { lazy } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import image1 from '../../images/miori75 2.jpg';
import image2 from '../../images/miori75 3.png'
import image3 from '../../images/miori75.jpg'
import sectionImage from '../../images/ghc-section.png'
import * as S from "./styles";
import './style.modules.css';

const Button = lazy(() => import("../../common/Button"));

const DisclaimerBlock = ({ title, content, button, t }) => {
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
              <h6>{t(title)}</h6>
              <S.Content>{t(content)}</S.Content>
         
        
            </Col>
          </S.ContentWrapper>
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default withTranslation()(DisclaimerBlock);
