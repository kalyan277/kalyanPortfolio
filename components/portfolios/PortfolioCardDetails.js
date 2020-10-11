import React, { Component } from 'react';
import moment from 'moment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
export default class PortfolioCardDetails extends Component {
  
  render() {
      const { isopen, handleToggle,portfolio } = this.props;
   //   console.log(this.props);
    return (
      <div>
        <Modal isOpen={isopen} toggle={handleToggle}>
          <ModalHeader toggle={handleToggle}>{portfolio.title}</ModalHeader>
          <ModalBody>
            <p>
              <b>Description:</b>
              {portfolio.description}
            </p>
            <p>
              <b>Company:</b>
              {portfolio.company}
            </p>
            <p>
              <b>Location:</b>
              {portfolio.location}
            </p>
            <p>
              <b>Start Date:</b>
              {moment(portfolio.startDate).format("MMMM YYYY")}
            </p>
            <p>
              <b>End Date:</b>
              {moment(portfolio.endDate).format("MMMM YYYY")}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleToggle}>
              Closed
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

