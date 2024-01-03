import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import T1Icon from './T1Icon';
import T2Icon from './T2Icon';
import T3Icon from './T3Icon';
import T4Icon from './T4Icon';
import T5Icon from './T5Icon';
import T7Icon from './T7Icon';
import T8Icon from './T8Icon';
import T9Icon from './T9Icon';
import METROIcon from './METROIcon';
import BMTIcon from './BMTIcon';
import CCNIcon from './CCNIcon';
import HUNIcon from './HUNIcon';
import SCOIcon from './SCOIcon';
import SHLIcon from './SHLIcon';
import BUSIcon from './BUSIcon';
import TrainLinkIcon from './TrainLink';
import LightRailIcon from './LightRailIcon';
import { getConnectingPlatform } from './Firebase';
import { CarriageDiagram } from './CarriageDiagram';

const getPlatform = (leg, keyIndex, legs) => {
  if (leg.transportation.product.class === 1) {
    let getDestinationInNextLeg = true
    // get next leg
    let index = keyIndex;
    if (keyIndex + 1 < legs.length) {
      index += 1
      getDestinationInNextLeg = false
    }
    let platformOrigin = leg.destination.disassembledName.split(',')
    let platformRegex = /Platform \d+$/
    platformOrigin = platformOrigin[1]
    platformOrigin = platformOrigin.match(platformRegex)[0]
    return getNextLegPlatform(index, legs, platformOrigin, getDestinationInNextLeg).then((p) => {
      return p
    })
  }
  return null
}

const getNextLegPlatform = (index, legs, platformOrigin, getDestination) => {
  for (let i = 0; i < legs.length; i++) {
    if (i === index && legs[i].transportation.product.class !== 1 ) {
      return new Promise((resolve, reject) => {
        resolve(null)
      })
    }
    
    if (i === index) {      
      if (getDestination) {  
        let platformName = legs[i].destination.disassembledName.split(',')
        platformName = platformName[0]

        let platformRegex = /Platform \d+$/
        let platformString = legs[i].destination.disassembledName.match(platformRegex)[0]
        let platform = getConnectingPlatform(platformName, platformOrigin, platformString)
        return platform.then((p) => {
          return p
        })
      } else {
        let platformName = legs[i].origin.disassembledName.split(',')
        platformName = platformName[0]

        let platformRegex = /Platform \d+$/
        let platformString = legs[i].origin.disassembledName.match(platformRegex)[0]
        let platform = getConnectingPlatform(platformName, platformOrigin, platformString)
        return platform.then((p) => {
          return p
        })
      }
    }
  }

  return null
}

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Add leading zero to minutes if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Construct the formatted string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
}

const getDuration = (depart, arrive) => {
  let departTime = new Date(depart);
  let arriveTime = new Date(arrive);

  let duration = arriveTime.getTime() - departTime.getTime();
  duration = Math.floor(duration / 60000);

  if (duration >= 60) {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);

    const timeString = `${hours} hr ${minutes} min`;
    return timeString
  }
  return `${duration} min`
}

const DepartTime = styled('div')({
  paddingLeft: '16px',
  paddingTop: '10px',
  paddingBottom: '10px',
  fontWeight: 'bold',
  fontSize: '20px',
});

const OverviewTime = styled('div')({
  fontWeight: 'bold',
});

const ArriveTime = styled('div')({
  fontWeight: 'bold',
  fontSize: '20px',
  paddingLeft: '16px',
  paddingTop: '10px',
  paddingBottom: '10px',
});

const Duration = styled('div')({
  fontSize: '16px',
  paddingLeft: '16px',
  marginTop: '3px'
});

const Walk = styled('div')({
  fontSize: '16px',
  paddingLeft: '16px',
});

