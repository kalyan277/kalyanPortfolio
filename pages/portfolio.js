import React, { Component } from "react";
import { withRouter } from "next/router";
import BaseLayout from "../components/layouts/BaseLayout";
import axios from "axios";
import BasePage from "../components/BasePage";

class Portfolio extends Component {
  static async getInitialProps({ query }) {
    const postId = query.id;

    try {
      // const postId = context.query.id;
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      let post = response.data;
      return { post };
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { post } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>{post.title}</h1>
          <h2>{post.body}</h2>
          <p>{post.id}</p>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Portfolio);

