This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The project is stored in https://github.com/abitas/rental-bike-viewer.git

## Short description

Oslo Bysykkel har et åpent API som viser plasseringer og tilstand for sine sykkelstativer

https://oslobysykkel.no/apne-data/sanntid
https://oslobysykkel.no/slik-virker-det 

Denne lille demo-applikasjonen viser data fra dette API'et og bruker følgende url'er
https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json
https://gbfs.urbansharing.com/oslobysykkel.no/system_information.json
https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json
https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json

Applikasjonen viser en liste over de ulike stasjonene, og hvor mange tilgjengelige låser og ledige sykler som er på dem i øyeblikket. 
Applikasjonen viser en tabell med navnet på stativet, adresse, antall tilgjengelige låser og antall ledige sykler

## Feilhåndtering


## Oppstart av systemet

Du trenger installert node.js, npm og react på systemet. Det er også brukt react-router-dom og reactstrap. Reactstrap does not include Bootstrap CSS so this needs to be installed as well:

https://nodejs.org/en/download/

npm install --save bootstrap
npm install --save reactstrap react react-dom
