import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Navigation from "./Navigation";
import { Row, Col, Container } from "reactstrap";
import nextPage from "./nextPage";
import webScraper from "./webScraper";
import App from "./App";
import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import ThankYou from "./ThankYou";
import MainTemplate from "./container/MainTemplate";
import "./assets/style.css";

//
const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Container fluid="True" className="root">
      <Navigation></Navigation>
      <Row className="endBoxes"></Row>
      <Row className="landingPageRow">
        <Col sm={{ size: 8, offset: 2 }}>
          <Row className="mainSearch">
            {" "}
            {/* //Start of Content */}
            <Router history={history}>
              <Route path="/" component={App}></Route>
              <Route path="/playListCreation" component={nextPage}></Route>
              <Route path="/finished" component={ThankYou}></Route>
              <Route path="/Cheers" component={webScraper}></Route>
              <Route path="/Main" component={MainTemplate}></Route>
            </Router>
            {/* //End of Content */}
          </Row>
        </Col>
      </Row>
      <Row className="endBoxes"></Row>
    </Container>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
