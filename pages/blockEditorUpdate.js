import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import withAuth from "../components/hoc/withAuth";
import BasePage from "../components/BasePage";
import SlateEditor from "../components/slateEditor/Editor";
import { getBlogById, updateBlog } from "../actions";
 import { toast } from "react-toastify";
class blockEditorUpdate extends Component {
  static async getInitialProps({ query }) {
    const blogId = query.id;
    //console.log(blogId);
    try {
      const blog = await getBlogById(blogId);
      //console.log(blog);
      return { blog };
    } catch (err) {
      return err;
    }
  }
  state = { isloading: false };
  updateBlog = (story, heading) => {
    const { blog } = this.props.pageProps;
    const updatedBlog = {};
    updatedBlog.title = heading.title;
    updatedBlog.subTitle = heading.subtitle;
    updatedBlog.story = story;
    this.setState({ isloading: true });
    updateBlog(updatedBlog, blog._id)
      .then((updatedBlog) => {
        toast.success("Blog Saved Succesfully");
        this.setState({ isloading: false });
             })
      .catch((err) => {
        this.setState({ isloading: false });
        const error = err.message || "Server Error";
        toast.error(error);
       
      });
  };
  render() {
    const { blog } = this.props.pageProps;
    //console.log(blog);
    const { isloading } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="blog-editor-page">
          <SlateEditor
            initialValue={blog.story}
            save={this.updateBlog}
            isloading={isloading}
          />
        </BasePage>
      </BaseLayout>
    );
  }
}

const withSpecificAuth = withAuth("siteOwner");
export default withSpecificAuth(blockEditorUpdate);
