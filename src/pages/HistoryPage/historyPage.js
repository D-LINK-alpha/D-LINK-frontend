import React, {useState, useEffect} from 'react';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import Item from '../../components/Item/historyItem';

const HistoryPage = () => {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const week= ["일", "월", "화", "수", "목", "금", "토"];
  const canGoBack = date > new Date(Date.now() - 7 * (24 * 60 * 60 * 1000));
  const canGoForward = date < new Date().setHours(0, 0, 0, 0);

  const dummyData = [
    {drinkName: '그린티 라떼 더블샷', similarity:'98%', cafeName:'오설록', drinkType:'coffee', isLike:true, createdAt: "2024-05-20T06:34:15.666Z"},
    {drinkName: '쇼콜라 말차 모카', similarity:'80%', cafeName:'오설록', drinkType:'latte', isLike:false, createdAt: "2024-05-20T06:34:15.666Z"},
    {drinkName: '말차 초콜릿 라떼', similarity:'70%', cafeName:'오설록', drinkType:'latte', isLike:false, createdAt: "2024-05-20T06:34:15.666Z"},
    {drinkName: '밀크폼 그린티', similarity:'60%', cafeName:'오설록', drinkType:'tea', isLike:true, createdAt: "2024-05-19T06:34:15.666Z"},
  ];

  useEffect(() => {
    // 날짜 형식 설정
    const formatted = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} ${week[date.getDay()]}요일`;
    setFormattedDate(formatted);

    // 날짜별로 데이터 분류
    const filtered = dummyData.filter(item => {
      const itemDate = new Date(item.createdAt);
      return (
        itemDate.getFullYear() === date.getFullYear() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getDate() === date.getDate()
      );
    });
    setFilteredData(filtered);
  }, [date]);


  const moveDate = (direction) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + direction);
      return newDate;
    });
  };


  return (
    <div>
      <Header title="History" />
      <div className="flex flex-col h-screen py-[75px]">
        <div className="flex-1">
          <div className="flex flex-col w-[375px] h-[108px] bg-[#363636] pt-[24px]">
            <div className="flex justify-center items-center">
              <button
                onClick={() => moveDate(-1)}
                disabled={!canGoBack}
                className="disabled:opacity-50"
              >
                <BackIcon className="w-[8px] h-[11px] mr-[20px]" />
                </button>
                <div
                  className="flex flex-col justify-center w-[217px] h-[33px] rounded-[12px] bg-[#EDEDED] text-[15px] font-bold">
                  {formattedDate}
                </div>
                <button
                  onClick={() => moveDate(1)}
                  disabled={!canGoForward}
                  className="disabled:opacity-50"
                >
                  <BackIcon className="w-[8px] h-[11px] rotate-180 ml-[20px]" />
                  </button>
            </div>
            <div className="text-[12px] text-white font-normal pt-[15px]">
              추천 히스토리는 일주일 전 기록까지만 확인이 가능해요.
            </div>
          </div>
          <div className="flex flex-col px-[23px] pt-[32px]">
            {filteredData.map((item, index) => (
              <Item
                key={index}
                drinkName={item.drinkName}
                drinkType={item.drinkType}
                isLike={item.isLike}
              />
            ))}
            {filteredData.length === 0 && (
              <div className="text-white text-[16px] font-normal pt-[14px]">오늘 추천 받은 내역이 없어요.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;