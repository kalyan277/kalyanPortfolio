import React from 'react'
import {Container} from 'reactstrap';
import PropTypes from 'prop-types'

export default function BasePage(props) {
    const {className,title,containerClass}= props;
    return (
      <div className={`base-page ${className}`}>
        <Container className={containerClass}>
          {title && (
            <div className="page-header">
              <h1 className="page-header-title">{title}</h1>
            </div>
          )}
          {props.children}
        </Container>
      </div>
    );
}
BasePage.defaultProps={
    className:'',
    containerClass:''
}
