import * as React from 'react';
import { ReactComponent as FullHeart } from '../../assets/community/full_heart.svg';
import { ReactComponent as Heart } from '../../assets/community/heart.svg';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import '../../styles/dots.css';
import ProfileIcon from '../Profile';
import axios from 'axios';
import { useCookies } from 'react-cookie';

Posting.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  isLike: PropTypes.bool.isRequired,
  setIsLike: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  imageSrcArray: PropTypes.arrayOf(PropTypes.string),
  currentUser: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  likes: PropTypes.number.isRequired,
};

export default function Posting({
  title,
  user,
  isLike,
  setIsLike,
  content,
  createdAt,
  imageSrcArray,
  currentUser,
  postId,
  onDeleteSuccess,
  likes: initialLikes,
}) {
  const [cookies] = useCookies(['token']);
  const [likes, setLikes] = React.useState(initialLikes);

  const formatDate = (dateString) => {
    const utcDate = new Date(dateString); // UTC 시간을 기준으로 Date 객체 생성
    const koreaTimeOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const koreaDate = new Date(utcDate.getTime() + koreaTimeOffset); // UTC 시간에 9시간을 더함

    const datePart = koreaDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const timePart = koreaDate.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24시간 표기법 사용
    });

    return `${datePart} ${timePart.replace(/:/g, ':').replace(/ /g, '')}`; // 시간 포맷 조정
  };

  const handleLikeClick = async () => {
    const token = cookies.token;
    try {
      await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/api/article/like`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsLike(!isLike);
      setLikes((prevLikes) => (isLike ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDelete = async () => {
    const token = cookies.token;
    try {
      await axios.delete(
        `${process.env.REACT_APP_REST_API_URL}/api/article/delete/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'dots_custom',
  };

  return (
    <div>
      <div className="w-full flex-col space-x-0 justify-center items-center bg-[#EDEDED]">
        <div className="bg-[#363636]">
          <div className="flex justify-between pr-8">
            <div className="flex pl-[35px] pr-8">
              <p className="text-[10px] text-[#8E8E8E] pt-[22px]">
                {formatDate(createdAt)}
              </p>
            </div>

            <div className="mt-[15px] flex">
              <div
                onClick={handleLikeClick}
                className="self-end cursor-pointer"
              >
                {isLike ? <FullHeart /> : <Heart />}
              </div>
              <div className="text-[10px] text-[#ffffff] self-end flex justify-center">
                <p className="pl-4">{likes}</p>
              </div>
            </div>
          </div>

          <div className="flex px-[35px] text-start pt-3">
            <p className="text-2xl text-amber-50 pt-[10px]]">{title}</p>
          </div>
          <div className="flex pl-[35px] self-center">
            <div className="pr-[6px] pt-[8px] pb-4">
              <ProfileIcon size={16} />
            </div>
            <p className="text-[10px] text-[#8E8E8E] pt-[8px] pb-4">{user}</p>
            {currentUser === user && (
              <button
                onClick={handleDelete}
                className="text-[10px] text-red-500 ml-2 pt-[8px] pb-4"
              >
                삭제
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <div className="w-full h-full">
              {imageSrcArray && imageSrcArray.length > 0 && (
                <Slider {...settings} className="flex-col ">
                  {imageSrcArray.map((src, index) => (
                    <div key={index}>
                      <img
                        src={src}
                        alt={`Post Image ${index}`}
                        className="object-cover h-[375px] min-w-[375px] w-full "
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>

          <div className="px-[40px] flex text-start pt-[10px] pb-[32px]">
            <p className="text-sm text-black pb-[19px] font-medium break-words max-w-[296px]]">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
