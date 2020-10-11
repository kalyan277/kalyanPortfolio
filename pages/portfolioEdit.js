import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";
import withAuth from "../components/hoc/withAuth";
import PortfolioCreateForm from "../components/portfolios/portfolioCreateForm";
import { Row, Col } from "reactstrap";
import { updatePortfolios, getPortfolioById } from "../actions";
import { Router } from "../routes";
class PortfolioEdit extends Component {
  static async getInitialProps({ query }) {
    let portfolio = {};
    try {
      portfolio = await getPortfolioById(query.id);
      //console.log(portfolio);
      return { portfolio };
    } catch (err) {
      console.error(err);
    }
  }
  constructor(props) {
    super();
    this.state = { error: undefined };
  }

  updatePortfolios = (portfolioData, { setSubmitting }) => {
    setSubmitting(true);
    updatePortfolios(portfolioData)
      .then((portfolio) => {
        setSubmitting(false);
        this.setState({
          error: undefined,
        });
        Router.pushRoute("/portfolios");
      })
      .catch((err) => {
        const error = err.message || "Server Error";
        setSubmitting(true);
        this.setState({ error });
      });
  };
  render() {
    const { error } = this.state;
    const { portfolio } = this.props.pageProps;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Update Portfolio">
          <Row>
            <Col md="6">
              <PortfolioCreateForm
                initialValues={portfolio}
                onSubmit={this.updatePortfolios}
                error={error}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

const withSpecificAuth = withAuth("siteOwner");
export default withSpecificAuth(PortfolioEdit);
