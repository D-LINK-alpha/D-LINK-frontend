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
}) {
  const [cookies] = useCookies(['token']);

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
          <div className="flex pl-[35px] pr-8 justify-between">
            <p className="text-[10px] text-[#8E8E8E] pt-[22px]">{createdAt}</p>
            <div onClick={handleLikeClick} className="cursor-pointer self-end">
              {isLike ? <FullHeart /> : <Heart />}
            </div>
          </div>

          <div className="flex pl-[35px]">
            <p className="text-2xl text-amber-50 pt-[10px]">{title}</p>
          </div>
          <div className="flex pl-[35px] self-center">
            <div className="pr-[6px] pt-[8px] pb-4">
              <ProfileIcon size={16} />
            </div>
            <p className="text-[10px] text-[#8E8E8E] pt-[8px] pb-4">{user}</p>
            {currentUser === user && (
              <button
                onClick={handleDelete}
                className="text-[10px] text-red-500 ml-2"
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
                <Slider {...settings}>
                  {imageSrcArray.map((src, index) => (
                    <div key={index}>
                      <img
                        src={src}
                        alt={`Post Image ${index}`}
                        className="object-cover w-full h-full min-h-[375px] min-w-[375px]"
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
