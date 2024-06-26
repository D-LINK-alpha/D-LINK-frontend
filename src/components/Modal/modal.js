import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as TrakingIcon } from '../../assets/trakingIcon.svg';
import { ReactComponent as RedIcon } from '../../assets/red.svg';
import { ReactComponent as HistoryIcon } from '../../assets/historyIcon.svg';
import { ReactComponent as MyPageIcon } from '../../assets/myPageInModal.svg';

const Modal = ({ isOpen, name }) => {
  const [latitude, setLatitude] = useState(null); // 위도
  const [longitude, setLongitude] = useState(null); // 경도
  const [address, setAddress] = useState(''); // 주소

  useEffect(() => {
    const success = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLatitude(lat);
      setLongitude(lon);
      let geocoder = new window.kakao.maps.services.Geocoder();
      // 비동기적으로 주소 변환 수행
      geocoder.coord2Address(lon, lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address_part = result[0].address.region_2depth_name +' '+result[0].address.region_3depth_name;
          setAddress(address_part);
        } else {
          console.error('Geocoder failed due to: ' + status);
        }
      });
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

  console.log(latitude);
  console.log(longitude);
  console.log(address);


  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#232322] bg-opacity-85">
      <div className="flex flex-col items-center bg-[#EDEDED] w-[298px] h-[444px] rounded-[21px] pt-[20px]">
        <div className="flex items-center bg-[#FFFFFF] w-[256px] h-[37px] rounded-[11px] text-[14px] pl-[8px]">
          <TrakingIcon className="m-[6px]" />
          {address}
        </div>
        <div className="text-[16px] font-bold pt-[17px] pb-[3px]">
          최근 추천 받은 음료가 없어요.
        </div>
        <RedIcon className="w-[137px] h-[137px]" />
        <div className="flex flex-col items-center bg-[#FFFFFF] w-[256px] h-[140px] rounded-[17px] text-[12px] pt-[20px]">
          Prompt 에 상황을 입력하고 <br />
          {name}님께 딱 맞는 음료를 추천 받으세요.
          <a
            href={'/prompt'}
            className="flex justify-center items-center bg-[#DF5A21] w-[111px] h-[37px] rounded-full text-white text-[14px] font-semibold mt-[27px]"
          >
            상황 입력하기
          </a>
        </div>
        <div className="flex text-[10px] pt-[25px] space-x-[71px]">
          <Link to="/history" className="flex">
            <HistoryIcon className="mr-[7px]" />
            추천 히스토리 보기
          </Link>
          <Link to="/setting" className="flex">
            <MyPageIcon className="mr-[7px]" />
            MY PAGE
          </Link>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Modal;
