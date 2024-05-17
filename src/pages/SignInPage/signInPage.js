import React from 'react';
import { ReactComponent as GreenIcon } from '../../assets/green.svg';
import { ReactComponent as KakaoLogin } from '../../assets/kakao_login_original 1.svg';
import { KAKAO_AUTH_URL } from '../../apis/api/auth';

const SignInPage = () => {
  return (
    <div className="flex flex-col justify-center pt-[95px]">
      <div className="flex justify-center">
        <GreenIcon />
      </div>
      <div className="text-white text-lg pt-[47px]">
        간편하게 로그인하고 <br />
        DLNK 이용해보세요.
      </div>
      <a href={KAKAO_AUTH_URL} className="flex justify-center pt-[56px]">
        <KakaoLogin />
      </a>
      <div className="text-[#868686] text-sm pt-[22px]">
        DLNK가 처음이신가요?
        <a href={'/join'} className="text-[#DBDBDB] underline pl-2 text-sm">
          회원가입
        </a>
      </div>
    </div>
  );
};
export default SignInPage;
