import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ReactComponent as AlarmIcon } from "../../../assets/alarm.svg";
import PropTypes from 'prop-types';

InfoBar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function InfoBar({name}) {
  return (
    <Box className="absolute w-[100%] top-0" >
      <AppBar position="static" sx={{ backgroundColor: '#232322' }} elevation={0}>
        <Toolbar>
          <IconButton
            edge="end"
            aria-label="account of current user"
            color="inherit"
          >
            <AccountCircle sx={{ width: 39, height: 39}}/>
          </IconButton>
          <Typography sx={{ fontSize: 16, paddingLeft: 2 }} noWrap component="div">
            Hello, {name}!
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
              <AlarmIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
}