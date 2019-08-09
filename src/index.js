import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {Route, BrowserRouter} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
//import 'bootstrap/dist/css/bootstrap.css';

import BikeinfoPage from "./components/bikeinfoPage/bikeinfoPage";
import GbfsPage from "./components/gbfsPage/gbfsPage";
import SysteminformationPage from "./components/systeminformationPage/systeminformationPage";
import StationinformationPage from "./components/stationinformationPage/stationinformationPage";
import StationstatusPage from "./components/stationstatusPage/stationstatusPage";

const navbarItems = [
  ["SykkelInfo","/bikeinfo"],
  ["GBFS","/gbfs"],
  ["System","/systeminformation"],
  ["Stasjon","/stationinformation"],
  ["Status","/stationstatus"]]

const urlPrefix= "https://gbfs.urbansharing.com/oslobysykkel.no/";

ReactDOM.render(
    <BrowserRouter>
      <div class="container">
		<table  id="topbar">
		<tr><td><h3>OsloSykkel Demo</h3></td></tr>
		</table>
        <div className="content">
          <Route exact path="/" component={() => <BikeinfoPage infotype="Sykkel Info" avatar="sykkel5.jpg" infoURL={urlPrefix} navbarItems={navbarItems}/>}/>
          <Route path="/bikeinfo" component={() => <BikeinfoPage infotype="Sykkel Info" avatar="sykkel1.jpg" infoURL={urlPrefix} navbarItems={navbarItems} />}/>
          <Route path="/gbfs" component={() => <GbfsPage infotype="GBFS" avatar="sykkel2.jpg" infoURL={urlPrefix} navbarItems={navbarItems} />}/>
          <Route path="/systeminformation" component={() => <SysteminformationPage infotype="System Info" avatar="sykkel3.jpg" infoURL={urlPrefix} navbarItems={navbarItems} />}/>
          <Route path="/stationinformation" component={() => <StationinformationPage infotype="Sykkelstasjon Info" avatar="sykkel4.jpg" infoURL={urlPrefix} navbarItems={navbarItems} />}/>
          <Route path="/stationstatus" component={() => <StationstatusPage infotype="Sykkelstasjon Status Info" avatar="sykkel5.jpg" infoURL={urlPrefix} navbarItems={navbarItems} />}/>
        </div>
      </div>
    </BrowserRouter>
    , 
    document.getElementById('root')
  );
  
serviceWorker.register();