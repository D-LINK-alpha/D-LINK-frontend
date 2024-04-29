import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

TextFields.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string, // CSS 클래스 prop 추가
  textColor: PropTypes.string, // 텍스트 색상 prop 추가
};

export default function TextFields({ text, className, textColor }) {
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
        InputProps={{ style: { color: textColor } }}
      />
    </Box>
  );
}
