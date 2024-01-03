import React from 'react';
import { Navbar } from '../components/Navbar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AutoCompleteStation } from '../components/AutoCompleteStation';
import { TimeFilterForm } from '../components/TimeFilterForm';
import { TripCard } from '../components/TripCard';
import { AlertComponent } from '../components/Alert';
import { styled } from '@mui/system';

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

const fetchTrips = async (depArrMacro, itdDate, itdTime, startStation, endStation) => {
  const response = await fetch('/trip?depArrMacro=' + depArrMacro + '&itdDate=' + itdDate + '&itdTime=' + itdTime + '&startStation=' + startStation + '&endStation=' + endStation)

  return await response.json()
}

const Footer = styled('div')({
  height: '30px',
  flexShrink: '0',
  backgroundColor: 'black',
  width: '100%',
});

const FooterText = styled('span')({
  marginLeft: '16px',
  color: 'white',
  fontSize: '12px'
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh'
});

export const Home = () => {
  const [startStationId, setStartStationId] = React.useState(null);
  const [endStationId, setEndStationId] = React.useState(null);
  const [timeFilter, setTimeFilter] = React.useState('now');
  const [dateValue, setDateValue] = React.useState(null);
  const [timeValue, setTimeValue] = React.useState(null);
  const [trips, setTrips] = React.useState(null);
  const [error, setError] = React.useState(null);
  
  return (
    <>
    <Container>
      <Navbar></Navbar>
      <Box sx={{ backgroundColor: 'white', width: '80%', margin: '5px auto auto auto', paddingTop: '10px'  }}>
        <AutoCompleteStation onSelect={setStartStationId} text={'Starting station'}></AutoCompleteStation>
        {error === 'Starting station not set' &&
          <AlertComponent text={'Starting station not set'}></AlertComponent>
        }
        <AutoCompleteStation onSelect={setEndStationId} text={'Destination station'}></AutoCompleteStation>
        {error === 'Destination station not set' &&
          <AlertComponent text={'Destination station not set'}></AlertComponent>
        }

      <div>
        <TimeFilterForm onSelectTimeOption={setTimeFilter} onSelectDate={setDateValue} onSelectTime={setTimeValue}></TimeFilterForm>
        {error === 'Date not chosen' &&
          <AlertComponent text={'Date not chosen'}></AlertComponent>
        }
        {error === 'Time not chosen' &&
          <AlertComponent text={'Time not chosen'}></AlertComponent>
        }
      </div>
      <Button variant="contained" sx={{ 'marginTop': '0px' }} onClick={() => {
          // depArrMacro, itdDate, itdTime, startStation, endStation)
          if (startStationId === null) {
            setError('Starting station not set')
            setTrips(null)
            return
          } else if (endStationId === null) {
            setError('Destination station not set')
            setTrips(null)
            return
          } else if (timeFilter !== 'now' && dateValue === null) {
            setError('Date not chosen')
            setTrips(null)
            return
          } else if (timeFilter !== 'now' && timeValue === null) {
            setError('Time not chosen')
            setTrips(null)
            return
          }

          setError(null)


          if (timeFilter === 'now') {
            let results = fetchTrips(timeFilter, '', '', startStationId, endStationId)
            results.then((r) => {
              const trips = r.journeys.filter((j) => j.isAdditional === false && j.legs[0].transportation.product.name !== 'footpath' && j.legs[0].transportation.product.class !== 10)
              console.log(trips)
              const listTrips = trips.map((t, index) => <TripCard key={index} tripInfo={t}></TripCard>)
              setTrips(listTrips)
            })
          } else {
            let hour =  new Date(timeValue).getHours();
            hour = ("0" + hour).slice(-2);

            let minute = new Date(timeValue).getMinutes();
            minute = ("0" + minute).slice(-2);

            let timeString = hour + minute
            let results = fetchTrips(timeFilter, formatDateToYYYYMMDD(new Date(dateValue)), timeString, startStationId, endStationId)
            results.then((r) => {
              const trips = r.journeys.filter((j) => j.isAdditional === false && j.legs[0].transportation.product.name !== 'footpath' && j.legs[0].transportation.product.class !== 10)
              console.log(trips)
              const listTrips = trips.map((t, index) => <TripCard key={index} tripInfo={t}></TripCard>)
              setTrips(listTrips)
            })
          }
      }}>Go</Button>
      </Box>
      {trips &&
        <Box sx={{backgroundColor: 'white', width: '80%', margin: '15px auto auto auto' }}>{trips}</Box>
      }
      <Footer>
        <FooterText>Trip information sourced from Transport for NSW</FooterText>
      </Footer>
      </Container>
    </>
  )
}