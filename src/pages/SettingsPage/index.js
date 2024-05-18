import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import * as React from 'react';
import MuiButton from '../../components/Button/muiButton';
// import { Link } from 'react-router-dom';

export default function settingsPage() {
  const onClick = () => {
    alert('준비 중입니다.');
  };
  return (
    <div>
      <Header title="Settings" />
      <div className="flex flex-col h-screen py-[64px]">
        <div className="bg-[#363636] h-[205px]">
          <p>프로필 자리</p>
        </div>

        <div className="flex space-x-0 pt-4 px-[35px]">
          <p className="text-amber-50 text-2xl">Settings</p>
        </div>

        <div className="flex flex-col px-[23px] justify-between max-h-[485px] h-full pt-[29px]">
          <div>
            <MuiButton
              text="Push 알림 허용"
              className="bg-[#363636] h-[48px] w-[329px] rounded-2xl justify-center"
            />
          </div>
          <div>
            <MuiButton
              text="이용약관"
              className="bg-[#363636] h-[48px] w-[329px] rounded-2xl"
            />
          </div>
          <div>
            <MuiButton
              text="개인정보 처리방침"
              className="bg-[#363636] h-[48px] w-[329px] rounded-2xl"
            />
          </div>
          <div>
            <MuiButton
              text="관리자 모드"
              className="bg-[#595959] text-gray-500 h-[48px] w-[329px] rounded-2xl"
              disabled={true}
              onClick={onClick}
            />
          </div>
          <div>
            <MuiButton
              text="메뉴 등록"
              className="bg-[#595959] text-gray-500 h-[48px] w-[329px] rounded-2xl"
              disabled={true}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
