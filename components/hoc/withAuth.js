import React from 'react'
import BasePage from "../BasePage";
import BaseLayout from "../layouts/BaseLayout";

export default function HocAuth(role){
  return function (Component) {
    return class withAuth extends React.Component {
      static async getInitialProps(args) {
        // console.log('1');
        const pageProps =
          (await Component.getInitialProps) &&
          (await Component.getInitialProps(args));
        // console.log(pageProps);
        return { pageProps };
      }
      renderProtectedPage() {
        const { isAuthenticated, user } = this.props.auth;
        const userRole = user && user[`${process.env.NAMESPACE}/role`];
        let isAuthorized = false;

        if (role) {
          if (userRole && userRole === role) {
            isAuthorized = true;
          }
        } else {
          isAuthorized = true;
        }
        if (!isAuthenticated) {
          return (
            <BaseLayout {...this.props.auth}>
              <BasePage>
                <h1>
                  You Are Not Authenticated.Please Login To Have Access To The
                  Page
                </h1>
              </BasePage>
            </BaseLayout>
          );
        } else if (!isAuthorized) {
          return (
            <BaseLayout {...this.props.auth}>
              <BasePage>
                <h1>
                  You Are Not Authorized.You Don't have permission to view page.
                </h1>
              </BasePage>
            </BaseLayout>
          );
        } else {
          return <Component {...this.props} />;
        }
      }
      render() {
        return this.renderProtectedPage();
      }
    };
  };
}

   

