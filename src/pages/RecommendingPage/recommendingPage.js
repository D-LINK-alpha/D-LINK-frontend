import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactComponent as FavoriteIcon } from '../../assets/favoriteIcon.svg';
import Divider from '@mui/material/Divider';
import { useLocation,useNavigate} from 'react-router-dom';
import {ReactComponent as DropDownIcon} from '../../assets/dropDownIcon.svg';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import { useCookies } from 'react-cookie';
import { useRecoilValue} from 'recoil';
import { userState} from '../../recoil/userState';
import axios from 'axios';


const RecommendingPage = () => {
  const location = useLocation();
  const clickedCardData = location.state.cardData;//클릭된 카드 데이터값 가져옴
  const [favoriteIconStyle, setFavoriteIconStyle] = useState(false); //즐겨찾기 버튼 관리
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [cookies] = useCookies(['token']);
  const [hideContents, setHideContents] = useState(false);
  let src = clickedCardData.photo;
  const nickname = useRecoilValue(userState).nickname;
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state.from === '/main' || location.state.from === '/history') {
      setHideContents(true);
    }
  }, [location]);

  let month, time;
  const today = new Date();
  if ((today.getMonth() + 1) === 1 || (today.getMonth() + 1) === 12 || (today.getMonth() + 1) === 2) {
    month = "입김이 나오는 겨울";
  }
  else if ((today.getMonth() + 1) === 3 || (today.getMonth() + 1) === 4 || (today.getMonth() + 1) === 5) {
    month = "따뜻한 봄";
  }
  else if ((today.getMonth() + 1) === 6 || (today.getMonth() + 1) === 7 || (today.getMonth() + 1) === 8) {
    month = "더운 여름";
  }
  else {
    month = "쌀쌀한 가을";
  }

  if (today.getHours() === 7 || today.getHours() === 8 || today.getHours() === 9 || today.getHours() === 10) {
    time = "아침";
  }
  else if (today.getHours() === 11 || today.getHours() === 12 || today.getHours() === 13 || today.getHours() === 14 || today.getHours() === 15 || today.getHours() === 16) {
    time = "낮";
  }
  else if (today.getHours() === 17 || today.getHours() === 18 || today.getHours() === 19 || today.getHours() === 20 || today.getHours() === 21 || today.getHours() === 22) {
    time = "저녁";
  }
  else {
    time = "새벽";
  }


  const recommend = async () => {
    const token = cookies.token;
    try{
      const res = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/api/history/recommend`,
        {
          beverageId: clickedCardData.beverageId,
          similarity: clickedCardData.similarity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if(res.data.msg === '이걸로 할래요 성공')
        console.log('recommend res:', res);
        navigate('/map', {
        state: { placeName: clickedCardData.cafe },
      })
    }catch (error){
      console.error('recommend error!!', error);
    }
  };

  const like = async () => {
    const token = cookies.token;
    try{
      const res = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/api/history/like-main`,
        {
          beverageId: clickedCardData.beverageId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if(res.data.msg === 'success')
        console.log(clickedCardData.beverageId);
        console.log('like res:', res);
    }catch (error){
      console.error('like error!!', error);
    }
  };

  const handleFavButtonClick = () => {
    //즐겨찾기 버튼 온클릭핸들러
    setFavoriteIconStyle(!favoriteIconStyle);
    like();
  };
  const handledDropdownClick = () => {
    setIsDropdownClicked(!isDropdownClicked);
  }
  const handleReStartButtonClicked = () => {
    navigate('/prompt');
  };


  return (
    <>
      <Header title="Recommendation" />
      <div className="flex flex-col justify-items-start px-[23px]  h-screen py-[85px]">
        <div className="overflow-y-scroll">
          <div className='flex justify-center mb-6 w-full h-[244px]'>
            <img src={src} alt="음료 이미지" className='rounded-[34px] w-[329px] object-cover border border-neutral-400 ' />
          </div>
          <div className="grid grid-cols-2 justify-items-center items-center">
            <div className="text-white text-lg font-bold leading-normal mr-3">{month} {time},</div>
            {!hideContents && (
              <div className="flex justify-self-end mr-10">
                <FavoriteIcon
                  fill={favoriteIconStyle ? '#3FCC7C' : '#474747'}
                  onClick={handleFavButtonClick}
                />
              </div>
            )}
          </div>
          <br />
          <div className='grid justify-items-start'>
            <span className="text-white text-lg font-bold leading-normal ml-5">{clickedCardData.name}
              <span className="text-white text-lg font-normal leading-normal"> 은(는)</span>
            </span>
            <span className="text-white text-lg font-normal leading-normal ml-5 ">{nickname}님의 취향과
              <span className="text-white text-lg font-bold leading-normal"> {clickedCardData.similarity}% </span>
              일치해요.</span>
          </div>
          <br />

          <div className="flex flex-col ml-8 gap-y-3.5 ">
            <div className="w-52 h-8 bg-neutral-700 rounded-lg flex justify-between items-center">
              <span className="text-white text-base font-semibold leading-3 ml-4">Price </span>
              <span className="text-white text-base font-semibold leading-3 mr-4">{clickedCardData.price}원</span>
            </div>
            <div className="w-72 h-8 bg-neutral-700 rounded-lg flex items-center">
              <span className="text-white text-base font-semibold leading-3 ml-4 mr-2">Nutrition Facts</span>
              <span className="text-white text-base font-semibold leading-3 ml-12 ">{clickedCardData.nutrition.kcal}kcal</span>
              <DropDownIcon className="ml-4" onClick={handledDropdownClick} />
            </div>
          </div>
          {isDropdownClicked && (
              <div className='w-72 h-28 bg-neutral-800 rounded-lg ml-8'>
                <div className="grid grid-cols-2 h-28 items-center">
                  <div
                    className="text-left text-neutral-400 text-xs font-medium leading-2 ml-5">당류<br />단백질<br />포화지방<br />나트륨<br />카페인
                  </div>
                  <div
                    className="text-right text-neutral-400 text-xs font-medium leading-2 mr-5 ">
                    {clickedCardData.nutrition.sugar}g<br />
                    {clickedCardData.nutrition.protein}g<br />
                    {clickedCardData.nutrition.fat}g<br />
                    {clickedCardData.nutrition.natrium}mg<br />
                    {clickedCardData.nutrition.caffein}mg
                  </div>
                </div>
              </div>
          )}
          <div className="flex flex-col items-center">
            <Divider
              className="w-80 my-6"
              sx={{ borderStyle: 'dashed', borderColor: '#EDEDED' }}
            />
            <div className="grid gap-y-3.5">
              <div>
                <span className="text-gray-200 text-sm font-medium leading-5">👍   지금 </span>
                <span className="text-gray-200 text-sm font-bold leading-5">{clickedCardData.cafe}</span>
                <span className="text-gray-200 text-sm font-medium leading-5">에서 마실 수 있어요.</span>
              </div>
              {!hideContents && (
              <div>
                <span className="text-gray-200 text-sm font-bold leading-5">👀 {clickedCardData.cafe}</span>
                <span className="text-gray-200 text-sm font-medium leading-5">의 다른 메뉴가 궁금하다면<br /></span>
                <div className='flex justify-items-start ml-5'>
                  <span className="text-gray-200 text-sm font-medium leading-5">{clickedCardData.otherBeverage}를 추천해요.</span>
                </div>
              </div>
                )}
            </div>
            {!hideContents && (
            <Box className="flex gap-x-4 mt-8" sx={{ borderRadius: '22px' }}>
              <Button
                variant="contained"
                size="medium"
                style={{ backgroundColor: '#3FCC7C', borderRadius: '22px' }}
                onClick={recommend}
              >
                이걸로 할래요
              </Button>
              <Button
                variant="contained"
                size="medium"
                style={{ backgroundColor: '#474747', borderRadius: '22px' }}
                onClick={handleReStartButtonClicked}
              >
                다시 추천 받을래요
              </Button>
            </Box>
            )}
          </div>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default RecommendingPage;
