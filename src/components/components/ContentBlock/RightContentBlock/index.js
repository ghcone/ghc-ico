import {Row, Col} from "antd";
import {withTranslation} from "react-i18next";
import Slide from "react-reveal/Slide";
import {useStore} from "../../../../context/GlobalState";
import React,{useEffect} from "react";
import SvgIcon from "../../../common/SvgIcon";
import Button from "../../../common/Button";
import {buyTokensAsync} from "../../../../store/asyncActions";
import * as S from "./styles";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AMX from "./AMX.png";
import AMXJPEG from "./AMX.jpg";
import TextField from "@material-ui/core/TextField";
import "../../../../css/modal.modules.css";
import image1 from '../../../images/miori75 2.jpg';
import image2 from '../../../images/miori75 3.png'
import image3 from '../../../images/miori75.jpg'
import './index.css'
import logo from "../../../images/logo1.png";



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

const RightBlock = ({title, content, button, icon, t, id}) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const [{web3, contract, accounts}, dispatch] = useStore();
  const account = accounts[0];
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [etherValue, setEtherValue] = React.useState("0");
  const [weiValue,setWeiValue] = React.useState("");
  useEffect(()=> {
    if(etherValue >= 10e20) {
    
      alert("big Number")
     
    }

    else if(etherValue < 10e19){
      let etherToWei = etherValue * 10e17;
      let stringEtherToWei = etherToWei.toString();
      setWeiValue(stringEtherToWei);
    }
   
  },[etherValue])


  const onSubmit = async () => {
    // e.preventDefault();
    // setAuction(formData)
    // console.log("thi is auction auciton", formData);
    // setTransactionSuccessful(true);
    // setTransactionError("");
    let etherToWei = etherValue * 10e17;
    let stringEtherToWei = etherToWei.toString();
    try {
      // setTransactionInprocess(true)
      // console.log("This is form data from dispatch async", auction);
      await buyTokensAsync(account, accounts, contract, stringEtherToWei, dispatch);

      // setTransactionInprocess(false);
      // setTransactionSuccessful(true);
    } catch (error) {
      console.log("error trax = ", error);
      // setTransactionInprocess(false);
      // setTransactionSuccessful(false);
      // setTransactionError(error.message);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log("this is web3", web3);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{textAlign:'center'}}>
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
          label="Enter BNB"
          variant="outlined"
          value={etherValue}
          onChange={(e) => setEtherValue(e.target.value)}
          type="number"
          inputProps={
            {maxLength: 1}
        }       />
        <br/>
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
                  style={{marginTop: '20px'}}
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

              <Button onClick={handleOpen}>BUY GHC</Button>
          
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
                <img src={logo}       className="about-block-image"
              width="70%"
              height="70%"
              // style={{marginLeft:"20px"}}
              />
          </Slide>
        </Col>
      </Row>
    </S.RightBlockContainer>
    </div>
  );
};

export default withTranslation()(RightBlock);
