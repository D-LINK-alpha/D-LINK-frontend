import React from 'react';
import MuiButton from '../../components/Button/muiButton';
// import TextFields from '../../components/Input';
const Join = () => {
  return (
    <div className="px-5">
      <h1 className="text-amber-50 text-2xl pt-20">Welcome to DLNK !</h1>
      <div className="pt-48">
        {/*<TextFields*/}
        {/*  text="본명이나 닉네임을 입력하세요"*/}
        {/*  className="text-gray-500"*/}
        {/*  textColor="#ffffff"*/}
        {/*/>*/}
        <input
          placeholder="본명이나 닉네임을 입력하세요"
          className="text-join-color bg-transparent text-lg
          w-56 font-medium focus:outline-none
          border-b-[1px] border-solid border-b-white
          text-center"
        />
      </div>
      <p className="text-[#868686] text-sm pt-8">
        DLNK 프로필에 표시되는 이름으로, <br />
        이후 마이페이지에서 변경할 수 있습니다.
      </p>
      <div className="flex justify-center pt-40">
        <MuiButton
          text="계속"
          className="w-44 h-12 rounded-3xl bg-[#3FCC7C] text-lg"
        />
      </div>
    </div>
  );
};

export default Join;
