import React, {useState, useEffect} from 'react';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import Item from '../../components/Item/historyItem';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const HistoryPage = () => {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const week= ["일", "월", "화", "수", "목", "금", "토"];
  const canGoBack = date > new Date(Date.now() - 7 * (24 * 60 * 60 * 1000));
  const canGoForward = date < new Date().setHours(0, 0, 0, 0);
  const recommendedItems = filteredData.filter(item => item.isRecommended);
  const disRecommendedItems = filteredData.filter(item => !item.isRecommended);
  const isEmpty = recommendedItems.length === 0 && disRecommendedItems.length === 0;
  const [cookies] = useCookies(['token']);

  const getHistory = async () => {
    const token = cookies.token;
    try{
      const res = await axios.get(
        `${process.env.REACT_APP_REST_API_URL}/api/history`,
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('getHistory res:', res);
      return res.data;
    }catch (error){
      console.error('getHistory error!!', error);
      return [];
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistory();

      // 날짜별로 데이터 분류
      const filtered = data.filter(item => {
        const itemDate = new Date(item.createdAt);
        return (
          itemDate.getFullYear() === date.getFullYear() &&
          itemDate.getMonth() === date.getMonth() &&
          itemDate.getDate() === date.getDate()
        );
      });
      setFilteredData(filtered);
    };
    // 날짜 형식 설정
    const formatted = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} ${week[date.getDay()]}요일`;
    setFormattedDate(formatted);

    fetchData();
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
        <div className="flex-1 overflow-y-scroll">
          <div className="flex flex-col h-[108px] bg-[#363636] pt-[24px] sticky top-0">
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
          <div className="flex flex-col px-[23px] py-[32px]">
            {isEmpty ? (
              <div className="text-white text-[16px] font-normal pt-[14px]">추천 받은 내역이 없어요.</div>
            ) : (
              <>
                {recommendedItems.length > 0 && (
                  <div className="pb-[28px]">
                    {recommendedItems.map((item, index) => (
                      <Item
                        key={index}
                        drinkName={item.beverage.name}
                        similarity={item.similarity}
                        cafeName={item.beverage.cafe}
                        drinkType={item.beverage.type}
                        isRecommended={item.isRecommended}
                        isLike={item.isLike}
                        historyId={item.historyId}
                        beverageId={item.beverage.id}
                      />
                    ))}
                  </div>
                )}
                {disRecommendedItems.length > 0 && (
                  <>
                    <div className="text-left text-white text-[16px] font-normal pb-[16px]">즐겨찾기</div>
                    {disRecommendedItems.map((item, index) => (
                      <Item
                        key={index}
                        drinkName={item.beverage.name}
                        similarity={item.similarity}
                        cafeName={item.beverage.cafe}
                        drinkType={item.beverage.type}
                        isRecommended={item.isRecommended}
                        isLike={item.isLike}
                        historyId={item.historyId}
                        beverageId={item.beverage.id}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
