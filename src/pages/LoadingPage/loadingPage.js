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
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8', //json 형태로 데이터 전송
          'Access-Control-Allow-Origin': '*', // cors 에러
        },
      }).then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
        // //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
        // localStorage.setItem('name', res.data.account.kakaoName);
        //로그인이 성공하면 이동할 페이지
        navigate('/landing');
      });
    };
    kakaoLogin();
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
