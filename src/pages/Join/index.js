import React from 'react';
import MuiButton from '../../components/Button/muiButton';
import TextFields from '../../components/Input';
const Join = () => {
  return (
    <div className="px-5">
      <h1 className="text-amber-50 text-2xl">Welcome to DLNK !</h1>
      <TextFields
        text="본명이나 닉네임을 입력하세요"
        className="text-gray-500"
        textColor="white"
      />
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
