import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

TextFields.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  textColor: PropTypes.string,
  labelColor: PropTypes.string,
};

export default function TextFields({ text, textColor, labelColor, className }) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label={text}
        variant="standard"
        className={className} // 기존 클래스 유지
        InputProps={{ style: { color: textColor || '#ffffff' } }}
        sx={{
          '& label': { color: labelColor || '#ffffff' }, // label 색상 변경
          '& css-1eed5fa-MuiInputBase-root-MuiInput-root': {
            border: 'red',
          }, // after 상태일 때 border 색상 투명으로 변경
          '& fieldset': { borderColor: 'white' }, // 항상 하얀색 border
        }}
      />
    </Box>
  );
}
