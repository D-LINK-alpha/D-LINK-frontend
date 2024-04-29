import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ReactComponent as HomeIcon } from '../../../assets/homeIcon.svg';
import { ReactComponent as CommunityIcon } from '../../../assets/communityIcon.svg';
import { ReactComponent as DrinkIcon } from '../../../assets/drinkIcon.svg';
import { ReactComponent as MyPageIcon } from '../../../assets/myPageIcon.svg';
import { ReactComponent as SettingIcon } from '../../../assets/settingIcon.svg';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      sx={{
        backgroundColor: '#232322',
        color: '#ffffff',
        height: '83px',
        width: '100%',
        '& .MuiBottomNavigationAction-label': {
          color: '#ffffff',
          fontSize: '7px !important',
        },
      }}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        sx={{ minWidth: 'unset', color: '#ffffff' }}
      />
      <BottomNavigationAction
        label="Community"
        value="community"
        icon={<CommunityIcon />}
        sx={{ minWidth: 'unset' }}
      />
      <BottomNavigationAction
        label="Main"
        value="main"
        icon={<DrinkIcon />}
        sx={{ minWidth: 'unset' }}
      />
      <BottomNavigationAction
        label="MyPage"
        value="myPage"
        icon={<MyPageIcon />}
        sx={{ minWidth: 'unset' }}
      />
      <BottomNavigationAction
        label="Setting"
        value="setting"
        icon={<SettingIcon />}
        sx={{ minWidth: 'unset' }}
      />
    </BottomNavigation>
  );
}
