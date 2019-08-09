import React, { Component } from "react";
import {
  Collapse,
  Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink,
} from 'reactstrap';

class DLnavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return (
      <div class="container">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"><h3><img src={this.props.avatar} alt="image not found" height="40"/> {this.props.infotype}</h3></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.navbarItems ? this.props.navbarItems.map(function(item){
                return <NavItem><NavLink href={item[1]}>{item[0]}</NavLink></NavItem>
              }) : null} 
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
     
export default DLnavbar;