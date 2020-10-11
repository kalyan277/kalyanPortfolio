import React, { Component } from 'react';
import BasePage from '../components/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';
import {Container,Row,Col} from 'reactstrap';
import {Link} from '../routes';
import moment from 'moment';
import { getBlogs } from '../actions';
import { shortenText } from '../helpers/utils';


export default class Blogs extends Component {
  static async getInitialProps({ req }) {
    try {
      const blogs = await getBlogs(req);
      // console.log(blogs);
      //debugger;
      return { blogs };
    } catch (err) {
      console.error(err);
    }
  }
  renderBlogs = (blogs) =>
    blogs.map((blog, index) => (
      <div key={index} className="post-preview">
        <Link route={`/blog/${blog.slug}`}>
          <a>
            <h2 className="post-title">{blog.title}</h2>
            <h3 className="post-subtitle">{shortenText(blog.subTitle)}</h3>
          </a>
        </Link>
        <p className="post-meta">
          Posted by
          <a href="#"> {blog.author} </a>
          {moment(blog.createdAt).format("LLLL")}
        </p>
      </div>
    ));
  render() {
    //console.log(this.props);
    // debugger;
    const { blogs } = this.props;
    //console.log(blogs);
    return (
      <BaseLayout
        headerType={"landing"}
        className="blog-listing-page"
        {...this.props.auth}
        title=" Kalyan Singh - Newest Blogs Stories"
      >
        <div
          className="masthead"
          style={{
            backgroundImage: "url('/static/images/home-bg.jpg')",
          }}
        >
          <div className="overlay"></div>
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Fresh Blogs</h1>
                  <span className="subheading">Programming, travelling...</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-body">
          <Row>
            <Col md="10" lg="8" className="mx-auto">
              {this.renderBlogs(blogs)}
           
            </Col>
          </Row>

          <footer>
            <Container>
              <Row>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <ul className="list-inline social-network social-circle text-center">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg icoFacebook">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-facebook fa-stack-1x fa-inverse"></i>
                          <i className="fab fa-facebook fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a target="_blank" href="https://github.com/kalyan277">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                          <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg ">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-linkedin fa-stack-1x fa-inverse"></i>
                          <i className="fab fa-linkedin fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">
                    Copyright &copy; Kalyan Singh {new Date().getFullYear()}
                  </p>
                </div>
              </Row>
            </Container>
          </footer>
        </BasePage>
      </BaseLayout>
    );
  }
}
