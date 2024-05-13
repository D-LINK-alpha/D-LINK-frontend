import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/homeIcon.svg';
import { ReactComponent as CommunityIcon } from '../../assets/communityIcon.svg';
import { ReactComponent as DrinkIcon } from '../../assets/drinkIcon.svg';
import { ReactComponent as MyPageIcon } from '../../assets/myPageIcon.svg';
import { ReactComponent as SettingIcon } from '../../assets/settingIcon.svg';

// import Home from '../../pages/OnboardingPage';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="absolute bottom-0 w-[100%]">
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
          // value="home"
          component={Link}
          to="/"
          icon={<HomeIcon />}
          sx={{ minWidth: 'unset', color: '#ffffff' }}
        />
        <BottomNavigationAction
          label="Community"
          value="community"
          component={Link}
          to="/community"
          icon={<CommunityIcon />}
          sx={{ minWidth: 'unset' }}
        />
        <BottomNavigationAction
          label="Main"
          value="main"
          component={Link}
          to="/landing"
          icon={<DrinkIcon />}
          sx={{ minWidth: 'unset' }}
        />
        <BottomNavigationAction
          label="MyPage"
          value="myPage"
          component={Link}
          to="/mypage"
          icon={<MyPageIcon />}
          sx={{ minWidth: 'unset' }}
        />
        <BottomNavigationAction
          label="Setting"
          value="setting"
          component={Link}
          to="/setting"
          icon={<SettingIcon />}
          sx={{ minWidth: 'unset' }}
        />
      </BottomNavigation>

      {/*<Routes>*/}
      {/*  <Route path="/home" element={<Home />} />*/}
      {/*  /!*<Route path="/community" element={<Community />} />*!/*/}
      {/*  /!*<Route path="/main" element={<Main />} />*!/*/}
      {/*  /!*<Route path="/myPage" element={<MyPage />} />*!/*/}
      {/*  /!*<Route path="/setting" element={<Setting />} />*!/*/}
      {/*</Routes>*/}
    </div>
  );
}
