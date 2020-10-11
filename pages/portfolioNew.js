import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";
import withAuth from "../components/hoc/withAuth";
import PortfolioCreateForm from "../components/portfolios/portfolioCreateForm";
import { Row, Col } from "reactstrap";
import {createPortfolios} from '../actions'
import {Router} from '../routes'

const INITIAL_VALUE = {
  title: "",
  company: "",
  position: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
};
class PortfolioNew extends Component {
  constructor(props){
    super();
  this.state = { error: undefined };
  }

  savePortfolio = (portfolioData,{setSubmitting})=>{ 
    setSubmitting(true);    
  createPortfolios(portfolioData).then((portfolio)=>{
    setSubmitting(false); 
   this.setState({
     error: undefined
   });
   Router.pushRoute('/portfolios');
  }).catch((err)=>{
    const error= err.message || 'Server Error'
    setSubmitting(true); 
    this.setState({error})
  })            
  }
  render() {
    const {error} =this.state
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="portfolio-create-page"
          title="Create New Portfolio"
        >
          <Row>
            <Col md="6">
              <PortfolioCreateForm initialValues={INITIAL_VALUE}
                onSubmit={this.savePortfolio}
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
  export default withSpecificAuth(PortfolioNew);