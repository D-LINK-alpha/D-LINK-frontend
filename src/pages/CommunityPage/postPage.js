import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import * as React from 'react';
import Posting from '../../components/Posting/posting';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LoadingPage from '../LoadingPage/loadingPage';

export default function postPage() {
  const { postId } = useParams(); // useParams 훅을 사용하여 postId를 가져옴
  const [postData, setPostData] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
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
  }, [postId]); // postId가 변경될 때마다 fetchData를 호출

  if (!postData) {
    return <LoadingPage />;
    // return <div>loading...</div>;
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
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
