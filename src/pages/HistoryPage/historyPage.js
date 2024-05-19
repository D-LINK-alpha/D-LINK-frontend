import React, {useState, useEffect} from 'react';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
// import { ReactComponent as RedIcon } from '../../assets/miniRed.svg';
// import { ReactComponent as GreenIcon } from '../../assets/miniGreen.svg';
// import { ReactComponent as BlueIcon } from '../../assets/miniBlue.svg';
// import { ReactComponent as YellowIcon } from '../../assets/miniYellow.svg';


const HistoryPage = () => {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const week= ["일", "월", "화", "수", "목", "금", "토"];
  const canGoBack = date > new Date(Date.now() - 7 * (24 * 60 * 60 * 1000));
  const canGoForward = date < new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    const formatted = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} ${week[date.getDay()]}요일`;
    setFormattedDate(formatted);
  }, [date]);

  const moveDate = (direction) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + direction);
      return newDate;
    });
  };


  return (
    <div className="flex flex-col h-screen">
      <Header title="History" />
      <div className="flex flex-col h-screen py-[64px]">
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
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
