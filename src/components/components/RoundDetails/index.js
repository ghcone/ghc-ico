import { lazy } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import React, { useState, useEffect, Fragment, useCallback, useRef } from "react";
import { useStore } from "../../../context/GlobalState";

import sectionImage from '../../images/ghc-section.png'
import * as S from "./styles";
import './style.modules.css';

const Button = lazy(() => import("../../common/Button"));

const RoundDetails = ({ title, content, button, t }) => {
  const [roundRate, setRoundRate] = useState()
  const [{ web3, contract, accounts, round, roundNumber }, dispatch] = useStore();

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
          {/* <S.ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <S.Content>{t(content)}</S.Content>
         
        
            </Col>
          </S.ContentWrapper> */}
          <div>
          <div>
              <h2 style={{color:"#38aea0",fontSize: "60px"}}> Round {roundNumber ? roundNumber : ""} Details</h2>
              <h6></h6>
            </div>
            <div>
              <h6>Raised: {round ? (round.roundCap / 10e17).toFixed(2) : ""}</h6>
              <h6></h6>
            </div>
            
            <div>
              <h6>Min Investment: {round ? round.minContibution / 10e17 : ""}</h6>
              <h6></h6>
            </div>
            <div>
              <h6>Max Investment: {round ? round.maxContibution / 10e17 : ""}</h6>
              <h6></h6>
            </div>

          </div>
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default withTranslation()(RoundDetails);
