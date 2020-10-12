import React from 'react'
import App from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/main.scss';
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 import"react-datepicker/dist/react-datepicker.css";
import auth0 from '../services/auth0';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,} from 'redux';
import reducers from '../reducers/';
import thunk from 'redux-thunk';
const store =createStore(reducers,applyMiddleware(thunk))
 class PortfolioApp extends App {
   static async getInitialProps({Component,router,ctx}) {
    // console.log(ctx.req);
    let pageProps ={}
    const user = process.browser
      ? await auth0.clientAuth()
      : await auth0.serverAuth(ctx.req);
     const isSiteOwner = user && user[process.env.NAMESPACE + "/role"] === "siteOwner";
     const auth = { user, isAuthenticated: !!user, isSiteOwner };
     
    // console.log(auth);
     if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx);
    }// Executing getInitialProps of page you are navigated to
     return { pageProps, auth };
   }
   render() {
       const { Component, pageProps, auth } = this.props;
     return (
       <div>
         <ToastContainer />
         <Provider store={store}>
           <Component {...pageProps} auth={auth} />
         </Provider>
       </div>
     );
   }
 }

export default PortfolioApp
