import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";
import withAuth from '../components/hoc/withAuth';
import { getSecretData } from "../actions";

class Secret extends Component {
  static async getInitialProps({req}) {
    const anotherSecretData = await getSecretData(req);

    return { anotherSecretData };
  }

  async componentDidMount(){
      const secretData = await getSecretData();
      this.setState({
        secretData
      });
  }

  render() {
 //  console.log(this.props);
    const { superSecreatValue } = this.props.pageProps;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>{superSecreatValue}</BasePage>
      </BaseLayout>
    );
  }
}


  const withSpecificAuth = withAuth("siteOwner");
  export default withSpecificAuth(Secret);

