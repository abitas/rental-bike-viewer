import React, { Component } from 'react';
import {
    Table,
    Input,
	Form
  } from 'reactstrap';

export default class ListAll extends Component {
	emptyJsonString = '{"data": {"feeds": []}}';
	emptyJsonObject = {"data": {"feeds": []}};
	testJsonString = '{"last_updated": 1565338240, "ttl": 10, "data": {"nb": {"feeds": [{"name": "system_information", "url": "http://gbfs.urbansharing.com/oslobysykkel.no/system_information.json"}, {"name": "station_information", "url": "http://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"}, {"name": "station_status", "url": "http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"}, {"name": "system_metrics", "url": "http://gbfs.urbansharing.com/oslobysykkel.no/system_metrics.json"}]}}}';
	
    constructor(props) {
        super(props);
        this.state = {
                        jsonString : "",
						jsonObject : {"test" : ""},
						jsonFeeds : [],
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
			this.setState({jsonFeeds : JsonObj.data.nb.feeds})		
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
			fetch("https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json")
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
                                <Input  type="submit" value="Oppdater Listen" className ="btn btn-primary"/>
                            </Form>
                    </div>
                </div>
                <br/>		
                <Table>
                    <tbody>
					    <tr><th width="200px">Navn</th><th width="200px">Url</th></tr>
						{this.state.jsonFeeds.map(feed=> <tr key={feed.name}><td>{feed.name}</td><td>{feed.url}</td></tr>)}
                    </tbody>.
                </Table>
            </div>
        );
  }
} 