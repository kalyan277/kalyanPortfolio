import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
} from 'reactstrap';
import PortfolioCardDetails from './PortfolioCardDetails';
export default class PortfolioCard extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
  }
  handleToggle = () => this.setState({ isOpen: !this.state.isOpen });
  render() {
    const { portfolio, children } = this.props;
    const { isOpen } = this.state;
    return (
      <span onClick={this.handleToggle}>
        <PortfolioCardDetails
          handleToggle={this.handleToggle}
          portfolio={portfolio}
          isopen={isOpen}
        />
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">
            {portfolio.position}
          </CardHeader>
          <CardBody>
            <p className="portfolio-card-city"> {portfolio.location} </p>
            <CardTitle className="portfolio-card-title">
              {portfolio.title}
            </CardTitle>
            <CardText className="portfolio-card-text">
              {portfolio.description}
            </CardText>
            <div className="readMore">{children}</div>
          </CardBody>
        </Card>
      </span>
    );
  }
}
