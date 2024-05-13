import React from 'react';
import Spinner from '../../assets/loadingSpinner.gif';
import { ReactComponent as GroupIcon } from '../../assets/iconGroup.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const LoadingPage = () => {
  // 인가코드를 백엔드로 보냅니다.
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  //인가코드 백으로 보내는 코드

  const kakaoLogin = async () => {
    await axios({
      method: 'GET',
      // url: `${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`,
      url: `http://43.203.240.185:8080/login/oauth2/code/kakao?code=${code}`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8', //json 형태로 데이터 전송
        'Access-Control-Allow-Origin': '*', // cors 에러
      },
    }).then((res) => {
      // 백엔드에 전달 완료했을 때
      console.log(res);
      //로그인이 성공하면 이동할 페이지
      navigate('/landing');
    });
  };

  useEffect(() => {
    setTimeout(() => {
      kakaoLogin();
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center pt-[182px]">
      <GroupIcon className="relative" />
      <img
        src={Spinner}
        alt={'로딩'}
        width={'20%'}
        className="absolute pb-[96px]"
      />
      <div className="text-white text-[18px] pt-[62px]">
        오늘의 상황과 <br />딱 맞는 메뉴를 고르고 있어요.
      </div>
    </div>
  );
};
export default LoadingPage;
