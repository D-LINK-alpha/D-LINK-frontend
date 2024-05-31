import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { ReactComponent as BackIcon } from '../../../assets/back.svg';
import { ReactComponent as AlarmIcon } from '../../../assets/alarm.svg';
import { useNavigate } from 'react-router-dom';

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function Header({ title }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 화면으로 이동
  };

  return (
    <Box className="absolute top-0 w-[100%]">
      <AppBar
        position="static"
        sx={{ backgroundColor: '#232322', boxShadow: 'none', height: '75px' }}
      >
        <Toolbar sx={{ height: '75px' }}>
          <IconButton
            size="large"
            edge="start"
            color="main"
            aria-label="menu"
            sx={{ mr: 2, visibility: title === 'Get Your DLNK !' ? 'hidden' : 'visible' }}
            onClick={goBack} // 클릭 시 뒤로가기 함수 실행
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button>
            <AlarmIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
