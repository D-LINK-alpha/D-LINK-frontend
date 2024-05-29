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
// import { ReactComponent as DrinkSample } from '../../assets/drinkExample/drinkExample.svg';
import PostLoadingPage from '../LoadingPage/postLoadingPage';

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

        console.log('Response data:', response.data); // 서버에서 받은 전체 데이터를 출력

        const data = response.data.map((item) => ({
          postId: item.postId,
          img: item.files[0]?.url || '',
          title: item.title,
          content: item.content,
          nickname: item.nickname,
          likes: item.likes,
          createdAt: item.createdAt,
          isLike: item.isLike,
        }));

        console.log('Mapped data:', data); // 매핑 후 데이터를 출력

        setItemData(data);

        // likes 값이 가장 많은 항목 찾기
        if (data.length > 0) {
          const topItem = data.reduce((prev, current) =>
            prev.likes > current.likes ? prev : current,
          );
          setTopLikeItem(topItem);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!topLikeItem) {
    <PostLoadingPage />;
  }

  const sortedItemData = [...itemData].sort((a, b) => {
    if (isLatestClicked) {
      // 최신순
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      // 인기순
      return b.likes - a.likes;
    }
  });

  return (
    <div>
      <Header title="Share Your DLNK" />
      <div className="flex flex-col h-screen py-[64px] pb-[83px]">
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

          <div className="w-full h-full max-h-[468px] flex-col space-x-0 justify-center items-center bg-[#363636] content-center">
            <div className="flex px-[23px]">
              <p className="text-xl text-amber-50 py-[18px]">오늘의 꿀조합</p>
            </div>
            {topLikeItem ? (
              <Link to={`/community/post/${topLikeItem.postId}`}>
                <div
                  className="flex justify-center cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={topLikeItem.img}
                    alt={topLikeItem.title}
                    className="object-cover w-full h-full min-h-[329px] rounded-3xl"
                    style={{ maxHeight: '329px', maxWidth: '329px' }}
                  />
                </div>
              </Link>
            ) : (
              <div className="flex justify-center cursor-pointer">
                {/*<DrinkSample />*/}
              </div>
            )}
            {topLikeItem && (
              <div className="flex pt-[18px] pb-[18px]">
                <div className="pl-[35px]">
                  <ProfileIcon size={32} />
                </div>
                <div className="pl-[10px] flex-col text-start">
                  <p className="text-sm text-amber-50 font-bold">
                    {topLikeItem.title}
                  </p>
                  <p className="text-[10px] font-normal text-amber-50 flex self-start">
                    {topLikeItem.nickname}
                  </p>
                </div>
              </div>
            )}
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
                        className="rounded-2xl"
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
