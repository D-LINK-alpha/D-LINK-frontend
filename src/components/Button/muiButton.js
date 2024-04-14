import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

// MuiButton 컴포넌트의 propTypes 설정
MuiButton.propTypes = {
  text: PropTypes.string.isRequired,
};

// MuiButton 컴포넌트 선언
export default function MuiButton({ text }) {
  // text를 props로 전달받음
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">{text}</Button> {/* 전달받은 text를 사용 */}
    </Stack>
  );
}
