import React from 'react'
import Header from '../shared/Header'
import Head from 'next/head';

export default function BaseLayout(props) {
    
    const { className, children, isAuthenticated, isSiteOwner } = props;
   // console.log(isAuthenticated);
   const headerType = props.headerType || 'default';
   const title = props.title || 'Kalyan Singh Portfolio';
    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
          <meta name="description" content="My name is Kalyan Singh and I am an experienced software engineer.I have nearly 2 years of Industrials experience working on a 
           wide range of technologies and projects from starting from python, php to node into considering backend and for Front end Angular and React.
           Adding to this i can deal with mobile web applications as well. 
          . Throughout my career, I have acquired advanced technical knowledge and the ability, but not got any stage to show it." />
          <meta name="keywords" content="kalyan portfolio, kalyan developer,kalyan programming" />
          <meta property="og:title" content="Kalyan Singh - programmer, developer, bloger" />
          <meta property="og:locale" content="en-US" />
          <meta property="og:url" content={`${process.env.BASE_URL}`}/>
          <meta property="og:type" content="website" />
          <meta property="og:description" content="My name is Kalyan Singh and I am an experienced software engineer." />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossOrigin="anonymous"
          />
        <link rel="icon" type="image/ico" href="/static/favicon.ico" />
        </Head>
        <div className="layout-container">
          <Header
            className={`port-nav-${headerType}`}
            isAuthenticated={isAuthenticated}
            isSiteOwner={isSiteOwner}
          />
          <main className={`cover ${className}`}>
            <div className="wrapper">{children}</div>
          </main>
        </div>
      </React.Fragment>
    );
}



