import React, { Component } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import {
  Col,
  Row,
  Button,
  Alert,

} from "reactstrap";
import BasePage from '../components/BasePage';
import { getPortfolios, deletePortfolio } from "../actions";
import {Router} from '../routes';
import PortfolioCard from '../components/portfolios/PortfolioCard';


export default class portfolios extends Component {
  static async getInitialProps() {
    let portfolios = [];
    try {
      portfolios = await getPortfolios();
    } catch (err) {
      console.log(err);
    }
    return { portfolios };
  }
  state = { warning: false, portfolios_id: "", visibility: false };
  handleDelete = (portfolios_id,e) => {
    // alert(portfolios_id);
        e.stopPropagation();
    this.setState({ portfolios_id, warning: true });
    window.scrollTo(0, 0);
  };
  revertDelete = () => {
    this.setState({ warning: false, portfolios_id: undefined });
  };
  confirmDelete = () => {
    deletePortfolio(this.state.portfolios_id)
      .then(() => {
        this.setState({
          warning: false,
          portfolios_id: undefined,
          visibility: true,
        });
        Router.pushRoute("/portfolios");
      })
      .catch((err) => {
        console.error(err);
      });
    //alert(this.state.portfolios_id);
  };
  onDismiss=()=>{
    this.setState({ visibility: false });
  }
  handelEdit=(portfolio_id,e)=>{
    e.stopPropagation();
    Router.pushRoute(`/portfolio/${portfolio_id}/edit`);

  }
  renderPortfolios = (portfolios) => {
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    // console.log(this.props);
    return portfolios.map((portfolio, index) => (
      <Col md="4" key={index}>
        <PortfolioCard portfolio={portfolio}>
          {isAuthenticated && isSiteOwner && (
            <React.Fragment>
              <Button
                onClick={(e) => this.handelEdit(portfolio._id, e)}
                color="warning"
              >
                <i className="fa fa-edit" aria-hidden="true"></i>{" "}
                &nbsp; Edit
              </Button>{" "}
              <Button
                onClick={(e) => {
                  this.handleDelete(portfolio._id, e);
                }}
                color="danger"
              >
                <i className="fa fa-trash" aria-hidden="true"></i> &nbsp; Delete
              </Button>
            </React.Fragment>
          )}
        </PortfolioCard>
      </Col>
    ));
  };

  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title=" Kalyan Singh - Achievement">
          <Alert
            color="success"
            isOpen={this.state.visibility}
            toggle={this.onDismiss}
          >
            You Have Successfully Deleted The Portfolio !!
          </Alert>
          {this.state.warning && (
            <Alert color="danger">
              <h4 className="alert-heading text-center">
                Sure You Want To Delete This Portfolio ?
              </h4>
              <hr />
              <div className="d-flex justify-content-center">
                <Button
                  color="success"
                  className="mr-2"
                  onClick={this.confirmDelete}
                >
                  <i className="fa fa-check" aria-hidden="true"></i>&nbsp;
                  Confirm
                </Button>
                <Button color="danger" onClick={this.revertDelete}>
                  <i className="fa fa-undo" aria-hidden="true"></i>&nbsp; Revert
                  Back
                </Button>
              </div>
            </Alert>
          )}

          {isAuthenticated && isSiteOwner && (
            <Button
              onClick={() => Router.pushRoute("/portfolios/new")}
              color="success"
              className="create-port-btn"
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
              &nbsp; Create Portfolio
            </Button>
          )}
          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}
