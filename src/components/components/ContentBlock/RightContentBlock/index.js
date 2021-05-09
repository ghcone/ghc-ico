import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Slide from "react-reveal/Slide";
import { useStore } from "../../../../context/GlobalState";
import React, { useState, useEffect, Fragment, useCallback,useRef } from "react";
import SvgIcon from "../../../common/SvgIcon";
import Button from "../../../common/Button";
import { buyTokensAsync, loadBlockchain } from "../../../../store/asyncActions";
import * as S from "./styles";
import { makeStyles, duration } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AMX from "./AMX.png";
import AMXJPEG from "./AMX.jpg";
import TextField from "@material-ui/core/TextField";
import "../../../../css/modal.modules.css";
import Timer from '../../Timer/Timer'
import './index.css'
import logo from "../../../images/logo1.png";
import Web3 from "web3";



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const RightBlock = ({ title, content, button, icon, t, id }) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const [{ web3, contract, accounts, round }, dispatch] = useStore();
  const account = accounts[0];
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [roundData, setRoundData] = useState()
  const [open, setOpen] = React.useState(false);
  const [etherValue, setEtherValue] = React.useState("0");
  const [weiValue, setWeiValue] = React.useState("");
  const [roundRate, setRoundRate] = useState("")
  const [roundStop, setRoundStop] = useState(0);

  //for time
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");


  useEffect(() => {
    if (round != null) {
      setRoundRate(round.rate)
      setRoundStop(round.stopTime*1000)
    }
  }, [round])

  

  useEffect(() => {
    if (etherValue >= 10e20) {
      alert("big Number")
    }
    else if (etherValue < 10e19) {
      let etherToWei = etherValue * 10e17;

      let stringEtherToWei = ((roundRate / 10 ** 10) * etherToWei).toString();
      setWeiValue(stringEtherToWei);
    }

  }, [etherValue])

  const sendRequest = useCallback(async () => {
    loadBlockchain(dispatch);
  }, []);
  console.log("this weiValueweiValue", weiValue)
  const onSubmit = async () => {

    let etherToWei = etherValue * 10e17;
    let stringEtherToWei = etherToWei.toString();
    try {
      await buyTokensAsync(account, accounts, contract, stringEtherToWei, dispatch);
    } catch (error) {
      console.log("error trax = ", error);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  let interval = useRef();



  const startTimer = () => {

    if (round != null) {

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = roundStop - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  }
  };

  useEffect(() => {
    
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  console.log("this is web3", web3);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ textAlign: 'center' }}>
        {/* <h2 id="simple-modal-title">Buy Fynx Token</h2> */}
        <br />
        {web3 == null ? (
          <div> </div>
        ) : (
            <>
              {/* <p> 1ETH = 200,000 FYNX</p>  
     <h6> GHC = {(web3.utils.fromWei(weiValue, "wei")/5000000000000)} </h6>   */}
            </>
          )}
        <br />
        <TextField
          id="outlined-basic"
          label="Enter ETH"
          variant="outlined"
          value={etherValue}
          onChange={(e) => setEtherValue(e.target.value)}
          type="number"
          inputProps={
            { maxLength: 1 }
          } />
        <br />
        {/* <SimpleModal /> */}
        {/* <S.ButtonWrapper>
          {button &&
            typeof button === "object" &&
            button.map((item, id) => {
              return ( */}
        <Button
          width="true"
          // onClick={() => scrollTo("about")}
          onClick={onSubmit}
          style={{ marginTop: '20px' }}
        >
          {/* {t(item.title)} */}
          BUY GHC
                </Button>
        {/* );
            })}
        </S.ButtonWrapper> */}
      </div>
    </div>
  );
  console.log("this is for value", etherValue);

  return (
    <div className="secionOne-container" >

      <S.RightBlockContainer>
        <Row type="flex" justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={11} xs={24}>
            <Slide left>
              <S.ContentWrapper>
                <h6>{t(title)}</h6>
                <S.Content>{t(content)}</S.Content>
                {
                  web3 == null ?
                    <Button onClick={sendRequest}>Unlock Wallet</Button>
                    :
                    <Button onClick={handleOpen}>BUY GHC</Button>

                }


                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
              </S.ContentWrapper>
            </Slide>
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            <Slide right>
              <img src={logo} className="about-block-image"
                width="70%"
                height="70%"
              // style={{marginLeft:"20px"}}
              />
            </Slide>
          </Col>
        </Row>
      </S.RightBlockContainer>
      <h3 className="timer-flex" style={{ marginBottom: "-50px" }}>Time Left</h3>
      <>
      <div className="display-timer">
        <div className="timer-flex">
          <div className="d-two">
            <span className="timer-num one">
              <b>{timerDays} </b>
            </span>
            <span className="timer-text one1">days</span>
          </div>
          <div className="">
            <span className="timer-num ">
              {" "}
              <b>{timerHours}</b>
            </span>
            <span className="timer-text">hours</span>
          </div>
          <div className="">
            <span className="timer-num two">
              <b>{timerMinutes}</b>
            </span>
            <span className="timer-text two2">minutes</span>
          </div>
          <div className="">
            <span className="timer-num two">
              {" "}
              <b>{timerSeconds}</b>
            </span>
            <span className="timer-text two2">seconds</span>
          </div>
        </div>
      </div>

      <div className="btn-div"></div>
      
    </>

    </div>
  );
};

export default withTranslation()(RightBlock);
