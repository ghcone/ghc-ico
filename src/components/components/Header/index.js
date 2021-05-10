import {useState, Fragment, lazy} from "react";
import {Row, Col, Drawer} from "antd";
import {CSSTransition} from "react-transition-group";
import {withTranslation} from "react-i18next";
import logo from "../../images/logo1.png";
import * as S from "./styles";

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Button = lazy(() => import("../../common/Button"));

const Header = ({t}) => {
  const [isNavVisible] = useState(false);
  const [isSmallScreen] = useState(false);
  const [visible, setVisibility] = useState(false);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    return (
      <Fragment>
        {/* <S.CustomNavLinkSmall onClick={() => scrollTo("about")}>
          <S.Span>{t("About")}</S.Span>
        </S.CustomNavLinkSmall> */}
        {/* <S.CustomNavLinkSmall onClick={() => scrollTo("mission")}>
          <S.Span>{t("WhitePaper")}</S.Span>
        </S.CustomNavLinkSmall> */}
        <S.CustomNavLinkSmall>
          <S.Span>
            {" "}
            <a
              href="https://ghc.one/wp-content/uploads/2021/04/GHC.one-White-Paper-Versoin-1.0.pdf"
              target="_blank"
            >
              {t("WhitePaper")}
            </a>
          </S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall>
          <S.Span>
            {" "}
            <a
              href="https://ghc.one/"
              target="_blank"
            >
              {t("About")}
            </a>
          </S.Span>
        </S.CustomNavLinkSmall>
      
        {/* <S.CustomNavLinkSmall>
          <S.Span>
            {" "}
            <a href="https://t.me/fynxfornft" target="_blank">
              {t("Telegram")}
            </a>
          </S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall>
          <S.Span>
            {" "}
            <a href="https://open.kakao.com/o/gwZh86Pb" target="_blank">
              {t("Kakao Talk")}
            </a>
          </S.Span>
        </S.CustomNavLinkSmall> */}
        {/* <S.CustomNavLinkSmall onClick={() => scrollTo("contact")}>
          <S.Span>{t("Contact")}</S.Span>
        </S.CustomNavLinkSmall> */}
        {/* <S.CustomNavLinkSmall
          style={{ width: "180px" }}
          onClick={() => scrollTo("contact")}
        >
          <S.Span>
            <Button>{t("Buy")}</Button>
          </S.Span>
        </S.CustomNavLinkSmall> */}
      </Fragment>
    );
  };

  return (
    <S.Header>
      <S.Container>
        <Row type="flex" justify="space-between" gutter={20}>
          <S.LogoContainer to="/" aria-label="homepage">
            <SvgIcon
              src={logo}
              alt="this is logo"
              height="70px"
              with="70px"
            />
          </S.LogoContainer>
          <S.NotHidden>
            <MenuItem />
          </S.NotHidden>
          <S.Burger onClick={showDrawer}>
            <S.Outline />
          </S.Burger>
        </Row>
        <CSSTransition
          in={!isSmallScreen || isNavVisible}
          timeout={350}
          classNames="NavAnimation"
          unmountOnExit
        >
          <Drawer closable={false} visible={visible} onClose={onClose}>
            <Col style={{marginBottom: "2.5rem"}}>
              <S.Label onClick={onClose}>
                <Col span={12}>
                  <S.Menu>Menu</S.Menu>
                </Col>
                <Col span={12}>
                  <S.Outline padding="true" />
                </Col>
              </S.Label>
            </Col>
            <MenuItem />
          </Drawer>
        </CSSTransition>
      </S.Container>
    </S.Header>
  );
};

export default withTranslation()(Header);
