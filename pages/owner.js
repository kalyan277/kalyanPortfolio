import withAuth from "../components/hoc/withAuth";
import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";

class Owner extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>I am Owner</BasePage>
      </BaseLayout>
    );
  }
}

const withSpecificAuth = withAuth("siteOwner");
export default withSpecificAuth(Owner);