import React, { useEffect, useState } from 'react';
import Item from '../../components/Item/item';
import InfoBar from '../../components/Layout/Header/infoBar';
import Footer from '../../components/Layout/Footer';
import Modal from '../../components/Modal/modal';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dummyData = [
    {drinkName: '그린티 라떼 더블샷', similarity:'98%', cafeName:'오설록', drinkType:'coffee', isLike:true, bookmark:false, createdAt: "2024-05-27T06:34:15.666Z"},
    {drinkName: '그린티 라떼 더블샷', similarity:'98%', cafeName:'오설록', drinkType:'latte', isLike:true, bookmark:false, createdAt: "2024-05-26T06:34:15.666Z"},
    {drinkName: '그린티 라떼 더블샷', similarity:'98%', cafeName:'오설록', drinkType:'ade', isLike:true, bookmark:false, createdAt: "2024-05-23T06:34:15.666Z"},
    {drinkName: '그린티 라떼 더블샷', similarity:'98%', cafeName:'오설록', drinkType:'tea', isLike:true, bookmark:false, createdAt: "2024-05-23T06:34:15.666Z"},
    {drinkName: '그린티 라떼 더블샷', similarity:'98%', cafeName:'오설록', drinkType:'coffee', isLike:false, bookmark:true, createdAt: "2024-05-23T06:34:15.666Z"},
    {drinkName: '쇼콜라 말차 모카', similarity:'80%', cafeName:'오설록', drinkType:'latte', isLike:false, bookmark:false, createdAt: "2024-05-23T06:34:15.666Z"},
    {drinkName: '말차 초콜릿 라떼', similarity:'70%', cafeName:'오설록', drinkType:'latte', isLike:false, bookmark:true, createdAt: "2024-05-23T06:34:15.666Z"},
    {drinkName: '밀크폼 그린티', similarity:'60%', cafeName:'오설록', drinkType:'tea', isLike:false, bookmark:true, createdAt: "2024-05-22T06:34:15.666Z"},
  ];

  // 오늘 날짜의 데이터가 없으면 모달이 뜸
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const hasTodayData = dummyData.some(item => item.createdAt.split('T')[0] === formattedToday);
    if (!hasTodayData){
      setIsModalOpen(true);
    }
  }, [dummyData]);

  return (
    <>
      <InfoBar name={'쿠민'}/>
      <div className="flex flex-col h-screen pt-[75px] pb-[83px]">
        <div className="flex-1">
          <div className="flex justify-between items-end text-white text-[24px] pt-[18px] pl-[35px]">
            DLNK History
            <a
              href={'/history'}
              className="text-[#DBDBDB] underline text-[12px] pb-[4px] pr-[42px]"
            >
              더보기
            </a>
          </div>
          <div className="flex flex-col justify-center pt-[22px] px-[23px]">
            {dummyData.slice(0, 4).map((item, index) => (
              <Item
                key={index}
                drinkName={item.drinkName}
                similarity={item.similarity}
                cafeName={item.cafeName}
                drinkType={item.drinkType}
                size={index === 0 ? 'big' : 'small'}
                createdAt={item.createdAt}
              />
            ))}
          </div>
          <Modal isOpen={isModalOpen} name={'쿠민'} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
