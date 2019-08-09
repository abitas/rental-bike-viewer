import React, { Component } from 'react';

import {
    Table,
    Input,
	Form
  } from 'reactstrap';

export default class ListAll extends Component {
	emptyJsonString = '{"data": {}}';
	emptyJsonObject = {"data": {}};
	testJsonString = '{"last_updated" : 1565334858, "ttl" : 10, "data" : {"system_id" : "oslobysykkel", "language" : "nb", "name" : "Oslo Bysykkel", "operator" : "UIP Oslo Bysykkel AS", "timezone" : "Europe/Oslo", "phone_number" : "+4791589700", "email" : "post@oslobysykkel.no"}}'; 
	
    constructor(props) {
        super(props);
        this.state = {
                        jsonString : "",
						jsonObject : {"test" : ""},
						jsonData : [],
						errorMessage : "",
						
						fetchOK : false,
						fetchStatus : 0,
						fetchRespType : false,
						fetchContType : 0,
						fetchContLength : 0
                     };
        this.updateList = this.updateList.bind(this);
    }  
    
	/**************************************** Functions for fetch, setState and format ********************************************************/
	
	setRequestState (result) {
			this.setState({fetchOK : result.ok});
			this.setState({fetchStatus : result.status});
			this.setState({fetchRespType : result.type});
			this.setState({fetchContType : result.headers.get('Content-Type')});
			this.setState({fetchContLength : result.headers.get('Content-Length')});
	}
 
	setJsonState (JsonObj,JsonStr, errorMsg=null, consoleMsg=null) {
			this.setState({jsonObject : JsonObj})		
			this.setState({jsonData : JsonObj.data})		
			this.setState({jsonString : JsonStr})
			if (errorMsg) {this.setState({errorMessage : errorMsg })};
			if (consoleMsg) {console.log(consoleMsg)};		
	}
 
	cleanupJsonError (errorMsg=null, consoleMsg=null) {
		this.setJsonState (this.emptyJsonObject,this.emptyJsonString, errorMsg, consoleMsg) 
	}
	saveJsonData (JsonObj,JsonStr) {
		this.setJsonState (JsonObj,JsonStr, "", "JSON found : " + JsonStr) 
	}

	outputBoolean(b) {
		switch ( b ) {
			case true : return "True";
			case false : return "False";
			default : return "Unknown";
		}
	}

    updateList(event) {
       if(event){
            event.preventDefault();
        }   
		try {
			fetch("https://gbfs.urbansharing.com/oslobysykkel.no/system_information.json")
			.then(result=>{
				this.setRequestState(result); 
				result.json()
				.then(JsonObj=>this.saveJsonData(JsonObj,JSON.stringify(JsonObj)));
			})
			.catch(e=>this.cleanupJsonError("Fetch/Stringify error :" + e.name + " : " + e.message, "error catched in fetch"));
		} catch (e) {
			this.cleanupJsonError("Fetch error :" + e.name + " : " + e.message, "error catched in fetch ");
		}
    }

	/**************************************** React lifecycle Events *********************************************************/
	
    componentDidMount(){
        this.updateList(); 
    }

    render() {
        return (
            <div>
                <Table>
                        <tr><td>Last update :	</td><td>	{this.state.jsonObject.last_updated} </td></tr>	 
                        <tr><td>Response-OK :	</td><td>	{this.outputBoolean(this.state.fetchOK)} </td></tr>	 
                        <tr><td>Status :		</td><td>	{this.state.fetchStatus} </td></tr>	 
                        <tr><td>Response type :	</td><td>	{this.state.fetchRespType} </td></tr>	 
                        <tr><td>Content type :	</td><td>	{this.state.fetchContType} </td></tr>	 
                        <tr><td>Content length :</td><td>	{this.state.fetchContLength} </td></tr>	 
                        <tr><td>Error :			</td><td>	{this.state.errorMessage} </td></tr>
				</Table>
				<br/>
                <div class="row">
                    <div className='form-group' class="span12">
                            <Form onSubmit={this.updateList}>
                                <Input  type="submit" value="Oppdater Systeminformasjon" className ="btn btn-primary"/>
                            </Form>
                    </div>
                </div>
                <br/>		
                <Table>
                        <tr><td>System Id :		</td><td>	{this.state.jsonData["system_id"]} </td></tr>	 
                        <tr><td>Språk :			</td><td>	{this.state.jsonData["language"]} </td></tr>	 
                        <tr><td>System Navn :	</td><td>	{this.state.jsonData["name"]} </td></tr>	 
                        <tr><td>Operatør :		</td><td>	{this.state.jsonData["operator"]} </td></tr>	 
                        <tr><td>Tidssone :		</td><td>	{this.state.jsonData["timezone"]} </td></tr>	 
                        <tr><td>Telefon :		</td><td>	{this.state.jsonData["phone_number"]} </td></tr>	 
                        <tr><td>Epost :		</td><td>	{this.state.jsonData["email"]} </td></tr>	 
                </Table>
            </div>
        );
  }
} 