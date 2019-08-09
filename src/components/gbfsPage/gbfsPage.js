import React, { Component } from 'react';
import ListAll from './listAll';
import DLnavbar from "../DLnavbar";

export default class GbfsPage extends Component {
  render() {
    return (
        <div>
			<DLnavbar {...this.props} />
			<ListAll/>
        </div>
    );
  }
}
