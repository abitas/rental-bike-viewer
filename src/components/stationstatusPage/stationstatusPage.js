import React, { Component } from 'react';
import ListAll from './listAll';
import DLnavbar from "../DLnavbar";

export default class StationstatusPage extends Component {
  render() {
    return (
        <div>
			<DLnavbar {...this.props} />
			<ListAll/>
        </div>
    );
  }
}
