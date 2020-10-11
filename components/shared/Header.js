import React from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu} from 'reactstrap';

import auth0 from '../../services/auth0';
import ActiveLink from '../ActiveLink';



const BsNavLink = (props) => {
  const { route, title } = props;
  const className = props.className || "";

  return (
    <ActiveLink activeClassName="active" route={route}>
      <a className={`nav-link port-navbar-link ${className}`}> {title} </a>
    </ActiveLink>
  );
};

const Login = () =>{
return (
  <span onClick={auth0.login} className="nav-link port-navbar-link">
    Login
  </span>
);
}
  
  const Logout = () => {
    return (
      <span onClick={auth0.logout} className="nav-link port-navbar-link">
        Logout
      </span>
    );

}



export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  toggle=()=> {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  renderBlogMenu = () => {
    const { isSiteOwner } = this.props;

    if (isSiteOwner) {
      return (
        <Dropdown
          className="port-navbar-link port-dropdown-menu"
          nav
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
        >
          <DropdownToggle className="port-dropdown-toggle" nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blogs"
                title="Blogs"
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blog/new"
                title="Create a Blog"
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blog/dashboard"
                title="Blogs Dashboard"
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    return (
      <NavItem className="port-navbar-item">
        <BsNavLink route="/blogs" title="Blog" />
      </NavItem>
    )
  };
  toggleDropdown=()=> {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    // console.log(this.props);
    const { isAuthenticated, className } = this.props;
    const { isOpen } = this.state;

    const menuOpenClass = isOpen ? "menu-open" : "menu-close";
    return (
      <div>
       <Navbar className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`} color="transparent" dark expand="md">
          <NavbarBrand className="port-navbar-brand">Kalyan Singh</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/" title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/about" title="About" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/portfolios" title="Portfolio" />
              </NavItem>
              {this.renderBlogMenu()}
            
              {!isAuthenticated && (
                <NavItem className="port-navbar-item clickable">
                  <Login />
                </NavItem>
              )}
              {isAuthenticated && (
                <NavItem className="port-navbar-item clickable">
                  <Logout />
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}