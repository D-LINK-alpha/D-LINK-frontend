import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { ReactComponent as BackIcon } from '../../assets/back.svg';


const HistoryPage = () => {
  const today = new Date();
  const week= ["일", "월", "화", "수", "목", "금", "토"];
  const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()} ${week[today.getDay()]}요일 `;

  return (
    <div className="flex flex-col h-screen">
      <Header title="History" />
      <div className="flex-1">
        <div className="flex flex-col w-[375px] h-[108px] bg-[#363636] pt-[24px]">
          <div className="flex justify-center items-center">
            <BackIcon className="w-[8px] h-[11px] mr-[20px]"/>
            <div className="flex flex-col justify-center w-[217px] h-[33px] rounded-[12px] bg-[#EDEDED] text-[15px] font-bold">
              {formattedDate}
            </div>
            <BackIcon className="w-[8px] h-[11px] rotate-180 ml-[20px]"/>
          </div>
          <div className="text-[12px] text-white font-normal pt-[15px]">
            추천 히스토리는 일주일 전 기록까지만 확인이 가능해요.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
