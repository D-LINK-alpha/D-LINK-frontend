import React, { useEffect } from 'react';
import Spinner from '../../assets/loadingSpinner.gif';
import { ReactComponent as GroupIcon } from '../../assets/iconGroup.svg';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

const LoadingPage = () => {
  const navigate = useNavigate();
  const email = new URL(window.location.href).searchParams.get('email');
  const token = new URL(window.location.href).searchParams.get('token');
  const [, setCookie] = useCookies(['email', 'token']);
  const { postId } = useParams(); // useParams 훅을 사용하여 postId를 가져옴

  // postId가 있는 경우 처리
  useEffect(() => {
    if (postId) {
      setTimeout(() => {
        navigate(`/community/post/${postId}`);
      }, 500);
    }
  }, [postId, navigate]);

  // 카카오 로그인 처리
  useEffect(() => {
    const kakaoLogin = () => {
      console.log(email);
      console.log(token);
      if (email) {
        // 첫 로그인이라면
        setCookie('email', email, { path: '/' });
        navigate('/join');
      } else if (!email) {
        // 첫 로그인이 아니라면
        setCookie('token', token, { path: '/' });
        navigate('/main');
      }
    };

    if (email || token) {
      setTimeout(() => {
        kakaoLogin();
      }, 500);
    }
  }, [email, token, setCookie, navigate]);

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
