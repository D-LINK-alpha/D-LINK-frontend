import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ReactComponent as DrinkSample } from '../../assets/drinkExample/drinkExample.svg';
import MuiButton from '../../components/Button/muiButton';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../components/Profile/index';
import { useState } from 'react';

export default function CommunityPage() {
  const [isLatestClicked, setIsLatestClicked] = useState(true);

  const sortedItemData = [...itemData].sort((a, b) => {
    if (isLatestClicked) {
      // 최신순
      return b.isLike - a.isLike;
    } else {
      // 인기순
      return a.isLike - b.isLike;
    }
  });

  return (
    <div>
      <Header title="Share Your DLNK" />
      <div className="flex flex-col h-screen py-[64px]">
        <div className="overflow-auto scrollbar-hide">
          <div className="flex space-x-0 justify-between pt-4 px-[23px] pb-8">
            <p className="text-amber-50 text-2xl">Community</p>
            <div className="flex justify-end">
              <Link to="/community/upload">
                <MuiButton
                  text="+"
                  className="w-16 h-8 bg-[#363636] text-amber-50 rounded-3xl"
                />
              </Link>
            </div>
          </div>

          <div className="w-full h-[468px] flex-col space-x-0 justify-center items-center bg-[#363636]">
            <div className="flex px-[23px]">
              <p className="text-xl text-amber-50 py-[18px]">오늘의 꿀조합</p>
            </div>
            <Link to="/community/post">
              <div
                className="flex justify-center cursor-pointer"
                // onClick={(e) => e.stopPropagation()}
              >
                <DrinkSample />
              </div>
            </Link>
            <div className="flex pt-[18px]">
              <div className="pl-[35px]">
                <ProfileIcon size={32} />
              </div>
              <div className="pl-[10px] flex-col">
                <p className="text-sm text-amber-50 font-bold">
                  스타벅스 #꿀조합 아샷추
                </p>
                <p className="text-[10px] font-normal text-amber-50 flex self-start">
                  @daun_up
                </p>
              </div>
            </div>
          </div>
          <div className="pt-[12px] flex justify-end px-[23px]">
            <ButtonGroup variant="text" aria-label="Basic button group">
              <Button
                className={`text-amber-50 border-none ${
                  isLatestClicked ? 'font-black' : ''
                }`}
                onClick={() => setIsLatestClicked(true)}
              >
                최신순
              </Button>
              <Button
                className={`text-amber-50 ${
                  !isLatestClicked ? 'font-black' : ''
                }`}
                onClick={() => setIsLatestClicked(false)}
              >
                인기순
              </Button>
            </ButtonGroup>
          </div>
          <div className="px-[23px] flex justify-center pt-[22px]">
            <Box sx={{ width: 320, overflowY: 'scroll' }}>
              <ImageList variant="masonry" cols={2} gap={8}>
                {sortedItemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const itemData = [
  {
    img: 'https://i.pinimg.com/564x/74/45/d3/7445d31462435646f07dd2f38b3693f4.jpg',
    title: 'Bed',
    isLike: '4',
  },
  {
    img: 'https://i.pinimg.com/564x/8e/8d/6d/8e8d6ddb14e7a3a6cd867035ae29cc4a.jpg',
    title: 'Books',
    isLike: '9',
  },
  {
    img: 'https://i.pinimg.com/564x/66/43/d0/6643d0ee81eb7b18b775a09772cf075e.jpg',
    title: 'Sink',
    isLike: '3',
  },
  {
    img: 'https://i.pinimg.com/736x/4d/d9/9e/4dd99ecab6f8083ad50add4ed540cef9.jpg',
    title: 'Kitchen',
    isLike: '13',
  },
  {
    img: 'https://i.pinimg.com/564x/f4/77/f6/f477f6049f96ad36fd96a0f204a102b6.jpg',
    title: 'Blinds',
    isLike: '8',
  },
  {
    img: 'https://i.pinimg.com/564x/9f/85/db/9f85db7c79e05890a30d381c021173bd.jpg',
    title: 'Chairs',
    isLike: '8',
  },
  {
    img: 'https://i.pinimg.com/736x/30/19/7c/30197c8b38c6cfe010c33aa5a78dc236.jpg',
    title: 'Laptop',
    isLike: '13',
  },
  {
    img: 'https://i.pinimg.com/736x/ea/0f/40/ea0f40b5dc5dc5f7e5d6937751b0ff09.jpg',
    title: 'Doors',
    isLike: '3',
  },
  {
    img: 'https://i.pinimg.com/736x/3e/cf/5d/3ecf5d8e9611a502d63df131349fb437.jpg',
    title: 'Coffee',
    isLike: '8',
  },
  {
    img: 'https://i.pinimg.com/564x/10/c6/04/10c604a963da59bf4d011bd3ae4966d2.jpg',
    title: 'Storage',
    isLike: '3',
  },
  {
    img: 'https://i.pinimg.com/564x/84/88/9c/84889c7b41f05596fb0222cd0b5c2688.jpg',
    title: 'Candle',
    isLike: '7',
  },
  {
    img: 'https://i.pinimg.com/564x/ba/5b/db/ba5bdbe5f2196ced3088a156f7e4ca33.jpg',
    title: 'Coffee table',
    isLike: '9',
  },
];
