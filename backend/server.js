import express from 'express';
const app = express();
const port = 4000;

// test key
let key = 'fake api key here'

app.get('/stopfinder', async (req, res) => {
  let stop = req.query.station;
  let stopString = stop.replace(" ", "%20");
  let url = 'https://api.transport.nsw.gov.au/v1/tp/stop_finder?outputFormat=rapidJSON&type_sf=stop&coordOutputFormat=EPSG%3A4326&TfNSWSF=true&version=10.2.1.42' + '&name_sf=' + stopString;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': key,
    }
  })

  const data = await response.json();
  const filteredList = data.locations.filter((l) => "modes" in l && l.modes.includes(1))
  return res.status(200).json(filteredList)
})

app.get('/trip', async (req, res) => {
  //let { departDate, departTime, startStationId, endStationId, depArrMacro } = req.body;
  let depArrMacro = req.query.depArrMacro;
  let itdDate = req.query.itdDate;
  let itdTime = req.query.itdTime;
  let startStation = req.query.startStation;
  let endStation = req.query.endStation;

  let url = '';
  if (itdDate === '' && itdTime === '') {
    url = 'https://api.transport.nsw.gov.au/v1/tp/trip?outputFormat=rapidJSON&coordOutputFormat=EPSG%3A4326&depArrMacro=' + depArrMacro + '&type_origin=any&name_origin=' + startStation + '&type_destination=any&name_destination=' + endStation + '&TfNSWTR=true&version=10.2.1.42&itOptionsActive=1&calcNumberOfTrips=4'
  } else {
    url = 'https://api.transport.nsw.gov.au/v1/tp/trip?outputFormat=rapidJSON&coordOutputFormat=EPSG%3A4326&depArrMacro=' + depArrMacro + '&type_origin=any&name_origin=' + startStation + '&type_destination=any&name_destination=' + endStation + '&itdDate=' + itdDate + '&itdTime=' + itdTime + '&TfNSWTR=true&version=10.2.1.42&itOptionsActive=1&calcNumberOfTrips=4';
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': key,
    }
  })

  const data = await response.json()
  console.log(data)
  return res.status(200).json(data)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`));