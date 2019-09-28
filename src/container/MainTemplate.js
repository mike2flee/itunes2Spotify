import React from "react";
import { Row, Col, Container } from "reactstrap";
import "../assets/style.css";
import App from "../App";

class MainTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object"
    };
  }

  render() {
    return (
      <Container fluid="True" className="root">
        <Row className="endBoxes"></Row>
        <Row className="landingPageRow">
          <Col sm={{ size: 8, offset: 2 }}>
            <Row className="logoCol">
              <Col sm={{ size: 8, offset: 2 }}></Col>
            </Row>
            <Row className="mainSearch">
              {" "}
              {/* //Start of Content */}
              <App></App>
              {/* //End of Content */}
            </Row>
          </Col>
        </Row>
        <Row className="endBoxes"></Row>
      </Container>
    );
  }
}

export default MainTemplate;
