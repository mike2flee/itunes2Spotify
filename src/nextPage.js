import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { counterActionFunctions } from "./actions/counterActions";

class nextPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: "Enter Dev mode to view loaded cherrio object"
    };
    this.goToHome = this.goToHome.bind(this);
    this.addToCount = this.addToCount.bind(this);
  }

  goToHome() {
    browserHistory.push("/");
  }

  addToCount() {
    console.log("We are at the start of the add function");
    this.props.actions.add();
  }

  render() {
    return (
      <div>
        <h1>this is the second page</h1>
        <h1>{this.props.count}</h1>
        <button onClick={this.goToHome}>Back</button>
        <button onClick={this.addToCount}>ADD</button>
        <button>SUB</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...counterActionFunctions }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    count: state.counter.count
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(nextPage);
