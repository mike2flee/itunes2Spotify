import React from "react";
import { browserHistory } from "react-router";

class nextPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object"
    };
    this.goToHome = this.goToHome.bind(this);
  }

  goToHome() {
    browserHistory.push("/");
  }

  render() {
    return (
      <div>
        <h1>this is the second page</h1>
        <button onClick={this.goToHome}>Back</button>
      </div>
    );
  }
}

export default nextPage;
