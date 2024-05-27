import React, { useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactComponent as FavoriteIcon } from '../../assets/favoriteIcon.svg';
import Divider from '@mui/material/Divider';
import { useLocation} from 'react-router-dom';
import {ReactComponent as DropDownIcon} from '../../assets/dropDownIcon.svg';
import { ReactComponent as SampleBeverageImage } from '../../assets/sampleBeverageImage.svg';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import { useCookies } from 'react-cookie';
import axios from 'axios';


const RecommendingPage = () => {
  const location = useLocation();
  const clickedCardData = location.state.cardData;//클릭된 카드 데이터값 가져옴
  const clickedCardId = location.state.id;
  const [favoriteIconStyle, setFavoriteIconStyle] = useState(false); //즐겨찾기 버튼 관리
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [cookies] = useCookies(['token']);

  const recommend = async () => {
    const token = cookies.token;
    try{
      const res = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/api/history/recommend`,
        {
          beverageId: clickedCardId+1,
          similarity: clickedCardData.similarity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if(res.data.msg === '이걸로 할래요 성공')
        console.log('recommend res:', res);
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
          beverageId: clickedCardId+1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if(res.data.msg === 'success')
        console.log(clickedCardData.id);
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



  return (
    <>
      <Header title="Recommendation" />
      <div className="flex flex-col h-screen py-[85px]">
        <div className="overflow-y-scroll">
          <div className='flex justify-center mb-6'>
            <SampleBeverageImage />
          </div>
          <div className="grid grid-cols-2 justify-items-center  items-center">
            <div className="text-white text-lg font-bold leading-normal">비오는 가을 아침,</div>
            <div className="flex justify-self-end mr-10">
              <FavoriteIcon
                fill={favoriteIconStyle ? '#3FCC7C' : '#474747'}
                onClick={handleFavButtonClick}
              />
            </div>
          </div>
          <br />
          <div className='grid justify-items-start'>
            <span className="text-white text-lg font-bold leading-normal ml-8">{clickedCardData.menu}
              <span className="text-white text-lg font-normal leading-normal">은</span>
            </span>
            <span className="text-white text-lg font-normal leading-normal ml-8">쿠민님의 취향과
              <span className="text-white text-lg font-bold leading-normal"> {clickedCardData.similarity} </span>
              일치해요.</span>
          </div>
          <br />

          <div className="flex flex-col ml-8 gap-y-3.5 ">
            <div className="w-52 h-8 bg-neutral-700 rounded-lg flex justify-between items-center">
              <span className="text-white text-base font-semibold leading-3 ml-4">Price </span>
              <span className="text-white text-base font-semibold leading-3 mr-4">{clickedCardData.price}</span>
            </div>
            <div className="w-72 h-8 bg-neutral-700 rounded-lg flex items-center">
              <span className="text-white text-base font-semibold leading-3 ml-4 mr-2">Nutrition Facts</span>
              <span className="text-white text-base font-semibold leading-3 ml-12 ">347kcal</span>
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
                    className="text-right text-neutral-400 text-xs font-medium leading-2 mr-5 ">44g<br />10g<br />7g<br />152mg<br />129mg
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
                <span className="text-gray-200 text-sm font-bold leading-5">오설록 티하우스 한남점</span>
                <span className="text-gray-200 text-sm font-medium leading-5">에서 마실 수 있어요.</span>
              </div>
              <div>
                <span className="text-gray-200 text-sm font-bold leading-5">👀   오설록 티하우스 한남점</span>
                <span className="text-gray-200 text-sm font-medium leading-5">의 다른 메뉴가 궁금하다면<br /></span>
                <div className='flex justify-items-start ml-5'>
                  <span className="text-gray-200 text-sm font-medium leading-5">유자말차에이드를 추천해요.</span>
                </div>
              </div>
            </div>

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
              >
                다시 추천 받을래요
              </Button>
            </Box>
          </div>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default RecommendingPage;
