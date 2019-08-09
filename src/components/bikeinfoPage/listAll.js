import React, { Component } from 'react';
import {
    Table,
    Input,
	Form
  } from 'reactstrap';

export default class ListAll extends Component {
	emptyJsonObject = {"data": {"stations": []}};
	
    constructor(props) {
        super(props);
        this.state = {
						jsonObject : {"test" : ""},
						jsonObject2 : {"test" : ""},
						jsonStations : [],
						jsonStations2 : [],
						errorMessage : "",
						errorMessage2 : "",
						
						fetchOK : false,
						fetchStatus : 0,
						fetch2OK : false,
						fetch2Status : 0,
                     };
        this.updateList = this.updateList.bind(this);
    }  
    
	/**************************************** Functions for fetch, setState and format ********************************************************/
	
	/*-------------------------------Station status-------------------------------------*/

	setRequestState (result) {
			this.setState({fetchOK : result.ok});
			this.setState({fetchStatus : result.status});
	}
 
	setJsonState (JsonObj, errorMsg=null, consoleMsg=null) {
			this.setState({jsonObject : JsonObj})		
			this.setState({jsonStations : JsonObj.data.stations})		
			if (errorMsg) {this.setState({errorMessage : errorMsg })};
			if (consoleMsg) {console.log(consoleMsg)};		
	}
 
	cleanupJsonError (errorMsg=null, consoleMsg=null) {
		this.setJsonState (this.emptyJsonObject, errorMsg, consoleMsg) 
	}
	saveJsonData (JsonObj) {
		this.setJsonState (JsonObj, "") 
	}
	
	/*-------------------------------Station info-------------------------------------*/

	setRequestState2 (result) {
			this.setState({fetch2OK : result.ok});
			this.setState({fetch2Status : result.status});
	}
 
	setJsonState2 (JsonObj, errorMsg=null, consoleMsg=null) {
			this.setState({jsonObject2 : JsonObj})		
			this.setState({jsonStations2 : JsonObj.data.stations})		
			if (errorMsg) {this.setState({errorMessage2 : errorMsg })};
			if (consoleMsg) {console.log(consoleMsg)};		
	}
	cleanupJsonError2 (errorMsg=null, consoleMsg=null) {
		this.setJsonState2 (this.emptyJsonObject, errorMsg, consoleMsg) 
	}
	saveJsonData2 (JsonObj) {
		this.setJsonState2 (JsonObj, "") 
	}

	/*-------------------------------misc-------------------------------------*/

	outputBoolean(b) {
		switch ( b ) {
			case true : return "True";
			case false : return "False";
			default : return "Unknown";
		}
	}

	outputDatetime(unix_timestamp) {
		var date = new Date(unix_timestamp*1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	}
	
	getStationInfo(key, field) {
		let obj = this.state.jsonStations2.find(obj => obj.station_id == key);
		if (obj) return obj[field]; else return ("Station"+field+key);
	}

    updateList(event) {
       if(event){
            event.preventDefault();
        }   
		try {

			fetch("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")
			.then(result=>{
				this.setRequestState(result); 
				result.json()
				.then(JsonObj=>this.saveJsonData(JsonObj));
			})
			.catch(e=>this.cleanupJsonError("Fetch Station Status Error :" + e.name + " : " + e.message, "error catched in fetch"));

			fetch("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json")
			.then(result=>{
				this.setRequestState2(result); 
				result.json()
				.then(JsonObj=>this.saveJsonData2(JsonObj));
			})
			.catch(e=>this.cleanupJsonError("Fetch Station Info Error :" + e.name + " : " + e.message, "error catched in fetch"));

		} catch (e) {
			this.cleanupJsonError("Fetch error :" + e.name + " : " + e.message, "error catched in fetch ");
		}
    }

	/**************************************** React lifecycle Events *********************************************************/
	
    componentDidMount(){
        this.updateList(); 
		setInterval(this.updateList, 10000)
    }
	
    render() {
        return (
            <div>
                Sitat: "Hvordan du viser listen er helt opp til deg, men den må inneholde navnet på stativet, antall tilgjengelige låser og ledige sykler i øyeblikket"<br/>				
				Sitat: "Data oppdateres hvert 10. sekund."<br/>
                <Table>
                        <tr><td>Last update :</td><td>{this.outputDatetime(this.state.jsonObject.last_updated) + " / " 
						+ this.outputBoolean(this.state.fetchOK)+ "  " + this.state.errorMessage + " / "
						+ this.outputBoolean(this.state.fetch2OK)+ "  " + this.state.errorMessage2} </td></tr>
				</Table>
				<br/>
                <Table>
                    <tbody>
                        <tr><th width="200px">Id </th><th width="200px">Stasjon</th><th width="200px">Adresse</th><th width="200px">Sykler tilgjengelig</th><th width="200px">Ledige plasser</th></tr>

						{this.state.jsonStations.map(station=> <tr key={station.station_id}><td>{station.station_id}</td>
						<td>{this.getStationInfo(station.station_id,"name")}</td><td>{this.getStationInfo(station.station_id,"address")}</td>
						<td>{station.num_bikes_available}</td><td>{station.num_docks_available}</td></tr>)}
                    </tbody>.
                </Table>
            </div>
        );
  }
} 