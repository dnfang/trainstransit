import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export const TimeFilterForm = ({ onSelectTimeOption, onSelectDate, onSelectTime }) => {
  const [timeFilter, setTimeFilter] = React.useState('now')
  const [dateValue, setDateValue] = React.useState(null);
  const [timeValue, setTimeValue] = React.useState(null);
  
  return (
    <>
      <FormControl sx={{ marginBottom: '15px' }}>
        <InputLabel>Time</InputLabel>
        <Select
          value={timeFilter}
          label="Time"
          onChange={(event) => {
            setTimeFilter(event.target.value);
            onSelectTimeOption(event.target.value);
          }}
        >
          <MenuItem value={'now'}>Now</MenuItem>
          <MenuItem value={'arr'}>Arrive By</MenuItem>
          <MenuItem value={'dep'}>Depart At</MenuItem>
        </Select>
      </FormControl>

      {timeFilter === 'arr' &&
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker disablePast label="Choose date" value={dateValue} onChange={(date) => {
              setDateValue(date);
              onSelectDate(date);
            }}
            slotProps={{ textField: { disabled: true } }}
            ></DesktopDatePicker>
            <DesktopTimePicker ampm={false} label="Choose time" value={timeValue} onChange={(time) => {
              setTimeValue(time);
              onSelectTime(time);
            }}
            slotProps={{ textField: { disabled: true } }}
            sx={{ marginBottom: '15px' }}
            ></DesktopTimePicker>
          </LocalizationProvider>
      }

      {timeFilter === 'dep' &&
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker disablePast label="Choose date" value={dateValue} onChange={(date) => {
            setDateValue(date);
            onSelectDate(date);
          }}
          slotProps={{ textField: { disabled: true } }}
          ></DesktopDatePicker>
          <DesktopTimePicker ampm={false} label="Choose time" value={timeValue} onChange={(time) => {
            setTimeValue(time);
            onSelectTime(time);
          }}
          slotProps={{ textField: { disabled: true } }}
          sx={{ marginBottom: '15px' }}
          ></DesktopTimePicker>
        </LocalizationProvider>
      }
    </>
  )
}