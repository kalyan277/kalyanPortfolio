import React, { Component } from "react";
import Typed from 'react-typed';
import BaseLayout from "../components/layouts/BaseLayout";
import {Button ,Container,Row,Col} from 'reactstrap';

export default class Index extends Component {
  constructor(props){
    super(props);
      this.state = {
      isFlipping: false
    }

    this.roles = ['Developer', 'Tech Lover', 'Team Player', 'Course Creator', 'React.js', 'Angular'];
  }

  componentDidMount() {
    this.animateCard();
  }

  componentWillUnmount() {
    this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
  }

  animateCard() {
    this.cardAnimationInterval = setInterval(() => {
      this.setState({
        isFlipping: !this.state.isFlipping
      });
    }, 9000);
  }


  render() {
  //  console.log(this.props.auth)
    const {isAuthenticated,user}=this.props.auth
    const { isFlipping } = this.state;
    return (
      <BaseLayout
        className={`cover ${isFlipping ? "cover-1" : "cover-0"}`}
        {...this.props.auth}
        headerType="index"
        title="Kalyan Singh - Portfolio"
      >
        <div className="main-section">
          <div className="background-image">
            <img alt="welcome Picture" src="/static/images/background-index.png" />
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section text-center">
                  <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        className="image"
                        alt="flipper Picture"
                        src="/static/images/section-1.png"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Get You Project Done with ease</h2>
                        <div className="hero-section-content-intro">
                          Profesional and top quality services
                        </div>
                      </div>
                      <img
                        className="image"
                        alt="flipper Picture"
                        src="/static/images/section-2.png"
                      />
                      <div className="shadow-custom shadow-custom-2">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    {isAuthenticated && (
                      <span>
                        <b> Hii,{user.name} </b>
                      </span>
                    )}
                    Welcome to the portfolio website of Kalyan Singh. Get
                    informed, collaborate and discover projects I was working on
                    through the years!
                  </h1>
                </div>

                <Typed
                  loop
                  typeSpeed={60}
                  backSpeed={60}
                  strings={this.roles}
                  shuffle={false}
                  backDelay={1000}
                  className="self-typed"
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                />

                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}
