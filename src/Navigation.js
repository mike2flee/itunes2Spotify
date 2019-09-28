import React from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from "reactstrap";
import "./assets/style.css";

const iframeElem = document.getElementById("ssIFrame_google");
if (iframeElem) {
  iframeElem.remove();
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Container fluid>
        <div>
          <Navbar color="dark fixed-top" dark>
            <div className="text">SYMP</div>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem className="text">About Us</NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </Container>
    );
  }
}

export default Navigation;
