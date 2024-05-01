import React, { useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactComponent as FavoriteIcon } from '../../assets/favoriteIcon.svg';
import Divider from '@mui/material/Divider';

const RecommendingPage = () => {
  const [favoriteIconStyle, setFavoriteIconStyle] = useState(false); //즐겨찾기 버튼 관리
  const handleFavButtonClick = () => {
    //즐겨찾기 버튼 온클릭핸들러
    setFavoriteIconStyle(!favoriteIconStyle);
  };
  return (
    <div>
      <FavoriteIcon
        fill={favoriteIconStyle ? '#3FCC7C' : '#474747'}
        onClick={handleFavButtonClick}
      />
      {/* <h2>{props.menu} 은</h2>
      <p>쿠민님의 취향과 {props.similarity} 일치해요</p> */}
      <Divider
        className="w-64"
        sx={{ borderStyle: 'dashed', borderColor: '#EDEDED' }}
      />
      <Box sx={{ borderRadius: '22px' }}>
        <Button
          variant="contained"
          size="medium"
          style={{ backgroundColor: '#3FCC7C', borderRadius: '22px' }}
        >
          이걸로 할래요
        </Button>
        <Button
          variant="contained"
          size="medium"
          style={{ backgroundColor: '#474747', borderRadius: '22px' }}
        >
          다시 추천 받을래요
        </Button>
      </Box>
    </div>
  );
};

export default RecommendingPage;
