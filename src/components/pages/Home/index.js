import { lazy } from "react";

import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import DisclaimerBlockContent from "../../content/DisclaimerBlockContent.json";

import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import AMX from '../../components/ContentBlock/RightContentBlock/AMX.png'

const ContactFrom = lazy(() => import("../../components/ContactForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const DisclaimerBlock = lazy(() => import("../../components/DisclaimerBlock"));
const RoundDetails = lazy(() => import("../../components/RoundDetails"));

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));


const Home = () => {
  return (
    <Container>
      {/* <ScrollToTop /> */}
      <ContentBlock
        type="right"
        first="true"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="developer.svg"
        id="intro"
      />

   <RoundDetails
        title={DisclaimerBlockContent.title}
        content={DisclaimerBlockContent.text}
        button={DisclaimerBlockContent.button}
      />
      {/* <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
      /> */}
      {/* <ContentBlock
        type="right"
        title={MissionContent.title}
        content={MissionContent.text}E
        icon="product-launch.svg"
        id="mission"
      /> */}

      <ContentBlock
        type="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="waving.svg"
        id="product"
      />
   
      <DisclaimerBlock
        title={DisclaimerBlockContent.title}
        content={DisclaimerBlockContent.text}
        button={DisclaimerBlockContent.button}
      />

      {/* <ContentBlock
        type="right"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon={AMX}
        id="about"
      /> */}
      {/* <ContactFrom
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      /> */}
    </Container>
  );
};

export default Home;
