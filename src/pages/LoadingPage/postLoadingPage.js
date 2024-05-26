import React from 'react';
import Spinner from '../../assets/loadingSpinner.gif';
import { ReactComponent as GroupIcon } from '../../assets/iconGroup.svg';

const postLoadingPage = () => {
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
        게시글을 <br />
        불러오고 있어요
      </div>
    </div>
  );
};

export default postLoadingPage;
