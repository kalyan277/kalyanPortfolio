import React, { Component } from 'react'
import BasePage from '../components/BasePage'
import BaseLayout from '../components/layouts/BaseLayout'


import { Row, Col } from "reactstrap";

class About extends React.Component {
  render() {
    return (
      <BaseLayout
        title="Kalyan Singh -Something About Me"
        {...this.props.auth}
      >
        <BasePage className="about-page">
          <Row className="mt-5">
            <Col md="6">
              <div className="left-side">
                <h2 className="title fadein">Hello, Welcome To About Page</h2>
               <br/>
                <h3 className="subtitle fadein"> Some of The Achievement that i had made</h3>
                <br />
                <p className="subsubTitle fadein">
                  Feel free to read short description about me.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="fadein">
                <p>
                  My name is Kalyan Singh and I am an experienced software
                  engineer.{" "}
                </p>
                <p>
                  I have a Master's degree in Artificial Intelligence and
                  several years of experience working on a wide range of
                  technologies and projects from C++ development for ultrasound
                  devices to modern mobile and web applications in React and
                  Angular.
                </p>
                <p>
                  Throughout my career, I have acquired advanced technical
                  knowledge and the ability to explain programming topics
                  clearly and in detail to a broad audience. I invite you to
                  take my course, where I have put a lot of effort to explain
                  web and software engineering concepts in a detailed, hands-on
                  and understandable way.
                </p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;

