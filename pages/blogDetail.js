import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { getBlogBySlug } from "../actions";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";

export default class BlogDetail extends Component {
  static async getInitialProps({ query }) {
    try {
        const slug=query.slug;
      const blog = await getBlogBySlug(slug);
      // console.log(blogs);
      //debugger;
      return { blog };
    } catch (err) {
      console.error(err);
    }
  }
  render() {
      const { blog }= this.props;
    //  console.log(blog);
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="blog-detail-page">
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div dangerouslySetInnerHTML={{ __html: blog.story }}></div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}
