import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import * as React from 'react';
import Posting from '../../components/Posting/posting';

export default function postPage() {
  const dummyData = {
    title: '그린티 라떼 더블샷',
    user: '조다운',
    content:
      '할 게 왜ㅔ케 만아 카페인 너무 많아서 아이스티 먹고 싶어요 그럴 땐 아이스티를 먹어 봅시다',
    isLike: true,
    createdAt: '24/05/02',
    imageSrcArray: [
      'https://i.pinimg.com/564x/74/45/d3/7445d31462435646f07dd2f38b3693f4.jpg',
      'https://i.pinimg.com/564x/66/43/d0/6643d0ee81eb7b18b775a09772cf075e.jpg',
      'https://i.pinimg.com/736x/4d/d9/9e/4dd99ecab6f8083ad50add4ed540cef9.jpg',
      'https://i.pinimg.com/736x/ea/0f/40/ea0f40b5dc5dc5f7e5d6937751b0ff09.jpg',
    ],
  };

  // const post = dummyData[0]; // Access the first post in the array

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
              title={dummyData.title}
              user={dummyData.user}
              content={dummyData.content}
              isLike={dummyData.isLike}
              createdAt={dummyData.createdAt}
              imageSrcArray={dummyData.imageSrcArray}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
