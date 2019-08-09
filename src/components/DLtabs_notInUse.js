import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

export default class DLtabs extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.activeTab !== tab) { 
      this.setState({ activeTab: tab}); 
      console.log('The link was clicked.');
    }
  }
  
  newTab(tab) {
    return <NavItem><NavLink
      className={classnames({ active: this.state.activeTab === tab[0] })}
      onClick={() => { this.toggle(tab[0]); }}>
      {tab[1]}
    </NavLink></NavItem>
  }

  newPane(tab) {
    return <TabPane tabId={tab[0]}> 
      <Row> <Col sm={12}><Card body><CardText>
        <p/>
        {tab[2]}
      </CardText></Card></Col> </Row>
    </TabPane>
  }

  render() {
    return (
      <div>
      {/* Need props.tabinfo as an array where each element is a vector of [id,tabText,component] */}
        <Nav tabs fill>
          {this.props.tabinfo.map((tab) => this.newTab(tab))}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {this.props.tabinfo.map((tab) => this.newPane(tab))}
        <TabPane tabId="4">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
      </TabContent>
      </div>
    );
  }
}
