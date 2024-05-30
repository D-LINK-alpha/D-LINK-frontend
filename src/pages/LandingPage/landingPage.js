import React, { useEffect, useState } from 'react';
import Item from '../../components/Item/item';
import InfoBar from '../../components/Layout/Header/infoBar';
import Footer from '../../components/Layout/Footer';
import Modal from '../../components/Modal/modal';
import {ReactComponent as Map } from '../../assets/map.svg';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapVisible, setIsMapVisible] =useState(false);
  const [mainData, setMainData] = useState([]);
  const [nickname, setNickname] = useState('');
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

useEffect(() => {
  const getMain = async () => {
    const token = cookies.token;
    try{
      const res = await axios.get(
        `${process.env.REACT_APP_REST_API_URL}/api/main`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      console.log('getMain res:', res);
      setNickname(res.data.nickname);
      setMainData(res.data.recommendHistory);
    }catch (error){
      console.error('error!!', error);
      setMainData([]);
    }
  };

  getMain();
}, [cookies.token]);


  // 오늘 날짜의 데이터가 없으면 모달이 뜸
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;
    const hasTodayData = mainData.some(item => formatDate(item.createdAt).split('T')[0] === formattedToday);

    setIsModalOpen(!hasTodayData);
    setIsMapVisible(hasTodayData);
  }, [mainData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const itemClicked = (item) => {
    const cardData = {
      name: item.beverage.name,
      similarity: item.similarity,
      cafeName: item.beverage.cafe,
      drinkType: item.beverage.type,
      isRecommended: item.isRecommended,
      isLike: item.isLike,
      historyId: item.historyId,
      nutrition: item.beverage.nutrition,
      price: item.beverage.price,
      photo: item.beverage.photo, // 추가: 음료 이미지
      beverageId: item.beverage.id, // 추가: 음료 ID
    };
    navigate('/result/recommendingPage', { state: { cardData , from: '/main' }})
  };

  const placeName = mainData.length > 0 ? mainData[0].beverage.cafe : '';

  const mapClicked = () => {
      navigate('/map', { state: { placeName: placeName}});
  }
  return (
    <>
      <InfoBar name={nickname}/>
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
            {mainData.map((item, index) => (
              <Item
                key={index}
                drinkName={item.beverage.name}
                similarity={item.similarity}
                cafeName={item.beverage.cafe}
                drinkType={item.beverage.type}
                size={index === 0 ? 'big' : 'small'}
                createdAt={formatDate(item.createdAt)}
                onClick={() => itemClicked(item)}
              />
            ))}
          </div>
          <Modal isOpen={isModalOpen} name={nickname} />
          {isMapVisible && <Map className="px-[23px]" onClick={mapClicked}/>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
