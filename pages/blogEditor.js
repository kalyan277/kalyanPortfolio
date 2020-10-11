import React, { Component } from 'react'
import BaseLayout from "../components/layouts/BaseLayout";
import withAuth from '../components/hoc/withAuth';
import BasePage from "../components/BasePage";
import SlateEditor from '../components/slateEditor/Editor';
import { createBlog } from "../actions";
import {Router} from '../routes';
 class BlogEditor extends Component {
   state={isloading:false,
   lockId:Math.floor(1000+Math.random()*9000)};
   saveBlog =(story,heading)=>{
    const {lockId}=this.state; 
    const blog={};
     blog.title=heading.title;
     blog.subTitle = heading.subtitle;
     blog.story=story;
     this.setState({isloading:true});
     createBlog(blog, lockId)
       .then((createdBlog) => {
         this.setState({ isloading: false });
         Router.pushRoute(`/blog/${createdBlog._id}/edit`);
       })
       .catch((err) => {
         const error = err.message || "Server Error";
         console.error(error);
       });
  }
  render() {
    const {isloading}=this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="blog-editor-page">
          <SlateEditor save={this.saveBlog} isloading ={isloading}/>
        </BasePage>
      </BaseLayout>
    );
  }
}


 const withSpecificAuth = withAuth("siteOwner");
export default withSpecificAuth(BlogEditor);