export const TripCard = ({ tripInfo }) => {
  const [state, setState] = React.useState(false);

  const departTime = formatTime(new Date(tripInfo.legs[0].origin.departureTimeEstimated))
  const arriveTime = formatTime(new Date(tripInfo.legs[tripInfo.legs.length - 1].destination.arrivalTimeEstimated))
  const duration = getDuration(tripInfo.legs[0].origin.departureTimeEstimated, tripInfo.legs[tripInfo.legs.length - 1].destination.arrivalTimeEstimated)
  const legs = tripInfo.legs.map((l, index) => <LegCard key={index} keyIndex={index} leg={l} legs={tripInfo.legs}></LegCard>)

  return (
    <Box sx={{ backgroundColor: 'rgb(227, 244, 255)', width: '100%', margin: '15px 0px 15px 0px' }}>
      <Box className="trip-overview" sx={{ display: 'flex', flexDirection: 'row' }}>
        <span className="mode-logo">
          {tripInfo.legs[0].transportation.disassembledName === 'T1' &&
            <T1Icon></T1Icon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'T2' &&
            <T2Icon></T2Icon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'T3' &&
            <T3Icon></T3Icon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'T4' &&
            <T4Icon></T4Icon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'T5' &&
            <T5Icon></T5Icon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'T7' &&
            <T7Icon></T7Icon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'T8' &&
            <T8Icon></T8Icon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'T9' &&
            <T9Icon></T9Icon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'BMT' &&
            <BMTIcon></BMTIcon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'CCN' &&
            <CCNIcon></CCNIcon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'HUN' &&
            <HUNIcon></HUNIcon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'SCO' &&
            <SCOIcon></SCOIcon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'SHL' &&
            <SHLIcon></SHLIcon>
          }
          {tripInfo.legs[0].transportation.disassembledName === 'M' &&
            <METROIcon></METROIcon>
          }
          {tripInfo.legs[0].transportation.product.class === 5 &&
            <BUSIcon></BUSIcon>
          }
          {tripInfo.legs[0].transportation.product.class === 4 &&
            <LightRailIcon></LightRailIcon>
          }
          {tripInfo.legs[0].transportation.operator.id === '711' && // trainlink
            <TrainLinkIcon></TrainLinkIcon>
          }
        </span>
        <span className="details" style={{ flexGrow: '1', marginLeft: '10px' }}>
          <OverviewTime>{departTime} - {arriveTime}</OverviewTime>
          <div>{duration}</div>
          <div>{tripInfo.legs[0].origin.disassembledName}</div>
          <div>{tripInfo.interchanges} interchanges</div>
        </span>
        <ExpandStopsButton onSelect={setState}></ExpandStopsButton>
      </Box>
      {state &&
        <Box>
          {legs}
        </Box>
      }
    </Box>
  )
}

export const ExpandStopsButton = ({ onSelect }) => {
  const [expandState, setExpandState] = React.useState(false)
  
  return (
    <>
    <Button variant="contained" onClick={() => {
      onSelect(!(expandState))
      setExpandState(!(expandState))
    }}>
      {expandState === true &&
        <ArrowDropUpIcon></ArrowDropUpIcon>
      }
      {expandState === false &&
        <ArrowDropDownIcon></ArrowDropDownIcon>
      }
    </Button>
    </>
  )
}

export const ShowLegStops = ({ leg }) => {
  const [showStops, setShowStops] = React.useState(false)
  let stops = leg.stopSequence.slice(1, -1).filter((s) => s.disassembledName.includes(','))
  if (leg.transportation.product.class === 4) { // light rail
    stops = leg.stopSequence.slice(1, -1).filter((s) => s.disassembledName)
  } else if (leg.transportation.product.class === 5) { //bus
    stops = leg.stopSequence.slice(1, -1).filter((s) => s.disassembledName)
  }
  const filteredStops = stops.map((s, index) => <li key={index}>{s.disassembledName}</li>)

  return (
    <>
      <Button sx={{ paddingLeft: '16px' }} onClick={() => {
        setShowStops(!(showStops))
      }}>
        {showStops === true && filteredStops.length !== 0 &&
          'Hide stops'
        }
        {showStops === false && filteredStops.length !== 0 &&
          'Show stops'
        }
      </Button>
      {filteredStops && showStops &&
        <ul>
          {filteredStops}
        </ul>
      }
    </>
  )
}

export const LegCard = ({ leg, keyIndex, legs }) => {
  const arriveTime = formatTime(new Date(leg.destination.arrivalTimeEstimated));
  const departTime = formatTime(new Date(leg.origin.departureTimeEstimated));
  const duration = getDuration(leg.origin.departureTimeEstimated, leg.destination.arrivalTimeEstimated)
  const [platform, setPlatform] = React.useState(null)


  React.useEffect(() => {
    let platformPromise = getPlatform(leg, keyIndex, legs)
    if (platformPromise !== null) {
      platformPromise.then((p) => {
        setPlatform(p)
      })
    }
  })


  return (
    <>
      {leg.transportation.product.name === 'footpath' && 'disassembledName' in leg.destination &&
        <Walk sx={{ paddingBottom: '15px' }}>Walk to {leg.destination.disassembledName}</Walk>
      }
      {leg.transportation.product.name === 'footpath' && !('disassembledName' in leg.destination) &&
        <Walk sx={{ paddingBottom: '15px' }}>Walk to {leg.destination.name}</Walk>
      }
      {leg.transportation.product.name !== 'footpath' &&
        <Box>
          <DepartTime>{departTime} {leg.origin.disassembledName}</DepartTime>
          <div style={{ paddingLeft: '16px' }}><span style={{ backgroundColor: 'rgb(50, 145, 168)', borderRadius: '5px', padding: '3px 5px 3px 5px' }}>
            {leg.transportation.number} - {leg.transportation.description}</span>
          </div>
          <Duration>Travel time: {duration}</Duration>
          {platform &&
            <div>
              <KeyboardBackspaceIcon fontSize='medium' sx={{ marginLeft: '26px' }}></KeyboardBackspaceIcon>
              <CarriageDiagram carriage={platform}></CarriageDiagram>
            </div>
          }
          <ShowLegStops leg={leg}></ShowLegStops>
          <ArriveTime>{arriveTime} {leg.destination.disassembledName}</ArriveTime>
        </Box>
      }
    </>
  )
}