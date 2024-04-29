import * as React from 'react';
import { ReactComponent as OnboardingImage } from '../../assets/Group 36.svg';

const OnboardingPage = () => {
  return (
    <div>
      <div className="flex justify-center pt-11 px-6">
        <OnboardingImage />
      </div>
      <div className="px-8 pt-11">
        <h1 className="text-amber-50 text-2xl text-left font-semibold">
          나도 몰랐던 취향의 발견
        </h1>
        <p className="text-amber-50 text-sm text-left pt-5 font-medium">
          음료 선택이 고민될 때, <br />
          가장 섬세한 음료 추천 인공지능 DLNK 가 당신에게 <br />딱 맞는 메뉴를
          추천해드릴게요.
        </p>
      </div>
      <div className="flex justify-center pt-8">
        {/*<MuiButton*/}
        {/*  text="시작"*/}
        {/*  className="w-44 h-12 rounded-3xl bg-[#3FCC7C] text-lg"*/}
        {/*/>*/}
      </div>
      <div className="pt-5 text-gray-color">
        <p>새로운 계정 만들기</p>
      </div>
    </div>
  );
};
export default OnboardingPage;
