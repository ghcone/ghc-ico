import { GlobalProvider } from "./context/GlobalState";
import { EthAccountInfo } from "./components/EthAccountInfo";
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";


import Router from "./components/router/";
import i18n from "./components/translation";
function App() {
  return (
    <>
    <GlobalProvider>

    <div >
    <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </BrowserRouter>
    </div>
    {/* <EthAccountInfo /> */}

    </GlobalProvider>
    </>

  );
}

export default App;
