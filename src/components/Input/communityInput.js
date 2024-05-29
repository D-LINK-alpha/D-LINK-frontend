import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

CommunityInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  borderRadius: PropTypes.number,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const BootstrapInput = styled(InputBase)(({ theme, borderRadius }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    fontSize: 18,
  },

  '& .MuiInputBase-input': {
    borderRadius: borderRadius,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    fontSize: 14,
    width: '304px',
    padding: '10px 12px',
    color: 'inherit',
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
      borderColor: 'inherit',
      color: 'black', // Set the desired focus color for input text
    },
  },
}));

function CommunityInput({
  label,
  placeholder,
  multiline,
  rows,
  borderRadius,
  value,
  onChange,
}) {
  return (
    <FormControl variant="standard">
      <InputLabel
        shrink
        htmlFor="bootstrap-input"
        sx={{ color: '#fff', fontSize: '18px' }}
      >
        {label}
      </InputLabel>
      <BootstrapInput
        placeholder={placeholder}
        id="bootstrap-input"
        multiline={multiline}
        rows={rows}
        borderRadius={borderRadius}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
}

export default CommunityInput;
