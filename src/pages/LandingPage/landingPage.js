import React, { useEffect, useState } from 'react';
import Item from '../../components/Item/item';
import InfoBar from '../../components/Layout/Header/infoBar';
import Footer from '../../components/Layout/Footer';
import Modal from '../../components/Modal/modal';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dummyData = [
    {
      drinkName: '그린티 라떼 더블샷',
      similarity: '98%',
      cafeName: '오설록',
      drinkType: 'coffee',
    },
    {
      drinkName: '쇼콜라 말차 모카',
      similarity: '80%',
      cafeName: '오설록',
      drinkType: 'latte',
    },
    {
      drinkName: '말차 초콜릿 라떼',
      similarity: '70%',
      cafeName: '오설록',
      drinkType: 'latte',
    },
    {
      drinkName: '밀크폼 그린티',
      similarity: '60%',
      cafeName: '오설록',
      drinkType: 'tea',
    },
  ];

  useEffect(() => {
    if (dummyData.length === 0) {
      setIsModalOpen(true);
    }
  }, [dummyData]);

  return (
    <>
      <InfoBar name={'쿠민'}/>
      <div className="flex flex-col h-screen pb-[83px]">
        <div className="flex-1">
          <div className="flex items-end text-white text-[24px] pt-[18px] pl-[35px]">
            Today&apos;s DLNK
            <a
              href={'/result'}
              className="text-[#DBDBDB] underline text-[12px] pb-[4px] pl-[100px]"
            >
              더보기
            </a>
          </div>
          <div className="flex flex-col justify-center pt-[22px] px-[23px]">
            {dummyData.map((item, index) => (
              <Item
                key={index}
                drinkName={item.drinkName}
                similarity={item.similarity}
                cafeName={item.cafeName}
                drinkType={item.drinkType}
                index={index + 1}
                size={index === 0 ? 'big' : 'small'}
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
