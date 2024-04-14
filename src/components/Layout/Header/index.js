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

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function Header({ title }) {
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#232322' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="main"
            aria-label="menu"
            sx={{ mr: 2 }}
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
