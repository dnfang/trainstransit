import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const fetchStations = async (stationString) => {
  const response = await fetch('/stopfinder?station=' + stationString)

  return await response.json()
}

export const AutoCompleteStation = ({ onSelect, text }) => {
  const [stationName, setStationName] = React.useState(null);
  const [stationList, setStationList] = React.useState([]);
  
  return (
    <Autocomplete
      disablePortal
      options={stationList}
      sx={{ width: 300, marginBottom: '20px' }}
      value={stationName}
      onChange={(event, value) => {
        if (!value) {
          setStationName(null);
          onSelect(null);
          setStationList([]);
          return
        }
        setStationName(value);
        onSelect(value.id);
        setStationList([]);
      }}
      onInputChange={(event, value) => {
        let stations = fetchStations(value);
        stations.then((r) => {
          let tempStations = [];
          r.forEach((s) => {
            let obj = {};
            obj['id'] = s.id;
            obj['label'] = s.disassembledName;
            tempStations.push(obj);
          })
          setStationList(tempStations)
        })
      }}
      renderInput={(params) => <TextBox params={params} labelString={text}></TextBox>}
    ></Autocomplete>
  )
}

export const TextBox = ({ params, labelString }) => {
  return (
    <TextField {...params} label={labelString}></TextField>
  )
}