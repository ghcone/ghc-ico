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
  const [amountReached, setamountReached] = useState()
  const [{ web3, contract, accounts, round, roundNumber,GHCBalance }, dispatch] = useStore();
console.log("This is all inclusive round",round);
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
          <div>
            <div>
              <h2 style={{ color: "#38aea0", fontSize: "60px" }}> Round {roundNumber ? roundNumber : ""} Details</h2>
              <h6></h6>
            </div>
            <div>
           
              <h6>Round Cap: {round ? (round.roundCap / 10e17).toFixed(2) : ""} ETH</h6>
              <h6></h6>
            </div>
            <div>
              <h6>Amount raised:  {round ? (round.raised / 10e17).toFixed(2) : ""} ETH</h6>
              <h6></h6>
            </div>

            <div>
              <h6>Minimum: {round ? round.minContibution / 10e17 : ""} ETH</h6>
              <h6></h6>
            </div>
            <div>
              <h6>Maximum: {round ? round.maxContibution / 10e17 : ""} ETH</h6>
              <h6></h6>
            </div>

          </div>
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default withTranslation()(RoundDetails);
