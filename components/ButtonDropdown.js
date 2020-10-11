import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import React, { Component } from 'react'

export default class PortButtonDropDown extends Component {
  state= { dropdownOpen :false }

  toggle = () => this.setState({ dropdownOpen:!this.state.dropdownOpen });
  renderMenu(items) {
    //debugger;
    //console.log(items);
    return(
      <DropdownMenu>
        {
          items.map((item, index) =>  (
            
            <DropdownItem key={index} {...item.handlers} >{item.text}</DropdownItem>
          ))
        }
      </DropdownMenu> 
    )
    
  } 
  render() {
    const {item}=this.props;
    return (
      <Dropdown className="btn-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret size="sm"></DropdownToggle>
     {this.renderMenu(item)}
    </Dropdown>
    )
  }
}

