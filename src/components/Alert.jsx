import Alert from '@mui/material/Alert';

export const AlertComponent = ({ text }) => {
  return (
    <Alert severity="error" sx={{marginBottom: '15px'}}>{text}</Alert>
  );
}