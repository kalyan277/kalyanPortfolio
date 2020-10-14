import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import withAuth from "../components/hoc/withAuth";
import {getUserBlogs,updateBlog,deleteBlog} from '../actions';
import { Link ,Router} from "../routes";
import PortButtonDropDown from "../components/ButtonDropdown";
import { toast } from "react-toastify";

 class UserBlogs extends Component {
   static async getInitialProps({ req }) {
     try {
       const blogs = await getUserBlogs(req);
       //console.log(blogs);
       return { blogs };
     } catch (err) {
       console.error(err);
     }
   }
   state = { warning: false, blog_id: "", visibility: false };
   handleDelete = (blog_id) => {
     // alert(portfolios_id);
    this.setState({ blog_id, warning: true });
        window.scrollTo(200, 300);
   };
   revertDelete = () => {
     this.setState({ warning: false, blog_id: undefined });
   };
   confirmDelete = () => {
     deleteBlog(this.state.blog_id)
       .then(() => {
         this.setState({
           warning: false,
           blog_id: undefined,
           visibility: true,
         });
         Router.pushRoute("/userBlogs");
         // toast.success("Blog Succesfully Deleted");
       })
       .catch((err) => {
         console.error(err);
       });
     //alert(this.state.portfolios_id);
   };
   onDismiss = () => {
     this.setState({ visibility: false });
   };
   createStatus(status) {
     return status === "draft"
       ? { view: "Publish Story", value: "published" }
       : { view: "Make A Draft", value: "draft" };
   }
   dropdownOption = (blog) => {
     const blogState = this.createStatus(blog.status);
     //  debugger;
     return [
       {
         text: blogState.view,
         handlers: {
           onClick: () => this.changedBlogStatus(blogState.value, blog._id),
         },
       },
       {
         text: "Delete",
         handlers: { onClick: () => this.handleDelete(blog._id) },
       },
     ];
   };
   separateBlogs(blogs) {
     const published = [];
     const drafts = [];
     blogs.forEach((blog) => {
       blog.status === "draft" ? drafts.push(blog) : published.push(blog);
     });
     return { published, drafts };
   }
   changedBlogStatus = (status, blogId) => {
     updateBlog({ status }, blogId)
       .then(() => {
         Router.pushRoute("/userBlogs");
         toast.success("Blog Succesfully Updated");
       })
       .catch((err) => {
         console.error(err.message);
       });
   };
   renderBlogs = (blogs) => {
     return (
       <ul className="user-blogs-list">
         {blogs.map((blog, index) => (
           <li key={index}>
             <Link route={`/blog/${blog._id}/edit`}>
               <a> {blog.title}</a>
             </Link>
             <PortButtonDropDown item={this.dropdownOption(blog)} />
           </li>
         ))}
       </ul>
     );
   };
   render() {
     const { blogs } = this.props.pageProps;
     // console.log(blogs);
     const { published, drafts } = this.separateBlogs(blogs);
     //console.log(published);
     // console.log(drafts);
     return (
       <BaseLayout headerType={"landing"} {...this.props.auth}>
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
                   <h1>Blogs Dashboard</h1>
                   <span className="subheading">
                     <span className="pb-2"> Let's Write Some Nice Blogs </span>
                     <Link route="/blog/new">
                       <Button outline color="warning" className="text-center">
                         Create New Blog
                       </Button>
                     </Link>
                   </span>
                 </div>
               </div>
             </div>
           </Container>
         </div>
         <BasePage className="blog-user-page">
           <Alert
             color="success"
             isOpen={this.state.visibility}
             toggle={this.onDismiss}
           >
             You Have Successfully Deleted The Blog !!
           </Alert>
           {this.state.warning && (
             <Alert color="danger">
               <h4 className="alert-heading text-center">
                 Sure You Want To Delete This Blog ?
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
                   <i className="fa fa-undo" aria-hidden="true"></i>&nbsp;
                   Revert Back
                 </Button>
               </div>
             </Alert>
           )}
           <Row>
             <Col md="6" className="mx-auto text-center">
               <h2 className="blog-status-title">Published Blogs</h2>
               {this.renderBlogs(published)}
             </Col>
             <Col md="6" className="mx-auto text-center">
               <h2 className="blog-status-title">Draft Blogs</h2>
               {this.renderBlogs(drafts)}
             </Col>
           </Row>
         </BasePage>
       </BaseLayout>
     );
   }
 }

  const withSpecificAuth = withAuth("siteOwner");
  export default withSpecificAuth(UserBlogs);