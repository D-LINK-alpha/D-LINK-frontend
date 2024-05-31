import React, { useEffect, useState } from 'react';
import { ReactComponent as InputSample } from '../../assets/inputSample.svg';
import { Button } from '@mui/material';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import { useNavigate } from 'react-router-dom';

const PromptPage = () => {
  const [text, setText] = useState('');
  const maxLength = 200; // 최대 글자 수
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [places, setPlaces] = useState([]);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      setText(inputValue);
    }
  };

  const handleSubmitButton = () => {
        if(places.length !== 0 && text.length !== 0) {
          navigate('/promptloading', { state: { text, places } });
        }
  };

  useEffect(() => {
    // Check if kakao is loaded
    if (window.kakao && window.kakao.maps) {
      setIsKakaoLoaded(true);
    } else {
      console.error('Kakao maps library is not available.');
    }
  }, []);

  useEffect(() => {
    const success = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };

    const failure = (error) => {
      console.log(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, failure);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude && isKakaoLoaded) {
      const kakao = window.kakao;
      // 새로운 장소 검색 서비스를 생성합니다.
      const placesService = new kakao.maps.services.Places();
      // 중심 좌표를 설정하여 주변 2km 내의 장소를 검색합니다.
      placesService.keywordSearch('카페', (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const results = data.map(place => ({
            name: place.place_name,
            latitude: place.y.toString(),
            longitude: place.x.toString(),
          }));
          setPlaces(results);
        } else {
          console.log('키워드 서치 실패 :', status);
        }
      }, {
        location: new kakao.maps.LatLng(latitude, longitude),
        radius: 2000
      });
    }
  }, [latitude, longitude, isKakaoLoaded]);

  useEffect(() => {
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    console.log('Places:', places);
  }, [latitude, longitude, places]);

  return (
    <>
      <Header title="prompt" />
      <div className="Container">
        <div className="flex-1">
          <div className="flex justify-center mt-8">
            <InputSample />
            <div className="absolute">
              <textarea
                placeholder="음료 추천을 받기 위해 현재 상황을 묘사해주세요.
                기분이 어떤지, 마시고 싶은 음료의 종류, 맛,
                제외하고 싶은 특성 등을 적어주세요.


                Ex)
                따뜻한 녹차 맛 음료, 피곤함, 달달한 맛, 카페인 제외,
                자주 먹던 음료 종류 중 하나."
                className="relative z-10 pt-8 bg-transparent focus:outline-none
              w-[263px] h-[200px]
              text-sm font-normal resize-none"
                value={text}
                onChange={handleChange}
              />
              <div className="text-[#8E8E8E] flex justify-end">
                <p>
                  {text.length}/{maxLength}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button className="w-16 h-9 bg-[#EDEDED] text-black rounded-3xl" onClick={handleSubmitButton}>
              저장
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PromptPage;
