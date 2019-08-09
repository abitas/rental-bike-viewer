import React, { Component } from 'react';
import ListAll from './listAll';
import DLnavbar from "../DLnavbar";

export default class SysteminformationPage extends Component {
  render() {
    return (
        <div>
			<DLnavbar {...this.props} />
			<ListAll/>
        </div>
    );
  }
}
