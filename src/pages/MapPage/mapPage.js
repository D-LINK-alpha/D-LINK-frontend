import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer'

const { kakao } = window;

const MapPage = () => {
  const location = useLocation();
  const { placeName } = location.state || {};
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    console.log(placeName);
    if (!placeName) return;

    // 사용자의 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    }, (error) => {
      console.error("Error fetching location", error);
      // 위치를 가져오지 못한 경우 기본 위치로 설정 (서울)
      setUserLocation({ latitude: 37.566535, longitude: 126.9779692 });
    });
  }, [placeName]);

  useEffect(() => {
    if (!userLocation) return;

    // 카카오맵 초기화
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
      level: 3
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체 생성
    const ps = new kakao.maps.services.Places();

    // 장소 검색 요청
    const searchOption = {
      location: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
      radius: 2000 // 반경 2km
    };
    ps.keywordSearch(placeName, placesSearchCB, searchOption);

    // 장소 검색 결과를 처리하는 콜백 함수
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 첫 번째 결과의 위치로 지도 이동
        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하고 infowindow를 등록하는 함수
    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      // 마커에 클릭 이벤트를 등록
      kakao.maps.event.addListener(marker, 'click', function() {
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:10px;">${place.place_name}<br>${place.address_name}</div>`
        });
        infowindow.open(map, marker);
      });
    }
  }, [userLocation, placeName]);


  return (
    <>
      <Header title="Map" />
      <div className="flex flex-col h-screen py-[85px]">
        <div className="overflow-y-scroll">
          <div id="map" className='w-full h-screen' ></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MapPage;
