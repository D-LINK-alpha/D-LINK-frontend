import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import MuiButton from '../../components/Button/muiButton';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../components/Profile/index';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactComponent as DrinkSample } from '../../assets/drinkExample/drinkExample.svg';

export default function CommunityPage() {
  const [isLatestClicked, setIsLatestClicked] = useState(true);
  const [itemData, setItemData] = useState([]);
  const [topLikeItem, setTopLikeItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_REST_API_URL}/api/article`,
        );

        const data = response.data.map((item, index) => ({
          postId: index + 1, // index를 기반으로 postId 추가
          img: item.files[0]?.url || '',
          title: item.title,
          isLike: item.likes, // 실제 likes 값을 사용
        }));

        setItemData(data);

        // isLike 값이 가장 많은 항목 찾기
        if (data.length > 0) {
          const topItem = data.reduce((prev, current) =>
            prev.isLike > current.isLike ? prev : current,
          );
          setTopLikeItem(topItem);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sortedItemData = [...itemData].sort((a, b) => {
    if (isLatestClicked) {
      // 최신순
      return b.isLike - a.isLike;
    } else {
      // 인기순
      return b.isLike - a.isLike;
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
            {topLikeItem && (
              <Link to={`/community/post/${topLikeItem.postId}`}>
                <div
                  className="flex justify-center cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={topLikeItem.img}
                    alt={topLikeItem.title}
                    className="object-cover w-full h-full"
                    style={{ maxHeight: '329px', maxWidth: '329px' }}
                  />
                </div>
              </Link>
            )}
            {!topLikeItem && (
              <div className="flex justify-center cursor-pointer">
                <DrinkSample />
              </div>
            )}
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
                {sortedItemData.map((item, index) => (
                  <ImageListItem key={index}>
                    <Link to={`/community/post/${item.postId}`}>
                      <img
                        srcSet={`${item.img}`}
                        src={`${item.img}`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </Link>
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
