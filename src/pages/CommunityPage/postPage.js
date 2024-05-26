import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import * as React from 'react';
import Posting from '../../components/Posting/posting';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PostLoadingPage from '../LoadingPage/postLoadingPage';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/userState';

export default function PostPage() {
  const { postId } = useParams(); // useParams 훅을 사용하여 postId를 가져옴
  const [postData, setPostData] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [cookies] = useCookies(['token', 'email']);
  const currentUser = useRecoilValue(userState).nickname;
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Email from cookie:', cookies.email); // Debugging log

    const fetchData = async () => {
      const token = cookies.token;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_REST_API_URL}/api/article/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }, // 동적 postId 사용
        );

        const data = response.data;
        setPostData({
          title: data.title,
          user: data.nickname,
          content: data.content,
          isLike: data.isLike,
          createdAt: data.createdAt,
          imageSrcArray: data.files.map((file) => file.url),
        });
        setIsLike(data.isLike);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [postId, cookies]); // postId와 cookies가 변경될 때마다 fetchData를 호출

  const handleDeleteSuccess = () => {
    navigate('/community'); // 삭제 성공 후 메인 페이지로 리디렉션
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
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (!postData) {
    return <PostLoadingPage />;
  }

  return (
    <div>
      <Header title="Share Your DLNK" />
      <div className="flex flex-col h-screen py-[64px]">
        <div className="overflow-auto scrollbar-hide">
          <div className="flex space-x-0 justify-between pt-4 px-[23px] pb-8">
            <p className="text-amber-50 text-2xl">Post</p>
          </div>
          <div>
            <Posting
              title={postData.title}
              user={postData.user}
              content={postData.content}
              isLike={isLike}
              setIsLike={setIsLike}
              createdAt={postData.createdAt}
              imageSrcArray={postData.imageSrcArray}
              currentUser={currentUser} // 현재 사용자 닉네임 전달
              postId={postId} // postId 전달
              onDeleteSuccess={handleDeleteSuccess} // 삭제 성공 후 호출할 콜백 함수 전달
              onLikeClick={handleLikeClick} // 하트 클릭 이벤트 핸들러 전달
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
