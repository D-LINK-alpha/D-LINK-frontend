import * as React from 'react';
import { styled } from '@mui/material/styles';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
import MuiButton from '../../components/Button/muiButton';
import { ReactComponent as OnboardingImage } from '../../assets/Group 36.svg';

const OnboardingPage = () => {
  return (
    <div>
      <div className="flex justify-center pt-11 px-6">
        <OnboardingImage />
      </div>
      <div className="px-8 pt-11">
        <h1 className="text-amber-50 text-2xl text-left font-semibold">
          나도 몰랐던 취향의 발견
        </h1>
        <p className="text-amber-50 text-sm text-left pt-5 font-medium">
          음료 선택이 고민될 때, <br />
          가장 섬세한 음료 추천 인공지능 DLNK 가 당신에게 <br />딱 맞는 메뉴를
          추천해드릴게요.
        </p>
      </div>
      <div className="flex justify-center pt-8">
        {/*<FormGroup>*/}
        {/*  <FormControlLabel*/}
        {/*    className="m-0"*/}
        {/*    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}*/}
        {/*    label=""*/}
        {/*  />*/}
        {/*</FormGroup>*/}
        <div className="flex justify-center pt-40">
          <MuiButton
            text="계속"
            className="w-44 h-12 rounded-3xl bg-[#3FCC7C] text-lg"
          />
        </div>
      </div>
      <div className="pt-5 text-gray-color">
        <p>새로운 계정 만들기</p>
      </div>
    </div>
  );
};

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default OnboardingPage;
